import {
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import { plainToInstance } from 'class-transformer'
import { envServer } from '~/common/config/env.server'
import { GLOBALS } from '~/common/config/globals.config'
import {
  CookieKeys,
  commitSession,
  cookieExpireDate,
  cookieOptions,
  getSession,
} from '~/common/cookie.server'
import { CodeDto } from '~/route-pages/home/dto/code.dto'
import { HomeView } from '~/route-pages/home/home.view'
import { HomeApiServer } from '~/route-pages/home/services/home.server'
import { responseLoader } from '~/services/api.server'

export const loader = async (remixArgs: LoaderFunctionArgs) => {
  const request = remixArgs.request
  const url = new URL(request.url)

  let json: any = {}

  if (url.searchParams.has('code')) {
    const service = new HomeApiServer()

    const dto = plainToInstance(
      CodeDto,
      { code: url.searchParams.get('code') },
      { excludeExtraneousValues: true },
    )

    json = await responseLoader(service.connect(dto), remixArgs, false)

    if (json.status === 'ok') {
      const session = await getSession(request.headers.get('Cookie'))
      const expireDate = cookieExpireDate()

      session.set(CookieKeys.token, json.token)
      session.set(CookieKeys.expireDate, expireDate?.toString())

      return redirect('/settings', {
        headers: {
          'Set-Cookie': await commitSession(
            session,
            cookieOptions({ expireDate: expireDate! }),
          ),
        },
      })
    }
  }

  return {
    json,
    env: {
      nylasClientId: envServer().NYLAS_CLIENT_ID,
      nylasRedirectUri: envServer().NYLAS_REDIRECT_URI,
    },
  }
}

export const meta: MetaFunction = () => {
  return [{ title: GLOBALS.name }]
}

export default HomeView
