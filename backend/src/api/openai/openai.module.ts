import { Global, Module } from '@nestjs/common'
import { OpenAiService } from './openai.service.js'
import { EnvService } from '#env/env.service.js'
import OpenAI from 'openai'

export const OpenAiProvider = {
  provide: 'OpenAiProvider',
  inject: [EnvService],
  useFactory: async (envService: EnvService): Promise<any> => {
    const openai = new OpenAI({
      apiKey: envService.getValue('OPENAI_API_KEY'),
    })

    return openai
  },
}

@Global()
@Module({
  providers: [OpenAiProvider, OpenAiService],
  exports: [OpenAiService]
})
export class OpenAiModule {}
