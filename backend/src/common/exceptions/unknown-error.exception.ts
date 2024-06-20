import { i18n } from '#i18n/i18n.config.js'
import { HttpCustomException } from './http-custom.exception.js'

export class UnknownErrorException extends HttpCustomException {
  constructor() {
    super(
      HttpCustomException.createBody({
        id: UnknownErrorException.name,
        message: i18n('errors.unknown_error')({} as any),
        statusCode: 500,
      }),
      500,
    )
  }
}
