import { Controller, Post, UseGuards } from '@nestjs/common'
import { DailySummaryService } from './daily-summary.service.js'
import { UserService } from '#api/user/user.service.js'
import { DailySummaryGuard } from './guards/daily-summary.guard.js'
import { HttpResponse } from '#common/utils/http-response.util.js'
import { SendGridService } from '#twilio/sendgrid/sendgrid.service.js'
import { format } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'

@UseGuards(DailySummaryGuard)
@Controller('api/_private/daily-summary')
export class DailySummaryController {
  constructor(
    private readonly service: DailySummaryService,
    private readonly userService: UserService,
    private readonly sendGridService: SendGridService,
  ) {}

  @Post()
  async dailySummary() {
    const users = await this.userService.getUsersWithinTimeRange(
      '06:00:00',
      '06:00:00',
    )

    for (const user of users) {
      const sendHistory = await this.service.createSendHistory(user)

      Promise.all([
        this.service.events(user),
        this.service.weather(user),
        this.service.horoscope(user),
      ]).then(async (results) => {
        const eventsJson = results[0]
        const weatherJson = results[1]
        const horoscopeJson = results[2]

        const emailHtml = this.service.renderEmail({
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

        await this.service.updateSendHistory(sendHistory)
      })
    }

    return HttpResponse.createBody({})
  }
}
