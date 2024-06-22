import { Button, Link } from '@mui/material'
import { Link as RemixLink } from '@remix-run/react'
import { DeleteConfirmationDialog } from './delete-confirmation-dialog/delete-confirmation-dialog.view'
import { useState } from 'react'

export const SecondaryActions = () => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const openDialog = () => {
    setDialogOpen(true)
  }

  const closeDialog = () => {
    setDialogOpen(false)
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <Link
          component={RemixLink}
          to="/logout"
          sx={{
            textTransform: 'lowercase',
            fontSize: 20,
            textDecoration: 'none',
            ':hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Logout
        </Link>

        <Button
          type="button"
          variant="text"
          color="error"
          size="small"
          sx={{ textTransform: 'lowercase', fontSize: 12 }}
          onClick={openDialog}
        >
          Delete my account
        </Button>
      </div>

      <DeleteConfirmationDialog open={dialogOpen} onClose={closeDialog} />
    </>
  )
}
