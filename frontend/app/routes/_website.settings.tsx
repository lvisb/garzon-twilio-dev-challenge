import type {
  ActionFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node'
import { Outlet, redirect } from '@remix-run/react'
import { plainToInstance } from 'class-transformer'
import qs from 'qs'
import { getCookie } from '~/common/auto-loader.server'
import { envServer } from '~/common/config/env.server'
import { GLOBALS } from '~/common/config/globals.config'
import {
  CookieKeys,
  commitSession,
  cookieExpireDate,
  cookieOptions,
  destroySession,
  getSession,
} from '~/common/cookie.server'
import { SettingsLayout } from '~/layout/settings-layout/settings-layout.view'
import { FormDto } from '~/route-pages/settings/pages/index/dto/form.dto'
import { SettingsIndexView } from '~/route-pages/settings/pages/index/index.view'
import { SettingsApiServer } from '~/route-pages/settings/services/settings.server'
import { responseLoader } from '~/services/api.server'

export function shouldRevalidate() {
  return false
}

export const meta: MetaFunction = () => {
  return [{ title: GLOBALS.name }]
}

export const action: ActionFunction = async (remixArgs) => {
  const { request } = remixArgs
  const cookie = await getCookie(request)
  const token = cookie.get(CookieKeys.token)

  const service = new SettingsApiServer({ token })
  const rawData: any = qs.parse(await request.text())

  const data = plainToInstance(FormDto, rawData, {
    excludeExtraneousValues: true,
  })

  if (rawData.phoneCountryCode != '+')
    data.phone = rawData.phoneCountryCode + rawData.phone
  else
    data.phone = ''

  data.address = rawData.location

  const resultJson = await responseLoader(
    service.updateUser(data),
    remixArgs,
    false,
  )

  if (resultJson.status === 'error') {
    const phoneError = resultJson.errors.find(
      (error: any) => error.field === 'phone',
    )

    if (phoneError) {
      resultJson.errors.push({
        field: 'phoneCountryCode',
        message: ' ',
      })
    }
  }
  console.log('resultJson', resultJson)

  if (resultJson.status === 'ok' && resultJson.id === 'code_sent') {
    const session = await getSession(request.headers.get('Cookie'))
    const expireDate = cookieExpireDate()

    session.set(CookieKeys.token, token)
    session.set(CookieKeys.expireDate, expireDate?.toString())
    session.set(CookieKeys.newPhone, data.phone)

    return redirect('/settings/verify-code', {
      headers: {
        'Set-Cookie': await commitSession(
          session,
          cookieOptions({ expireDate: expireDate! }),
        ),
      },
    })
  }

  if (resultJson.status === 'ok') {
    const session = await getSession(request.headers.get('Cookie'))
    const expireDate = cookieExpireDate()

    session.set(CookieKeys.token, token)
    session.set(CookieKeys.expireDate, expireDate?.toString())
    session.unset(CookieKeys.codeVerified)

    session.flash(CookieKeys.recentlyActivated, resultJson.recentlyActivated)

    return redirect('/success', {
      headers: {
        'Set-Cookie': await commitSession(
          session,
          cookieOptions({ expireDate: expireDate! }),
        ),
      },
    })
  }
  console.log('resultJson', resultJson)

  return resultJson
}

export const loader = async (remixArgs: LoaderFunctionArgs) => {
  const request = remixArgs.request
  const cookie = await getCookie(request)
  const token = cookie.get(CookieKeys.token)

  const service = new SettingsApiServer({ token })

  const userJson = await responseLoader(service.loadUser(), remixArgs, false)

  if (userJson.id === 'InvalidTokenException') {
    const session = await getSession(request.headers.get('Cookie'))

    return redirect('/', {
      headers: {
        'Set-Cookie': await destroySession(session),
      },
    })
  }

  return {
    userJson,
    token,
    apiClientBaseUrl: envServer().WEBSITE_API_BASE_URL,
    codeVerified: cookie.has(CookieKeys.codeVerified)
      ? cookie.get(CookieKeys.codeVerified).toString() === 'true'
      : false,
  }
}

const SettingsIndex = () => {
  return (
    <>
      <SettingsLayout>
        <SettingsIndexView />
        <Outlet />
      </SettingsLayout>
    </>
  )
}

export default SettingsIndex
