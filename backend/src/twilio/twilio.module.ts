import { Global, Module } from '@nestjs/common'
import { SendGridModule } from './sendgrid/sendgrid.module.js'
import { VerifyModule } from './verify/verify.module.js'
import { TwilioProvider } from './twilio.provider.js'
import { MessagingModule } from './messaging/messaging.module.js'

@Global()
@Module({
  imports: [SendGridModule, VerifyModule, MessagingModule],
  controllers: [],
  providers: [TwilioProvider],
  exports: [],
})
export class TwilioModule {}
