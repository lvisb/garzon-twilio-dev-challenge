import type { MetaFunction } from '@remix-run/node'
import { GLOBALS } from '~/common/config/globals.config'
import { SettingsVerifyCodeView } from '~/route-pages/settings/pages/verify-code/verify-code.view'

export const meta: MetaFunction = () => {
  return [{ title: GLOBALS.name }]
}

export default SettingsVerifyCodeView
