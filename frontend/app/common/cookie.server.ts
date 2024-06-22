import type {
  CookieSerializeOptions,
  LoaderFunctionArgs,
} from '@remix-run/node'
import { createCookieSessionStorage } from '@remix-run/node'
import { envServer } from './config/env.server'
import { expiresInHours } from './utils/expires-in-hours.util'

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: 'fuqw5xC',
      secrets: [envServer().JWT_SECRET],
      secure: false,
      httpOnly: true,
      sameSite: true,
    },
  })

export const cookieOptions = (args: {
  expireDate: Date
}): CookieSerializeOptions => {
  const { expireDate } = args

  return {
    expires: expireDate,
  }
}

export const cookieExpireDate = (rememberUser = false) => {
  return rememberUser ? expiresInHours(720) : null
}

export const readCookieSettings = async (remixArgs: LoaderFunctionArgs) => {
  const { request } = remixArgs

  const session = await getSession(request.headers.get('Cookie'))

  return {}
}

export enum CookieKeys {
  token = 'token',
  expireDate = 'expireDate',
}
