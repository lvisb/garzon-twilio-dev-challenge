import { OpenAiService } from '#api/openai/openai.service.js'
import { EventItem } from '#api/openai/types/event-item.type.js'
import { UserService } from '#api/user/user.service.js'
import { AstrologyService } from '#astrology/astrology.service.js'
import { User } from '#db/entities/user.entity.js'
import { OpenWeatherService } from '#openweather/openweather.service.js'
import { Injectable } from '@nestjs/common'
import { format, fromUnixTime, set, toDate } from 'date-fns'
import { DailySummary } from './types/daily-summary.type.js'
import { ZodiacSign } from '#common/utils/zodiac-signs.util.js'
import { DbService } from '#db/db.service.js'
import {
  SendHistory,
  SendHistoryStatus,
} from '#db/entities/send-history.entity.js'
import { render } from '@react-email/render'
import DailySummaryEmail from '#emails/templates/daily-summary.js'
import { EnvService } from '#env/env.service.js'
import { SendGridService } from '#twilio/sendgrid/sendgrid.service.js'
import { toZonedTime } from 'date-fns-tz'

@Injectable()
export class DailySummaryService {
  constructor(
    private readonly dbService: DbService,
    private readonly service: UserService,
    private readonly openaiService: OpenAiService,
    private readonly openWeatherService: OpenWeatherService,
    private readonly astrologyService: AstrologyService,
    private readonly envService: EnvService,
    private readonly sendGridService: SendGridService,
  ) {}

  async events(user: User): Promise<DailySummary.Events.Json | undefined> {
    const now = new Date()
    const minDate = set(now, { hours: 12, minutes: 0, seconds: 0 })
    const maxDate = set(now, { hours: 13, minutes: 59, seconds: 59 })

    const events = await this.service.events(user, minDate, maxDate)

    const promptEvents: EventItem[] = events.map((event) => {
      const startDate = event.when.start_time
        ? format(fromUnixTime(event.when.start_time), 'yyyy-MM-dd HH:mm:ss')
        : event.when.start_date

      const endDate = event.when.end_time
        ? format(fromUnixTime(event.when.end_time), 'yyyy-MM-dd HH:mm:ss')
        : event.when.end_date

      return {
        title: event.title,
        startDate: startDate,
        endDate: endDate,
      }
    })

    if (promptEvents.length === 0) {
      const content = await this.openaiService.motivationalQuotePrompt()

      return {
        events: [],
        motivational_quote: JSON.parse(content.choices[0].message.content)
          .motivational_quote,
        summary: "You don't have any events scheduled for today.",
      }
    }

    const content = await this.openaiService.eventsPrompt(promptEvents)

    try {
      const messageJson: DailySummary.Events.Json = JSON.parse(
        content.choices[0].message.content,
      )

      messageJson.events = promptEvents

      return messageJson
    } catch (error) {
      console.error('events', error)

      return undefined
    }
  }

  async weather(user: User): Promise<DailySummary.Weather.Json | undefined> {
    if (
      !user.settings.address ||
      !user.settings.latitude ||
      !user.settings.longitude
    ) {
      console.log('User has no location', user.userId)

      return undefined
    }

    try {
      const dailyWeather = await this.openWeatherService.dailyWeather(
        user.settings.latitude,
        user.settings.longitude,
      )

      const weatherToday = dailyWeather.data.daily[0]

      const weatherSummary =
        await this.openaiService.weatherPrompt(weatherToday)

      const messageJson = weatherSummary.choices[0].message.content

      return JSON.parse(messageJson)
    } catch (error) {
      console.error('weather', error)

      return undefined
    }
  }

  async horoscope(
    user: User,
  ): Promise<DailySummary.Horoscope.Json | undefined> {
    if (!user.settings.zodiacSign) {
      console.log('User has no zodiac sign', user.userId)

      return undefined
    }

    try {
      const horoscopePrediction = await this.astrologyService.daily(
        user.settings.zodiacSign as ZodiacSign,
      )
      const horoscopePrompt =
        await this.openaiService.horoscopePrompt(horoscopePrediction)

      const messageJson = JSON.parse(horoscopePrompt.choices[0].message.content)

      messageJson.zodiacSign = user.settings.zodiacSign

      return messageJson
    } catch (error) {
      console.error('horoscope', error)

      return undefined
    }
  }

  createSendHistory(user: User) {
    const sendHistory = new SendHistory()

    sendHistory.user = user
    sendHistory.status = SendHistoryStatus.PENDING
    sendHistory.timezone = user.timezone

    return this.dbService.sendHistoryRepo.save(sendHistory)
  }

  updateSendHistory(sendHistory: SendHistory) {
    return this.dbService.sendHistoryRepo.save(sendHistory)
  }

  renderEmail({
    user,
    eventsJson,
    weatherJson,
    horoscopeJson,
  }: RenderEmailParams) {
    const html = render(
      DailySummaryEmail({
        assetsUrl:
          this.envService.getValue('GARZON_EXTERNAL_ADDRESS') + '/email',
        eventsJson,
        horoscopeJson,
        weatherJson,
        name: user.name,
        appUrl: this.envService.getValue('GARZON_EXTERNAL_ADDRESS'),
        appTitle: 'Gárzon',
        timezone: user.timezone,
      }),
    )

    return html
  }

  async prepareAndSend(user: User) {
    const sendHistory = await this.createSendHistory(user)

    Promise.all([
      this.events(user),
      this.weather(user),
      this.horoscope(user),
    ]).then(async (results) => {
      const eventsJson = results[0]
      const weatherJson = results[1]
      const horoscopeJson = results[2]

      const emailHtml = this.renderEmail({
        user,
        eventsJson,
        weatherJson,
        horoscopeJson,
      })

      try {
        await this.sendGridService.sendEmail(
          {
            email: user.email,
            name: user.name,
          },
          `Garzón - ${format(toZonedTime(new Date(), user.timezone), 'MMMM dd')} - Daily Summary`,
          emailHtml,
        )
      } catch (error) {
        sendHistory.completedAt = new Date()
        sendHistory.status = 'failed'
        sendHistory.ellapsedTime =
          sendHistory.completedAt.getTime() - sendHistory.createdAt.getTime()

        sendHistory.log = JSON.stringify(error)

        return
      }

      sendHistory.completedAt = new Date()
      sendHistory.status = 'completed'
      sendHistory.ellapsedTime =
        sendHistory.completedAt.getTime() - sendHistory.createdAt.getTime()

      await this.updateSendHistory(sendHistory)
    })
  }
}

type RenderEmailParams = {
  user: User
  eventsJson: DailySummary.Events.Json
  weatherJson: DailySummary.Weather.Json
  horoscopeJson: DailySummary.Horoscope.Json
}
