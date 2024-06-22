import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { useId } from 'react'

export type DeleteConfirmationDialogProps = {
  open: boolean
  onClose: () => void
}

export const DeleteConfirmationDialog = ({
  open,
  onClose,
}: DeleteConfirmationDialogProps) => {
  const titleID = useId()
  const descriptionID = useId()

  const handleDelete = () => {
    console.log('Account deleted!')
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={titleID}
      aria-describedby={descriptionID}
    >
      <DialogTitle id={titleID}>Delete my account</DialogTitle>

      <DialogContent dividers>
        <DialogContentText color="black" id={descriptionID}>
          Are you sure you want to delete your account? This action is
          irreversible.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button variant="text" color="error" onClick={handleDelete}>
          Delete my account
        </Button>

        <Button type="button" variant="outlined" onClick={onClose} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
