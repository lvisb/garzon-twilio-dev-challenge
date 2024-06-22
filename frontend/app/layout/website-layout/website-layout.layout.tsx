import { ReactNode } from 'react'

export type WebsiteLayoutProps = {
  children: ReactNode
}

export const WebsiteLayout = ({ children }: WebsiteLayoutProps) => {
  return (
    <main className="p-2 sm:pt-16 sm:pb-40">
      <div className="min-h-screen flex flex-col">
        <div className="w-full m-auto">{children}</div>
      </div>
    </main>
  )
}
