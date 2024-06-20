import { Global, Module } from '@nestjs/common'
import { VerifyService } from './verify.service.js'
import { TwilioProvider } from '#twilio/twilio.provider.js'

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [VerifyService, TwilioProvider],
  exports: [VerifyService],
})
export class VerifyModule {}
