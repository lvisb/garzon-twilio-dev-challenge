import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { EnvService } from '#env/env.service.js'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from '#api/user/user.service.js'
import { TokenDto } from '#api/user/dtos/token.dto.js'

export const JwtStrategyName = 'jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JwtStrategyName) {
  constructor(
    protected readonly envService: EnvService,
    private readonly usersService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envService.getValue('JWT_SECRET'),
    })
  }

  async validate(payload: TokenDto) {
    const { sub } = payload

    const user = await this.usersService.loadUserById(sub)

    return user
  }
}
