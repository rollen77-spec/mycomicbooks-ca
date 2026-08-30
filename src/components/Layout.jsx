import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { installAudioMutex } from '../utils/audioCoordination.js'
import { BackgroundMusic } from './BackgroundMusic.jsx'
import { SiteFooter } from './SiteFooter.jsx'
import { SiteHeader } from './SiteHeader.jsx'

export function Layout() {
  useEffect(() => installAudioMutex(), [])

  return (
    <div className="flex min-h-dvh flex-col bg-panel text-ink">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <BackgroundMusic />
    </div>
  )
}
