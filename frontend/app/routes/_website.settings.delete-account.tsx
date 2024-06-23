import {
  LoaderFunctionArgs,
  redirect,
  type ActionFunction,
  type MetaFunction,
} from '@remix-run/node'
import { Expose,  } from 'class-transformer'
import { getCookie } from '~/common/auto-loader.server'
import { GLOBALS } from '~/common/config/globals.config'
import {
  CookieKeys,
  destroySession,
  getSession,
} from '~/common/cookie.server'
import { SettingsDeleteAccountView } from '~/route-pages/settings/pages/delete-account/delete-account.view'
import { SettingsApiServer } from '~/route-pages/settings/services/settings.server'
import { responseLoader } from '~/services/api.server'

export const meta: MetaFunction = () => {
  return [{ title: GLOBALS.name }]
}

export const action: ActionFunction = async (remixArgs) => {
  const { request } = remixArgs
  const cookie = await getCookie(request)
  const token = cookie.get(CookieKeys.token)

  const service = new SettingsApiServer({ token })

  const resultJson = await responseLoader(service.deleteAccount(), remixArgs)

  if (resultJson.status === 'ok') {
    const session = await getSession(request.headers.get('Cookie'))

    return redirect('/account-deleted', {
      headers: {
        'Set-Cookie': await destroySession(session),
      },
    })
  }

  return resultJson
}

export const loader = async (remixArgs: LoaderFunctionArgs) => {
  const { request } = remixArgs
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

  return {}
}

export default SettingsDeleteAccountView
