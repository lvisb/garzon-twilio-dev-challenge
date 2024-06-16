import { Body, Controller, Post } from '@nestjs/common'
import { NylasService } from './nylas.service.js'
import { HttpResponse } from '#common/utils/http-response.util.js'
import { httpCustomExceptionResponse } from '#common/utils/http-custom-exception-response.util.js'
import { CodeDto } from './dtos/code.dto.js'
import { I18n, I18nContext } from 'nestjs-i18n'
import { I18nTranslations } from '#common/types/i18n.types.js'

@Controller('api/nylas')
export class NylasController {
  constructor(private readonly service: NylasService) {}

  @Post('connect/token')
  async connectToken(
    @Body() dto: CodeDto,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ) {
    const { code } = dto

    try {
      const result = await this.service.token(code)

      return HttpResponse.createBody({
        message: i18n.t('general.token_retrieved'),
      })
    } catch (error) {
      return httpCustomExceptionResponse(error)
    }
  }
}
