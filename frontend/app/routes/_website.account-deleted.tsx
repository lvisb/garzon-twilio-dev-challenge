import { Button } from '@mui/material'
import {
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import { useNavigate } from '@remix-run/react'
import { GLOBALS } from '~/common/config/globals.config'
import { SettingsLayout } from '~/layout/settings-layout/settings-layout.view'

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
  const navigate = useNavigate()

  return (
    <div className="text-center">
      <div className="text-xl sm:text-[1.75rem] leading-snug">
        <h1>Account Deletion Confirmation</h1>
      </div>

      <p
        className={`mt-2 mb-16 sm:mb-36 text-base sm:text-xl`}
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
