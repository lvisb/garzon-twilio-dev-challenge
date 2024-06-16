import { Global, Module } from '@nestjs/common'

import { Db, TypeORMProvider } from './db.provider.js'

import { EnvService } from '#env/env.service.js'
import { DbService } from './db.service.js'

@Global()
@Module({
  imports: [],
  providers: [TypeORMProvider, EnvService, DbService],
  exports: [Db],
})
export class DbModule {}
