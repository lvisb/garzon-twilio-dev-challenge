import { Module } from '@nestjs/common'

import { DbModule } from '#db/db.module.js'
import { EnvModule } from '#env/env.module.js'
import { I18nConfig } from '#i18n/i18n.config.js'

@Module({
  imports: [I18nConfig, EnvModule, DbModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
