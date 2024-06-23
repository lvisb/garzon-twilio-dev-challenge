import {
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import { getCookie } from '~/common/auto-loader.server'
import { GLOBALS } from '~/common/config/globals.config'
import { CookieKeys, destroySession, getSession } from '~/common/cookie.server'
import { SettingsLayout } from '~/layout/settings-layout/settings-layout.view'
import { DeletedView } from '~/route-pages/success/success.view'

export const meta: MetaFunction = () => {
  return [{ title: GLOBALS.name }]
}

export const loader = async (remixArgs: LoaderFunctionArgs) => {
  return {}
}

function DeletedIndex() {
  return (
    <SettingsLayout>
      <DeletedView />
    </SettingsLayout>
  )
}

export const DeletedView = () => {
  return (
    <div className="text-center">
      <div className="text-xl sm:text-[1.75rem] leading-snug">
        <h1>Account Deletion Confirmation</h1>
      </div>

      <p
        className={`mt-2 ${!recentlyActivated ? 'mb-16 sm:mb-36' : ''} text-base sm:text-xl`}
      >
        All your personal data and account information have been permanently
        removed.
      </p>

      <Button
        type="button"
        variant="outlined"
        size="large"
        onClick={() => {
          navigate('/', { replace: true })
        }}
        sx={{
          width: {
            xs: '100%',
            sm: 'auto',
          },
        }}
      >
        OK
      </Button>
    </div>
  )
}

export default DeletedIndex
