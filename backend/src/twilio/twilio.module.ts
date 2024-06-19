import { Module } from '@nestjs/common'
import { SendGridModule } from './sendgrid/sendgrid.module.js'

@Module({
  imports: [SendGridModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class TwilioModule {}
