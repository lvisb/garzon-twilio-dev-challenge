import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { getSession } from './cookie.server'

/**
 * Recupera o cookie do request.
 */
export const getCookie = async (request: Request) => {
  const cookie = await getSession(request.headers.get('Cookie'))

  return cookie
}

export const authLoader = async (args: LoaderFunctionArgs) => {
  const { request } = args

  const cookie = await getCookie(request)

  if (!cookie.has('token')) throw redirect(`/`)

  return { token: cookie.get('token') }
}
