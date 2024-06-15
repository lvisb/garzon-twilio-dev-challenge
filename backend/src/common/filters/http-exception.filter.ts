import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import { Response } from 'express'
import { getContextObject, I18nContext } from 'nestjs-i18n'

import { ApiResponses } from '#common/types/json-response.type.js'
import { ValidationExceptionItem } from '#common/validation-pipe.config.js'

/**
 * Classe que wrapper para todos os erros não
 * tratados do sistema.
 *
 * Baseado num exemplo do NestJS:
 * {@link https://docs.nestjs.com/exception-filters#exception-filters-1}
 *
 * @implements ExceptionFilter
 */
@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const i18n = getContextObject(host).i18nContext
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()
    const exceptionResponse =
      exception.getResponse() as ApiResponses.JsonResponse

    // há dois tipos de erro, um que pode retornar
    // erros de validação {@MultipleResponseException} ou
    // um único erro (@SingleResponseException)
    const isSingleError = !exceptionResponse.errors

    if (isSingleError) {
      return response.status(status).json({
        ...exceptionResponse,
        // tenta recuperar a mensagem de erro da internacionalização
        message: translateError(
          exceptionResponse.error || exceptionResponse.message,
          i18n,
        ),
      })
    }

    return response.status(status).json({
      ...exceptionResponse,
      // tenta recuperar a mensagem de erro da internacionalização
      errors: translateMultipleErrors(exceptionResponse.errors, i18n),
    })
  }
}

/**
 * Tenta recuperar a mensagem dos arquivos de
 * internacionalização, ou retorna a mensagem
 * original.
 *
 * @param {string} message - Mensagem pura, ou caminho
 * da mensagem nos arquivos de tradução
 * Ex: Validation.INVALID_EMAIL
 * @param {I18nContext} i18n - Instância do i18n.
 * @returns {string} Mensagem original, ou mensagem das traduções.
 */
const translateError = (message: string, i18n: I18nContext) => {
  // se a mensagem segue uma escrita assim:
  // Validation.INVALID_EMAIL, tenta recuperar o texto do
  // i18n.
  if (/\w+\./.test(message)) {
    if (message.includes('|')) {
      const [key, args] = message.split('|')

      return i18n.t(key, JSON.parse(args))
    }

    return i18n.t(message)
  }

  // mesnagem original
  return message
}

/**
 * Tenta recuperar a mensagem de erro de cada campo que
 * teve dados inválidos.
 *
 * @param {ValidationExceptionItem[]} errors - Campo
 * com dado inválido.
 * @param {I18nContext} i18n - Instância do i18n.
 * @returns {ValidationExceptionItem[]} Retorna um
 * novo array com as mensagens de erro traduzidas ou
 * originais.
 */
const translateMultipleErrors = (
  errors: ValidationExceptionItem[],
  i18n: I18nContext,
) =>
  errors.map((item) => ({
    ...item,
    message: translateError(item.message, i18n),
  }))
