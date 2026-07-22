import { Outlet } from 'react-router-dom'
import { BackgroundMusic } from './BackgroundMusic.jsx'
import { SiteFooter } from './SiteFooter.jsx'
import { SiteHeader } from './SiteHeader.jsx'

export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col bg-panel text-body">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <BackgroundMusic />
    </div>
  )
}
