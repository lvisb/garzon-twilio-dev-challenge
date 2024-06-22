import { Outlet } from '@remix-run/react'
import { SettingsLayout } from '~/layout/settings-layout/settings-layout.view'

const Settings = () => {
  return (
    <SettingsLayout>
      <Outlet />
    </SettingsLayout>
  )
}

export default Settings
