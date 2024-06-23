import { Button } from '@mui/material'
import { useLoaderData, useNavigate } from '@remix-run/react'

export const SuccessView = () => {
  const navigate = useNavigate()
  const { userJson, recentlyActivated } = useLoaderData() as any
  console.log(useLoaderData())

  return (
    <div className="text-center">
      <div className="text-xl sm:text-[1.75rem] leading-snug">
        <h1>
          <strong>{userJson.user.name}</strong>, that’s it!
        </h1>

        <p>You’re all set to receive daily updates.</p>
      </div>

      <p className={`mt-2 ${!recentlyActivated ? 'mb-16 sm:mb-36' : ''} text-base sm:text-xl`}>
        The email is sent out at 6 AM.
      </p>

      {recentlyActivated && (
        <p className="mt-6 mb-16 sm:mb-36 text-base sm:text-xl">
          <em>Since you have just activated your subscription, we will send you an
          email immediately so you can review today's summary. :)</em>{' '}
        </p>
      )}

      <Button
        type="button"
        variant="outlined"
        size="large"
        onClick={() => {
          navigate('/settings', { replace: true })
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
