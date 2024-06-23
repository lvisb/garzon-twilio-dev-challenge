import {
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import { getCookie } from '~/common/auto-loader.server'
import { envServer } from '~/common/config/env.server'
import { GLOBALS } from '~/common/config/globals.config'
import { SettingsLayout } from '~/layout/settings-layout/settings-layout.view'
import { HomeView } from '~/route-pages/home/home.view'
import { SettingsApiServer } from '~/route-pages/settings/services/settings.server'
import { responseLoader } from '~/services/api.server'

export const loader = async (remixArgs: LoaderFunctionArgs) => {
  const { request } = remixArgs
  const cookie = await getCookie(request)
  const token = cookie.get('token')

  if (token) {
    const service = new SettingsApiServer({ token })

    const userJson = await responseLoader(service.loadUser(), remixArgs, false)

    if (userJson.status === 'ok') {
      if (userJson.user.isActive) return redirect('/success')

      return redirect('/settings')
    }
  }

  return {
    json: {},
    env: {
      nylasClientId: envServer().NYLAS_CLIENT_ID,
      nylasRedirectUri: envServer().NYLAS_REDIRECT_URI,
    },
  }
}

export const meta: MetaFunction = () => {
  return [{ title: GLOBALS.name }]
}

export default function HomeIndex() {
  return (
    <SettingsLayout>
      <HomeView />
    </SettingsLayout>
  )
}
