import { Global, Module } from '@nestjs/common'
import { SendGridService } from './sendgrid.service.js'

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [SendGridService],
  exports: [SendGridService],
})
export class SendGridModule {}
