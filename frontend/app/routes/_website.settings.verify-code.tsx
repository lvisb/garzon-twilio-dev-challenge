import {
  LoaderFunctionArgs,
  redirect,
  type ActionFunction,
  type MetaFunction,
} from '@remix-run/node'
import { Expose, plainToInstance } from 'class-transformer'
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
import { SettingsVerifyCodeView } from '~/route-pages/settings/pages/verify-code/verify-code.view'
import { SettingsApiServer } from '~/route-pages/settings/services/settings.server'
import { responseLoader } from '~/services/api.server'

export const meta: MetaFunction = () => {
  return [{ title: GLOBALS.name }]
}

class CodeDto {
  @Expose()
  code: string = ''

  @Expose()
  phone: string = ''
}

export const action: ActionFunction = async (remixArgs) => {
  const { request } = remixArgs
  const cookie = await getCookie(request)
  const token = cookie.get(CookieKeys.token)

  const service = new SettingsApiServer({ token })
  const rawData: any = qs.parse(await request.text())

  const data = plainToInstance(CodeDto, rawData, {
    excludeExtraneousValues: true,
  })

  const resultJson = await responseLoader(
    service.verifyCode(data.code, data.phone),
    remixArgs,
  )

  if (resultJson.status === 'ok') {
    const session = await getSession(request.headers.get('Cookie'))
    const expireDate = cookieExpireDate()

    session.set(CookieKeys.token, token)
    session.set(CookieKeys.expireDate, expireDate?.toString())
    session.set(CookieKeys.codeVerified, true)
    session.unset(CookieKeys.newPhone)

    return redirect('/settings', {
      headers: {
        'Set-Cookie': await commitSession(
          session,
          cookieOptions({ expireDate: expireDate! }),
        ),
      },
    })
  }

  return resultJson
}

export const loader = async (remixArgs: LoaderFunctionArgs) => {
  const { request } = remixArgs
  const cookie = await getCookie(request)
  const token = cookie.get(CookieKeys.token)

  // api para dados de permissão do usuário
  const service = new SettingsApiServer({ token })

  // permissões do usuário no projeto
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
    newPhone: cookie.get('newPhone'),
  }
}

export default SettingsVerifyCodeView
