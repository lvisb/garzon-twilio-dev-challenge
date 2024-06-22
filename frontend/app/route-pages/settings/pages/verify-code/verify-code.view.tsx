import { HighlightOff as CloseIcon } from '@mui/icons-material'
import { Dialog, IconButton } from '@mui/material'
import { Form } from './views/form/form.view'
import { useNavigate } from '@remix-run/react'

export const SettingsVerifyCodeView = () => {
  const navigate = useNavigate()

  const handleClose = () => {
    navigate('..')
  }

  return (
    <Dialog
      sx={{
        maxWidth: 640,
        mx: 'auto',
        '.MuiBackdrop-root': {
          bgcolor: 'rgba(255, 255, 255, 0.8)',
        },
        '.MuiDialog-container': {
          width: '100%',
          maxWidth: '100%',
        },
        '.MuiPaper-root': {
          maxWidth: '100%',
          width: '100%',
          mx: 0,
        },
      }}
      open
    >
      <div className="p-4">
        <div className="text-right">
          <IconButton
            aria-label="Close"
            size="large"
            color="primary"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <p className="mt-1 text-center text-xl font-bold sm:text-[1.75rem]">
          Please provide the code received <br className="hidden sm:inline" />
          on your phone to confirm
        </p>

        <Form />
      </div>
    </Dialog>
  )
}
