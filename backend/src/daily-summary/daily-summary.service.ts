import { OpenAiService } from '#api/openai/openai.service.js'
import { EventItem } from '#api/openai/types/event-item.type.js'
import { UserService } from '#api/user/user.service.js'
import { AstrologyService } from '#astrology/astrology.service.js'
import { User } from '#db/entities/user.entity.js'
import { OpenWeatherService } from '#openweather/openweather.service.js'
import { Injectable } from '@nestjs/common'
import { fromUnixTime, set, toDate } from 'date-fns'
import { DailySummary } from './types/daily-summary.type.js'
import { ZodiacSign } from '#common/utils/zodiac-signs.util.js'

@Injectable()
export class DailySummaryService {
  constructor(
    private readonly service: UserService,
    private readonly openaiService: OpenAiService,
    private readonly openWeatherService: OpenWeatherService,
    private readonly astrologyService: AstrologyService,
  ) {}

  async events(user: User): Promise<DailySummary.Events.Json | undefined> {
    const now = new Date()
    const minDate = set(now, { hours: 12, minutes: 0, seconds: 0 })
    const maxDate = set(now, { hours: 13, minutes: 59, seconds: 59 })

    const events = await this.service.events(user, minDate, maxDate)

    const promptEvents: EventItem[] = events.map((event) => {
      const startDate = event.when.start_time
        ? fromUnixTime(event.when.start_time).toString()
        : event.when.start_date

      const endDate = event.when.end_time
        ? fromUnixTime(event.when.end_time).toString()
        : event.when.end_date

      return {
        title: event.title,
        startDate: startDate,
        endDate: endDate,
      }
    })

    if (promptEvents.length === 0) {
      console.log('No events found', user.userId)
      return undefined
    }

    const content = await this.openaiService.eventsPrompt(promptEvents)

    try {
      const messageJson: DailySummary.Events.Json = JSON.parse(
        content.choices[0].message.content,
      )

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
}
