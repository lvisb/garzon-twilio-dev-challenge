import type { MetaFunction } from '@remix-run/node'
import { GLOBALS } from '~/common/config/globals.config'
import { SuccessView } from '~/route-pages/success/success.view'

export const meta: MetaFunction = () => {
  return [{ title: GLOBALS.name }]
}

export default SuccessView
