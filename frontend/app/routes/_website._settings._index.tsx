import type { MetaFunction } from '@remix-run/node'
import { GLOBALS } from '~/common/config/globals.config'
import { HomeView } from '~/route-pages/home/home.view'

export const meta: MetaFunction = () => {
  return [{ title: GLOBALS.name }]
}

export default HomeView
