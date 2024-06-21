import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { EnvService } from '#env/env.service.js'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AdminTokenDto } from './dtos/token.dto.js'

export const DailySummaryStrategyName = 'DailySummaryStrategy'

@Injectable()
export class DailySummaryStrategy extends PassportStrategy(
  Strategy,
  DailySummaryStrategyName,
) {
  constructor(
    protected readonly envService: EnvService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envService.getValue('JWT_ADMIN_SECRET'),
    })
  }

  async validate(payload: AdminTokenDto) {
    const { sub } = payload
    console.log(payload)

    if (sub !== 'admin') return undefined

    return sub
  }
}
