import { ApiResponses } from '#common/types/json-response.type.js'

export class HttpResponse {
  static createBody({
    message = undefined,
    status = 'ok',
    id = undefined,
    statusCode = 200,
    ...rest
  }: ApiResponses.JsonResponse) {
    return {
      message,
      status,
      id,
      statusCode,
      ...rest,
    }
  }
}
