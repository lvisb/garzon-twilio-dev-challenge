import { i18n } from '#i18n/i18n.config.js'
import { HttpCustomException } from './http-custom.exception.js'

export class SendEmailException extends HttpCustomException {
  constructor() {
    super(
      HttpCustomException.createBody({
        id: SendEmailException.name,
        message: i18n('errors.sendmail_error')({} as any),
        statusCode: 500,
      }),
      500,
    )
  }
}
