import { Link } from '@mui/material'
import { Link as RemixLink } from '@remix-run/react'
import { ReactNode } from 'react'
import { MainContent } from '~/components/main-content/main-content.view'

export type SettingsLayoutProps = {
  children: ReactNode
}

export const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return (
    <>
      <MainContent
        sx={{
          maxWidth: 640,
          px: {
            sm: 7,
            xs: 2,
          },
          pb: {
            sm: 8,
            xs: 4,
          },
        }}
      >
        {children}
      </MainContent>

      <p className="mt-8 text-center">
        <Link
          component={RemixLink}
          to="/privacy-policy"
          color="#000"
          fontWeight={700}
          textTransform="lowercase"
          fontSize={20}
        >
          Privacy policy
        </Link>
      </p>
    </>
  )
}
