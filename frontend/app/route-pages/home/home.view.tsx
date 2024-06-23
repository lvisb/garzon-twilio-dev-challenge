import { Box } from '@mui/material'
import { SignIn } from './views/sign-in/sign-in.view'
import { useLoaderData } from '@remix-run/react'
import { useEffect } from 'react'
import { useGlobalDialogStore } from '~/common/global-dialog.store'

export const HomeView = () => {
  const { json } = useLoaderData() as any

  const { openDialog } = useGlobalDialogStore((state) => {
    return state
  })

  useEffect(() => {
    if (json.status !== 'error') return

    openDialog(json.message)

    return
  }, [json, openDialog])

  return (
    <>
      <div className="text-center">
        <h1 className="leading-snug text-2xl sm:text-[2rem] font-bold text">
          Your Daily Dose of <br className="hidden sm:inline" />
          Organization and Inspiration!
        </h1>

        <p className="mt-4 mb-16">
          Connect your calendar and start enjoying your{' '}
          <br className="hidden sm:inline" />
          personalized daily summary.
        </p>

        <Box
          maxWidth={{
            sm: 370,
          }}
          mx="auto"
        >
          <SignIn />

          {/**<Divider
          sx={{
            my: 4,
            textTransform: 'uppercase',
            fontWeight: 700,
            color: '#999',
            ':before,:after': {
              borderTop: '2px solid #999',
            },
          }}
        >
          Or
        </Divider>

        <SignInButton color="secondary">Demo Account</SignInButton>**/}
        </Box>
      </div>
    </>
  )
}
