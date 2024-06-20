import { i18n } from '#i18n/i18n.config.js'
import { HttpCustomException } from './http-custom.exception.js'

export class InvalidVerifyCodeException extends HttpCustomException {
  constructor() {
    super(
      HttpCustomException.createBody({
        id: InvalidVerifyCodeException.name,
        message: i18n('errors.invalid_verify_code')({} as any),
        statusCode: 400,
      }),
      400,
    )
  }
}
