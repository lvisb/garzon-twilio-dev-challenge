import { Module } from '@nestjs/common'

import { DbModule } from '#db/db.module.js'
import { EnvModule } from '#env/env.module.js'
import { I18nConfig } from '#i18n/i18n.config.js'
import { NylasModule } from '#api/nylas/nylas.module.js'
import { UserModule } from '#api/user/user.module.js'
import { OpenAiModule } from './api/openai/openai.module.js'
import { TwilioModule } from '#twilio/twilio.module.js'
import { DailySummaryModule } from '#api/daily-summary/daily-summary.module.js'

@Module({
  imports: [
    I18nConfig,
    EnvModule,
    DbModule,
    NylasModule,
    UserModule,
    OpenAiModule,
    TwilioModule,
    DailySummaryModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
