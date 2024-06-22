import type { MetaFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { GLOBALS } from '~/common/config/globals.config'
import { SettingsIndexView } from '~/route-pages/settings/pages/index/index.view'

export const meta: MetaFunction = () => {
  return [{ title: GLOBALS.name }]
}

const SettingsIndex = () => {
  return (
    <>
      <SettingsIndexView />
      <Outlet />
    </>
  )
}

export default SettingsIndex
