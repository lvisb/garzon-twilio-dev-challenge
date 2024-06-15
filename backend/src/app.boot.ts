/**
 * Classe Singleton que inicializa o servidor.
 */
import { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { useContainer } from 'class-validator'
import { I18nService } from 'nestjs-i18n'

import { AppModule } from '#app.module.js'
import { HttpExceptionFilter } from '#common/filters/http-exception.filter.js'
import { requestInfo } from '#common/middlewares/request-info.middleware.js'
import validationPipeConfig from '#common/validation-pipe.config.js'
import { EnvService } from '#env/env.service.js'

export class App {
  // singleton instance
  private static instance: App

  // app nestjs
  private app?: INestApplication

  // previne construção direya
  private constructor() {}

  /**
   * Retorna a instância do app do nestjs.
   *
   * @static
   * @returns {App}
   */
  public static getInstance(): App {
    if (!App.instance) App.instance = new App()

    return App.instance
  }

  /**
   * Boot do servidor, executado uma única vez.
   *
   * @async
   */
  async bootstrap() {
    if (this.app) throw new Error('[App] Already started')

    // cria uma instância da aplicação
    this.app = await NestFactory.create(AppModule)

    this.app.use(requestInfo)

    // faz com que o class-validator utilize o nestjs
    // para injeção de dependência, possibilitando
    // utilizar services e models na validação
    useContainer(this.app.select(AppModule), {
      fallbackOnErrors: true,
    })

    // cors
    this.app.enableCors({
      origin: [
        // ...env().WEBSITE_BACKEND_CORS?.split(',')
      ],
    })

    // tratamento de erro global, retornando um JSON
    // pré-formatado com o erro
    this.app.useGlobalFilters(new HttpExceptionFilter())

    // pipes globais para transformação e validação dos
    // dados postados aos endpoints dos controllers
    this.app.useGlobalPipes(validationPipeConfig)

    // inicializa server
    await this.app.listen(App.envService.getValue('BACKEND_PORT'))
  }

  /**
   * Obtém uma instância do EnvService.
   * Uso: App.envService.get(...)
   *
   * @returns {EnvService} Objeto com cache de
   * variáveis ambiente.
   */
  static get envService(): EnvService {
    return App.getInstance().app!.get<EnvService>(EnvService)
  }

  /**
   * Obtém uma instância da ferramenta de tradução
   * de textos.
   * Uso: App.i18nService.translate(...)
   *
   * @returns {I18nService}
   */
  static get i18nService(): I18nService {
    return App.instance.app.get<I18nService>(I18nService)
  }
}
