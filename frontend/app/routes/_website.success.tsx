import {
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import { authLoader, getCookie } from '~/common/auto-loader.server'
import { GLOBALS } from '~/common/config/globals.config'
import { destroySession, getSession } from '~/common/cookie.server'
import { SettingsLayout } from '~/layout/settings-layout/settings-layout.view'
import { SettingsApiServer } from '~/route-pages/settings/services/settings.server'
import { SuccessView } from '~/route-pages/success/success.view'
import { responseLoader } from '~/services/api.server'

export const meta: MetaFunction = () => {
  return [{ title: GLOBALS.name }]
}

export const loader = async (remixArgs: LoaderFunctionArgs) => {
  const { token } = await authLoader(remixArgs)
  const { request } = remixArgs
  const cookie = await getCookie(request)

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
    recentlyActivated: cookie.get('recentlyActivated') || false,
  }
}

function SuccessIndex() {
  return (
    <SettingsLayout>
      <SuccessView />
    </SettingsLayout>
  )
}

export default SuccessIndex
