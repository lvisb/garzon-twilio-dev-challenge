import { Controller, Post, UseGuards } from '@nestjs/common'
import { DailySummaryService } from './daily-summary.service.js'
import { UserService } from '#api/user/user.service.js'
import { DailySummaryGuard } from './guards/daily-summary.guard.js'
import { HttpResponse } from '#common/utils/http-response.util.js'

@UseGuards(DailySummaryGuard)
@Controller('api/_private/daily-summary')
export class DailySummaryController {
  constructor(
    private readonly service: DailySummaryService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async dailySummary() {
    const users = await this.userService.getUsersWithinTimeRange(
      '10:00:00',
      '17:00:00',
    )

    for (const user of users) {
      Promise.all([
        this.service.events(user),
        this.service.weather(user),
        this.service.horoscope(user),
      ]).then((results) => {
        console.log(user, results)
      })
    }

    return HttpResponse.createBody({})
  }
}
