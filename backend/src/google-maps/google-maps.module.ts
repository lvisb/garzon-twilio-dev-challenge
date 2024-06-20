import { Global, Module } from '@nestjs/common'
import { GoogleMapsService } from './google-maps.service.js'

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [GoogleMapsService],
  exports: [GoogleMapsService],
})
export class OpenWeatherModule {}
