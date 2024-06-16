import { InvalidTokenException } from '#common/exceptions/invalid-token.exception.js'
import { JwtStrategyName } from '#common/jwt.strategy.js'
import { SignedInRequest } from '#common/utils/signed-in-request.util.js'
import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class UserGuard extends AuthGuard(JwtStrategyName) {
  async canActivate(context: ExecutionContext) {
    // verifica na superclass se o token é válido 
    // @see #admin/api/auth/strategies/jwt.strategy.js
    // se não for válido, lança uma exceção
    await super.canActivate(context)

    // neste ponto o token é válido
    const request = context.switchToHttp().getRequest() as SignedInRequest

    request.token = (request.headers as any)['authorization'].split(' ')[1]

    return true
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    // executado após o super.canActivate
    // o jwt strategy retorna o usuário se o token for válido
    if (err || !user) throw new InvalidTokenException()

    return user
  }
}
