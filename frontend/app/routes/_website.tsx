import { Outlet } from '@remix-run/react'
import { WebsiteLayout } from '~/layout/website-layout/website-layout.layout'

const Website = () => {
  return (
    <WebsiteLayout>
      <Outlet />
    </WebsiteLayout>
  )
}

export default Website
