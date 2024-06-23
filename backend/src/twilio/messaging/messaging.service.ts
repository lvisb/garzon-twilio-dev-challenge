import { EnvService } from '#env/env.service.js'
import { TwilioProviderName } from '#twilio/twilio.provider.js'
import { Inject, Injectable } from '@nestjs/common'
import * as TwilioSDK from 'twilio'

@Injectable()
export class MessagingService {
  constructor(
    @Inject(TwilioProviderName) private readonly twilioClient: TwilioSDK.Twilio,
    private readonly envService: EnvService,
  ) {}

  sendMessage(to: string, message: string) {
    return this.twilioClient.messages.create({
      body: message,
      from: this.envService.getValue('TWILIO_PHONE_NUMBER'),
      to,
    })
  }
}
