import { i18n } from '#i18n/i18n.config.js'
import { HttpCustomException } from './http-custom.exception.js'

export class GrantInvalidException extends HttpCustomException {
  constructor() {
    super(
      HttpCustomException.createBody({
        id: GrantInvalidException.name,
        message: i18n('errors.grant_invalid')({} as any),
        statusCode: 400,
      }),
      400,
    )
  }
}
