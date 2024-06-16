import { i18n } from '#i18n/i18n.config.js'
import { HttpException } from '@nestjs/common'

interface CustomBody {
  message?: string
  status?: string
  statusCode?: number
  id?: string
}

export class HttpCustomException extends HttpException {
  static createBody<Body extends CustomBody>(customBody: Body): Body {
    if (!customBody.status) customBody.status = 'error'

    customBody.statusCode = customBody.statusCode || 500
    customBody.message =
      customBody.message || i18n('errors.unknown_error')({} as any)

    return customBody
  }
}
