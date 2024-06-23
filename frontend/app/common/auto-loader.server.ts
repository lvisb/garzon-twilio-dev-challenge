import { getSession } from './cookie.server'

export const getCookie = async (request: Request) => {
  const cookie = await getSession(request.headers.get('Cookie'))

  return cookie
}

