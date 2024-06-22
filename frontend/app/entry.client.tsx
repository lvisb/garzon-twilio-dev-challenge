import type { ReactNode } from 'react'

import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { RemixBrowser } from '@remix-run/react'
import { startTransition, useState } from 'react'
import { hydrateRoot } from 'react-dom/client'

import createEmotionCache from './styles/emotion/cache'
import ClientStyleContext from './styles/emotion/client.context'
import { theme } from './styles/mui/theme'

interface ClientCacheProviderProps {
  children: ReactNode
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(createEmotionCache())

  function reset() {
    setCache(createEmotionCache())
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  )
}

requestIdleCallback(() => {
  startTransition(() => {
    hydrateRoot(
      document,
      <ClientCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RemixBrowser />
        </ThemeProvider>
      </ClientCacheProvider>,
    )
  })
})
