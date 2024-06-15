import { Global, Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'

import { Env, EnvService } from './env.service.js'

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ['.env'],

      validate: (config: Record<string, unknown>) => {
        const validateConfig = plainToInstance(Env, config, {
          excludeExtraneousValues: true,
        })

        const errors = validateSync(validateConfig)

        if (errors.length) throw new Error(errors.toString())

        return validateConfig
      },
    }),
  ],
  controllers: [],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
