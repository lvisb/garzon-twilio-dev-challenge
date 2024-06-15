import { getClientIp } from '@supercharge/request-ip'
import { NextFunction } from 'express'

import { filterXSS } from '#common/transformers/filter-xss.transform.js'
import { IRequestInfo } from '#common/types/request-info.type.js'

export function requestInfo(
  req: IRequestInfo,
  _: Response,
  next: NextFunction,
) {
  req.clientIp = filterXSS(getClientIp(req))
  req.userAgent = filterXSS((req.headers as any)['user-agent'])

  next()
}
