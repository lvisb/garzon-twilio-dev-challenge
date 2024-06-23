import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { destroySession, getSession } from '~/common/cookie.server'

export const loader = async (remixArgs: LoaderFunctionArgs) => {
  const { request } = remixArgs
  const session = await getSession(request.headers.get('Cookie'))

  return redirect('/settings/verify-code', {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  })
}

export default function Logout() {
  return <></>
}
