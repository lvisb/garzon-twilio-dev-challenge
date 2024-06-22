import type { MetaFunction } from '@remix-run/node'
import { GLOBALS } from '~/common/config/globals.config'
import { PrivacyPolicyViews } from '~/route-pages/privacy-policy/privacy-policy.view'

export const meta: MetaFunction = () => {
  return [{ title: `Privacy Policy | ${GLOBALS.name}` }]
}

export default PrivacyPolicyViews
