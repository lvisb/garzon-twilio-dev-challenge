import { Global, Module } from '@nestjs/common'
import { OpenWeatherService } from './openweather.service.js'

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [OpenWeatherService],
  exports: [OpenWeatherService],
})
export class OpenWeatherModule {}
