import { i18n } from '#i18n/i18n.config.js'
import { HttpCustomException } from './http-custom.exception.js'

export class VerifyCodeNotFoundException extends HttpCustomException {
  constructor() {
    super(
      HttpCustomException.createBody({
        id: VerifyCodeNotFoundException.name,
        message: i18n('errors.verify_code_not_found')({} as any),
        statusCode: 404,
      }),
      404,
    )
  }
}
