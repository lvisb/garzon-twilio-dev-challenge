import { Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Divider } from '../../divider/divider.view'
import { useLoaderData, useNavigation } from '@remix-run/react'

export const FormFooter = () => {
  const { userJson } = useLoaderData() as any
  const { state } = useNavigation()
  const loading = state !== 'idle'
  console.log(userJson)

  return (
    <div className="py-6">
      <Divider className="mb-6" />

      <div className="grid sm:flex sm:items-center gap-5">
        <div className="sm:grow">
          <LoadingButton
            type="submit"
            variant="outlined"
            size="large"
            fullWidth
            loading={loading}
          >
            Save
          </LoadingButton>
        </div>

        {userJson.user.isActive && (
          <div className="sm:shrink-0 sm:order-first">
            <LoadingButton
              disabled={loading}
              type="button"
              variant="outlined"
              color="error"
              size="large"
              sx={{ fontWeight: 400 }}
              fullWidth
              onClick={() => (window.location.href = '/success')}
            >
              Cancel
            </LoadingButton>
          </div>
        )}
      </div>

      <Divider className="mt-6" />
    </div>
  )
}
