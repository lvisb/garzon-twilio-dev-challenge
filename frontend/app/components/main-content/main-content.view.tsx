import type { CardProps } from '@mui/material'
import { Card } from '@mui/material'
import { ReactNode } from 'react'
import { GLOBALS } from '~/common/config/globals.config'

export type MainContentProps = {
  children?: ReactNode
  sx?: CardProps['sx']
}

export const MainContent = ({ children, sx }: MainContentProps) => {
  return (
    <Card
      elevation={8}
      sx={{
        mx: 'auto',
        bgcolor: 'white',
        ...sx,
      }}
    >
      <div className="py-8 sm:pt-[3.75rem] sm:pb-16">
        <img
          src="/images/logo.webp"
          className="block mx-auto"
          alt={`${GLOBALS.name} logo`}
        />
      </div>

      {children}
    </Card>
  )
}
