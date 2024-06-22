import { Button } from '@mui/material'
import { Divider } from '../../divider/divider.view'

export const FormFooter = () => {
  return (
    <div className="py-6">
      <Divider className="mb-6" />

      <div className="grid sm:flex sm:items-center gap-5">
        <div className="sm:grow">
          <Button type="submit" variant="outlined" size="large" fullWidth>
            Save
          </Button>
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
