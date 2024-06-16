import { EnvService } from '#env/env.service.js'
import { Global, Module } from '@nestjs/common'
import { NylasService } from './nylas.service.js'
import { JwtService } from '@nestjs/jwt'

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [NylasService, EnvService, JwtService],
  exports: [],
})
export class NylasModule {}
