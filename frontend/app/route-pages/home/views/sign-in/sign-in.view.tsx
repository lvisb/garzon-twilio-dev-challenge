import { Apple, Google, Microsoft } from '@mui/icons-material'
import { SignInButton } from '../sign-in-button/sign-in-button.view'

export const SignIn = () => {
  return (
    <div className="grid gap-7">
      <SignInButton icon={<Google />}>Sign in with Google</SignInButton>
      <SignInButton icon={<Apple />}>Sign in with Apple</SignInButton>
      <SignInButton icon={<Microsoft />}>Sign in with Microsoft</SignInButton>
    </div>
  )
}
