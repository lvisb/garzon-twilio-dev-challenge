import { i18n } from '#i18n/i18n.config.js'
import { HttpCustomException } from './http-custom.exception.js'

export class InvalidTokenException extends HttpCustomException {
  constructor() {
    super(
      HttpCustomException.createBody({
        id: InvalidTokenException.name,
        message: i18n('errors.invalid_token')({} as any),
        statusCode: 400,
      }),
      400,
    )
  }
}
