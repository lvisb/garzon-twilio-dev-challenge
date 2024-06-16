import { EnvService } from '#env/env.service.js'
import { Module } from '@nestjs/common'
import { UserController } from './user.controller.js'
import { UserService } from './user.service.js'
import { DbService } from '#db/db.service.js'
import { NylasService } from '#api/nylas/nylas.service.js'
import { JwtService } from '@nestjs/jwt'
import { JwtStrategy } from '#common/jwt.strategy.js'

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    EnvService,
    DbService,
    NylasService,
    JwtService,
    JwtStrategy,
  ],
  exports: [],
})
export class UserModule {}
