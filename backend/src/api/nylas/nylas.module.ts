import { EnvService } from '#env/env.service.js'
import { Global, Module } from '@nestjs/common'
import { NylasService } from './nylas.service.js'
import { NylasController } from './nylas.controller.js'

@Global()
@Module({
  imports: [],
  controllers: [NylasController],
  providers: [NylasService, EnvService],
  exports: [],
})
export class NylasModule {}
