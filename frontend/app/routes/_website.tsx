import { Outlet, json } from '@remix-run/react'
import { WebsiteLayout } from '~/layout/website-layout/website-layout.layout'
import { useGlobalDialogStore } from '~/common/global-dialog.store'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material'

const Website = () => {
  const { closeDialog, open, message } = useGlobalDialogStore((state) => state)

  return (
    <>
      <WebsiteLayout>
        <Outlet />
      </WebsiteLayout>

      <Dialog open={open} onClose={closeDialog}>
        <DialogContent dividers>
          <DialogContentText color="black">{message}</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button type="button" variant="outlined" onClick={closeDialog}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Website
