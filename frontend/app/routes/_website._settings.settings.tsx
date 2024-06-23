import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { Outlet, json, redirect } from '@remix-run/react'
import { authLoader } from '~/common/auto-loader.server'
import { GLOBALS } from '~/common/config/globals.config'
import { destroySession, getSession } from '~/common/cookie.server'
import { SettingsIndexView } from '~/route-pages/settings/pages/index/index.view'
import { SettingsApiServer } from '~/route-pages/settings/services/settings.server'
import { responseLoader } from '~/services/api.server'

export const meta: MetaFunction = () => {
  return [{ title: GLOBALS.name }]
}

export const action = async ({ request }: ActionFunctionArgs) => {
    return json({})
}

export const loader = async (remixArgs: LoaderFunctionArgs) => {
  const { token } = await authLoader(remixArgs)
  const { request } = remixArgs

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
  }
}

const SettingsIndex = () => {
  return (
    <>
      <SettingsIndexView />
      <Outlet />
    </>
  )
}

export default SettingsIndex
