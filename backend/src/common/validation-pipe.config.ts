import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common'

import { ApiResponses } from './types/json-response.type.js'

export type ValidationExceptionItem = {
  field: string
  message: string
  args?: Record<string, any>
}

/**
 * Classe que é injetada em todos os endpoints da API,
 * convertendo o body/parâmetros da requisição em classes,
 * e efetuando a validação dos dados.
 *
 * Baseado num exemplo do NestJS:
 * {@link https://docs.nestjs.com/techniques/validation}
 */
export default new ValidationPipe({
  // efetua serialização de plain para class.
  transform: true,
  // se uma propriedade na classe possuir mais que
  // uma validação, e se na primeira validação ocorrer um
  // erro, a o class-validator não executa as outras validações.
  stopAtFirstError: true,
  // desabilita mensagens padrões de validação do class-validator
  // dismissDefaultMessages: true,
  transformOptions: {
    // não converte string, números, boolean para seu tipo
    enableImplicitConversion: false,

    // exclui todos os campos que não estão definidos 
    // na classe e com o decorator @Expose()
    strategy: 'excludeAll',
  },

  /**
   * Formata o JSON em caso de erros de validação.
   *
   * @param {ValidationError[]} errors - Lista de erros.
   * @returns {object} JSON com os erros encontrados.
   *
   * @example
   * {
   * 	"status": "error",
   * 	"errors": [
   *     {
   * 			"field": "name",
   * 			"message": "nome inválido"
   * 		},
   * 		{
   * 			"field": "password",
   * 			"message": "senha inválida"
   * 		}
   * 	]
   * }
   */
  exceptionFactory: (errors: ValidationError[]) => {
    const mappedErrors = mapChildrenErrors(errors)

    const response: ApiResponses.JsonResponse = {
      statusCode: 400,
      status: 'error',
      errors: mappedErrors,
    }

    return new BadRequestException(response)
  },
})

const mapChildrenErrors = (
  childrenErrors: ValidationError[],
  rootProperty?: string,
) => {
  let mappedErrors: ApiResponses.InputValidationError[] = []

  childrenErrors.forEach((err) => {
    if (err.children && err.children?.length > 0) {
      mappedErrors = mappedErrors.concat(
        mapChildrenErrors(
          err.children,
          rootProperty ? `${rootProperty}.${err.property}` : err.property,
        ),
      )
      return
    }

    mappedErrors.push({
      field: rootProperty ? `${rootProperty}.${err.property}` : err.property,
      message: Object.values(err.constraints!)[0],
    })
  })

  return mappedErrors
}
