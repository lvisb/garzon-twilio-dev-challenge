import { EnvService } from '#env/env.service.js'
import twilio from 'twilio'

export const TwilioProviderName = 'TwilioProvider'

export const TwilioProvider = {
  provide: TwilioProviderName,
  inject: [EnvService],
  useFactory: async (envService: EnvService): Promise<any> => {
    const client = twilio(
      envService.getValue('TWILIO_ACCOUNT_SID'),
      envService.getValue('TWILIO_AUTH_TOKEN'),
    )

    return client
  },
}
