import { EnvService } from '#env/env.service.js'
import { Module } from '@nestjs/common'
import { UserController } from './user.controller.js'
import { UserService } from './user.service.js'
import { DbService } from '#db/db.service.js'
import { NylasService } from '#api/nylas/nylas.service.js'
import { JwtService } from '@nestjs/jwt'
import { OpenWeatherService } from '#openweather/openweather.service.js'
import { GoogleMapsService } from '#google-maps/google-maps.service.js'
import { AstrologyService } from '#astrology/astrology.service.js'
import { DailySummaryService } from '#api/daily-summary/daily-summary.service.js'
import { UserStrategy } from './user.strategy.js'

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    UserStrategy,
    EnvService,
    DbService,
    NylasService,
    OpenWeatherService,
    GoogleMapsService,
    AstrologyService,
    DailySummaryService,
    JwtService,
  ],
  exports: [UserService],
})
export class UserModule {}
