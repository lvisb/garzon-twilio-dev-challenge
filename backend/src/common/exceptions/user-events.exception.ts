import { i18n } from '#i18n/i18n.config.js'
import { HttpCustomException } from './http-custom.exception.js'

export class UserEventsFetchException extends HttpCustomException {
  constructor() {
    super(
      HttpCustomException.createBody({
        id: UserEventsFetchException.name,
        message: i18n('errors.user_events_fetch_error')({} as any),
        statusCode: 500,
      }),
      500,
    )
  }
}
