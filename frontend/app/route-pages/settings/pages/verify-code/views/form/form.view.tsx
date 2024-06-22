import { Button, TextField } from '@mui/material'
import { Form as RemixForm } from '@remix-run/react'

export const Form = () => {
  return (
    <RemixForm className="max-w-52 w-full mt-8 pb-8 sm:pb-16 mx-auto text-center">
      <label htmlFor="codeField" className="sr-only">
        Code
      </label>

      <TextField
        id="codeField"
        inputMode="decimal"
        sx={{
          maxWidth: 206,
          '.MuiInputBase-input': {
            textAlign: 'center',
            py: {
              sm: 0,
            },
            height: {
              sm: 60,
            },
            fontSize: {
              sm: 40,
              xs: 20,
            },
          },
        }}
        fullWidth
      />

      <Button
        type="submit"
        variant="outlined"
        color="primary"
        sx={{
          fontWeight: 700,
          mt: {
            sm: '84px',
            xs: 2,
          },
          px: 0,
        }}
        size="large"
        fullWidth
      >
        Verify code
      </Button>
    </RemixForm>
  )
}
