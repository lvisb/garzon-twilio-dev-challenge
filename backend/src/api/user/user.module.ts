import { EnvService } from '#env/env.service.js'
import { Module } from '@nestjs/common'
import { UserController } from './user.controller.js'
import { UserService } from './user.service.js'
import { DbService } from '#db/db.service.js'
import { NylasService } from '#api/nylas/nylas.service.js'
import { JwtService } from '@nestjs/jwt'
import { JwtStrategy } from '#common/jwt.strategy.js'
import { OpenAiService } from '#api/openai/openai.service.js'
import { OpenWeatherService } from '#openweather/openweather.service.js'
import { GoogleMapsService } from '#google-maps/google-maps.service.js'

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    EnvService,
    DbService,
    NylasService,
    OpenWeatherService,
    GoogleMapsService,
    JwtService,
    JwtStrategy,
  ],
  exports: [],
})
export class UserModule {}
