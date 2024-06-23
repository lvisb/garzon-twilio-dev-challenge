import { redirect, type LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { plainToInstance } from 'class-transformer'
import { useEffect } from 'react'
import {
  CookieKeys,
  commitSession,
  cookieExpireDate,
  cookieOptions,
  getSession,
} from '~/common/cookie.server'
import { CodeDto } from '~/route-pages/home/dto/code.dto'
import { HomeApiServer } from '~/route-pages/home/services/home.server'
import { responseLoader } from '~/services/api.server'

export const loader = async (remixArgs: LoaderFunctionArgs) => {
  const request = remixArgs.request
  const url = new URL(request.url)

  if (url.searchParams.has('code')) {
    const service = new HomeApiServer()

    const dto = plainToInstance(
      CodeDto,
      { code: url.searchParams.get('code') },
      { excludeExtraneousValues: true },
    )

    const tokenJson = await responseLoader(service.connect(dto), remixArgs, false)

    if (tokenJson.status === 'ok') {
      const session = await getSession(request.headers.get('Cookie'))
      const expireDate = cookieExpireDate()

      session.set(CookieKeys.token, tokenJson.token)
      session.set(CookieKeys.expireDate, expireDate.toString())

      const rawCookie = await commitSession(
        session,
        cookieOptions({ expireDate: expireDate! }),
      )

      if (tokenJson.user.isActive)
        return json(
          { redirectUrl: '/success' },
          { headers: { 'Set-Cookie': rawCookie } },
        )

      return json(
        { redirectUrl: '/settings' },
        { headers: { 'Set-Cookie': rawCookie } },
      )
    }
  }

  return redirect('/')
}

export default function NylasCallback() {
  const { redirectUrl } = useLoaderData() as any

  useEffect(() => {
    window.location.href = redirectUrl
  }, [redirectUrl])

  return <></>
}
