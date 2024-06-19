import { EnvService } from '#env/env.service.js'
import { Injectable } from '@nestjs/common'
import sgMail from '@sendgrid/mail'

@Injectable()
export class SendGridService {
  constructor(private readonly envService: EnvService) {
    sgMail.setApiKey(this.envService.getValue('SENDGRID_API_KEY'))
  }

  sendEmail(to: SendGridEmail, subject: string, html: string) {
    const from: SendGridEmail = {
      email: this.envService.getValue('EMAIL_FROM'),
      name: this.envService.getValue('EMAIL_FROM_NAME'),
    }

    const data = {
      from,
      to,
      subject,
      html,
    }

    return sgMail.send(data)
  }
}

type SendGridEmail = {
  name?: string
  email: string
}
