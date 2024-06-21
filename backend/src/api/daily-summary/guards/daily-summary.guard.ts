import { InvalidTokenException } from '#common/exceptions/invalid-token.exception.js'
import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { DailySummaryStrategyName } from '../daily-summary.strategy.js'

@Injectable()
export class DailySummaryGuard extends AuthGuard(DailySummaryStrategyName) {
  async canActivate(context: ExecutionContext) {
    await super.canActivate(context)

    return true
  }

  handleRequest(err: any, sub: any, info: any, context: ExecutionContext) {
    if (err || !sub) throw new InvalidTokenException()

    return sub
  }
}
