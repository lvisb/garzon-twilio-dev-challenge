import type { ButtonProps } from '@mui/material'
import { Button } from '@mui/material'

type PropsToOmit =
  | 'type'
  | 'variant'
  | 'sx'
  | 'startIcon'
  | 'endIcon'
  | 'fullWidth'

type NativeProps = Omit<ButtonProps, PropsToOmit>

export type SignInButtonProps = NativeProps & {
  icon?: ButtonProps['startIcon']
}

export const SignInButton = ({
  children,
  icon,
  ...props
}: SignInButtonProps) => {
  return (
    <Button
      type="button"
      variant="outlined"
      startIcon={icon}
      size="large"
      sx={{
        justifyContent: {
          sm: icon ? 'flex-start' : 'center',
        },
        fontSize: {
          xs: 18,
          sm: 26,
        },
        textTransform: 'none',
        '.MuiButton-icon': {
          ml: 0,
          mr: {
            sm: 0,
          },
          width: {
            sm: 54,
          },
        },
        '.MuiButton-icon>*:nth-of-type(1)': {
          fontSize: 32,
        },
      }}
      fullWidth
      {...props}
    >
      {children}
    </Button>
  )
}
