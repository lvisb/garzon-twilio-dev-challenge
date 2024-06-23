import { Button } from '@mui/material'
import { LoadingButton} from '@mui/lab'
import { Divider } from '../../divider/divider.view'
import { useNavigation } from '@remix-run/react'

export const FormFooter = () => {
  const { state } = useNavigation()
  const loading = state !== 'idle'

  return (
    <div className="py-6">
      <Divider className="mb-6" />

      <div className="grid sm:flex sm:items-center gap-5">
        <div className="sm:grow">
          <LoadingButton type="submit" variant="outlined" size="large" fullWidth loading={loading}>
            Save
          </LoadingButton>
        </div>

        <div className="sm:shrink-0 sm:order-first">
          <Button
            type="button"
            variant="outlined"
            color="error"
            size="large"
            sx={{ fontWeight: 400 }}
            fullWidth
          >
            Cancel
          </Button>
        </div>
      </div>

      <Divider className="mt-6" />
    </div>
  )
}
