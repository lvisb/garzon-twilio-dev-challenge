import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import './styles/tailwindcss/tailwind.css'
import { ReactNode, useContext } from 'react'
import { withEmotionCache } from '@emotion/react'
import ClientStyleContext from './styles/emotion/client.context'
import { unstable_useEnhancedEffect } from '@mui/material'
import { LinksFunction } from '@remix-run/node'

export const links: LinksFunction = () => [
  {
    href: 'https://fonts.googleapis.com',
    rel: 'preconnect',
  },
  {
    href: 'https://fonts.gstatic.com',
    rel: 'preconnect',
    crossOrigin: 'anonymous',
  },
  {
    href: 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap',
    rel: 'stylesheet',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/favicons/apple-touch-icon.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicons/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicons/favicon-16x16.png',
  },
  {
    rel: 'manifest',
    href: '/favicons/site.webmanifest',
  },
  {
    rel: 'mask-icon',
    color: '#8c4580',
    href: '/favicons/safari-pinned-tab.svg',
  },
  {
    rel: 'shortcut icon',
    href: '/favicon.ico',
  },
]

type DocumentProps = {
  children: ReactNode
  title?: string
}

const Document = withEmotionCache(
  ({ children, title }: DocumentProps, emotionCache) => {
    const clientStyleData = useContext(ClientStyleContext)

    // Only executed on client
    unstable_useEnhancedEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head
      // re-inject tags
      const tags = emotionCache.sheet.tags
      emotionCache.sheet.flush()
      tags.forEach((tag) => {
        // eslint-disable-next-line no-underscore-dangle
        ;(emotionCache.sheet as any)._insertTag(tag)
      })
      // reset cache to reapply global styles
      clientStyleData.reset()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          {title ? <title>{title}</title> : null}
          <meta name="robots" content="noindex, nofollow" />
          <meta name="msapplication-TileColor" content="#8c4580" />
          <meta
            name="msapplication-config"
            content="/favicons/browserconfig.xml"
          />
          <meta name="theme-color" content="#8c4580" />
          <Meta />
          <Links />
          <meta
            name="emotion-insertion-point"
            content="emotion-insertion-point"
          />
        </head>
        <body className="bg-[linear-gradient(67deg,#2bd2ff,#8c4580)]">
          {children}
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    )
  },
)

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}
