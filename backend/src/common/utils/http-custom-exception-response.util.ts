import { HttpCustomException } from '#common/exceptions/http-custom.exception.js'
import { AxiosError } from 'axios'

export const httpCustomExceptionResponse = (
  result: AxiosError | Error | unknown,
) => {
  if (result instanceof AxiosError) {
    return HttpCustomException.createBody({
      message: result.response?.data?.error_description,
      statusCode: result.response?.status,
      data: result.response?.data,
    })
  }

  if (result instanceof Error) {
    return HttpCustomException.createBody({
      message: result.message,
      statusCode: 500,
    })
  }

  return null
}
