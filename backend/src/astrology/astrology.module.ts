import { Global, Module } from '@nestjs/common'
import { AstrologyService } from './astrology.service.js';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [AstrologyService],
  exports: [AstrologyService],
})
export class AstrologyModule {}
