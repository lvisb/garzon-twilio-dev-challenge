import { Request } from 'express'

export interface IRequestInfo extends Request {
  clientIp?: string

  userAgent?: string
}
