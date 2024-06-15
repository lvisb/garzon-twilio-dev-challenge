import { Global, Module } from '@nestjs/common'

import { Db, TypeORMProvider } from './db.provider.js'

import { EnvService } from '#env/env.service.js'

@Global()
@Module({
  imports: [],
  providers: [TypeORMProvider, EnvService],
  exports: [Db],
})
export class DbModule {}
