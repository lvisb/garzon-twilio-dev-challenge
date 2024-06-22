import { Apple, Google, Microsoft } from '@mui/icons-material'
import { SignInButton } from '../sign-in-button/sign-in-button.view'
import { useLoaderData,  } from '@remix-run/react'

export const SignIn = () => {
  const data = useLoaderData() as any

  const baseButtonUrl = `https://api.us.nylas.com/v3/connect/auth?client_id=${data.env.nylasClientId}&redirect_uri=${data.env.nylasRedirectUri}&response_type=code`

  return (
    <div className="grid gap-7">
      <SignInButton
        icon={<Google />}
        onClick={() =>
          (window.location.href = `${baseButtonUrl}&provider=google`)
        }
      >
        Sign in with Google
      </SignInButton>
      <SignInButton icon={<Apple />}>Sign in with Apple</SignInButton>
      <SignInButton icon={<Microsoft />}>Sign in with Microsoft</SignInButton>
    </div>
  )
}
