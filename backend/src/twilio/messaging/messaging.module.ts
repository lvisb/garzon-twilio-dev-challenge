import { Global, Module } from '@nestjs/common'
import { MessagingService } from './messaging.service.js'
import { TwilioProvider } from '#twilio/twilio.provider.js'

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [MessagingService, TwilioProvider],
  exports: [MessagingService],
})
export class MessagingModule {}
