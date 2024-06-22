import { Module } from '@nestjs/common'
import { DailySummaryService } from './daily-summary.service.js'
import { OpenWeatherService } from '#openweather/openweather.service.js'
import { UserModule } from '#api/user/user.module.js'
import { OpenWeatherModule } from '#google-maps/google-maps.module.js'
import { AstrologyModule } from '#astrology/astrology.module.js'
import { DailySummaryController } from './daily-summary.controller.js'
import { DailySummaryStrategy } from './daily-summary.strategy.js'
import { DbService } from '#db/db.service.js'

@Module({
  imports: [UserModule, OpenWeatherModule, AstrologyModule],
  controllers: [DailySummaryController],
  providers: [
    DailySummaryService,
    DailySummaryStrategy,
    OpenWeatherService,
    DbService,
  ],
  exports: [DailySummaryService],
})
export class DailySummaryModule {}
