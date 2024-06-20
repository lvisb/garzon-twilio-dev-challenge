import { EnvService } from '#env/env.service.js'
import { TwilioProviderName } from '#twilio/twilio.provider.js'
import { Inject, Injectable } from '@nestjs/common'
import  * as TwilioSDK from 'twilio'

@Injectable()
export class VerifyService {
  constructor(
    private readonly envService: EnvService,
    @Inject(TwilioProviderName) private readonly twilioClient: TwilioSDK.Twilio,
  ) {}

  sendCode(to: string) {
    return this.twilioClient.verify.v2
      .services(this.envService.getValue('TWILIO_VERIFY_SID'))
      .verifications.create({
        to,
        channel: 'sms',
      })
  }

  validateCode(to: string, code: string) {
    return this.twilioClient.verify.v2
      .services(this.envService.getValue('TWILIO_VERIFY_SID'))
      .verificationChecks.create({ to, code })
  }
}
