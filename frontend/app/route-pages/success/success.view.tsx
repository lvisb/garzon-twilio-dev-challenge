import { Button } from '@mui/material'
import { useNavigate } from '@remix-run/react'

export const SuccessView = () => {
  const navigate = useNavigate()

  return (
    <div className="text-center">
      <div className="text-xl sm:text-[1.75rem] leading-snug">
        <h1>
          <strong>Lorem Ipsum</strong>, that’s it!
        </h1>

        <p>You’re all set to receive daily updates.</p>
      </div>

      <p className="mt-2 mb-16 sm:mb-36 text-base sm:text-xl">
        The email is sent out at 6 AM.
      </p>

      <Button
        type="button"
        variant="outlined"
        size="large"
        onClick={() => {
          navigate('/settings')
        }}
        sx={{
          width: {
            xs: '100%',
            sm: 'auto',
          },
        }}
      >
        Settings
      </Button>
    </div>
  )
}
