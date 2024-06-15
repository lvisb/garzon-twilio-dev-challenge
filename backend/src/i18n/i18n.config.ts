import {
  I18nModule,
  i18nValidationMessage,
  I18nYamlLoader,
  QueryResolver,
} from 'nestjs-i18n'

import { I18nPath } from '#common/types/i18n.types.js'

export const I18nConfig = I18nModule.forRoot({
  fallbackLanguage: 'pt',
  loaderOptions: {
    path: './src/i18n/',
    watch: true,
  },
  loader: I18nYamlLoader,
  resolvers: [new QueryResolver()],
  typesOutputPath: './src/common/types/i18n.types.ts',
})

export const i18n = (messageId: I18nPath, args: any = {}) =>
  i18nValidationMessage(messageId, { args })

// export const invalidField = i18n('validation.invalid_field')
