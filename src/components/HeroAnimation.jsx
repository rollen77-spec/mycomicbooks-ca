import { useEffect, useRef, useState } from 'react'
import { vimeo } from '../data/siteContent.js'

const heroVideoSrc = `https://player.vimeo.com/video/${vimeo.id}?h=${vimeo.hash}&autoplay=1&muted=1&loop=0&title=0&byline=0&portrait=0&controls=0&playsinline=1`
const REPLAY_INTERVAL_MS = vimeo.replayIntervalMs ?? 60_000

function loadVimeoApi() {
  if (window.Vimeo?.Player) return Promise.resolve()

  const existing = document.querySelector('script[data-vimeo-api]')
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', reject, { once: true })
    })
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://player.vimeo.com/api/player.js'
    script.dataset.vimeoApi = 'true'
    script.async = true
    script.onload = () => resolve()
    script.onerror = reject
    document.body.appendChild(script)
  })
}

export function HeroAnimation() {
  const iframeRef = useRef(null)
  const playerRef = useRef(null)
  const replayTimerRef = useRef(null)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (reduceMotion || !iframeRef.current) return

    let cancelled = false

    loadVimeoApi()
      .then(() => {
        if (cancelled || !iframeRef.current) return

        const player = new window.Vimeo.Player(iframeRef.current)
        playerRef.current = player

        player.setLoop(false).catch(() => {})
        player.setMuted(true).catch(() => {})
        player.play().catch(() => {})

        const onEnded = () => {
          if (replayTimerRef.current) clearTimeout(replayTimerRef.current)
          replayTimerRef.current = window.setTimeout(() => {
            player.setCurrentTime(0).then(() => player.play()).catch(() => {})
          }, REPLAY_INTERVAL_MS)
        }

        player.on('ended', onEnded)
      })
      .catch(() => {})

    return () => {
      cancelled = true
      if (replayTimerRef.current) clearTimeout(replayTimerRef.current)
      const player = playerRef.current
      playerRef.current = null
      if (!player) return
      try {
        player.off('ended')
      } catch {
        // ignore
      }
      try {
        player.unload?.()
      } catch {
        // ignore
      }
    }
  }, [reduceMotion])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-y-0 right-0 w-full lg:w-[62%] xl:w-[58%]">
        {!reduceMotion ? (
          <iframe
            ref={iframeRef}
            className="absolute left-1/2 top-1/2 h-[130%] w-[130%] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 border-0 lg:left-[52%]"
            src={heroVideoSrc}
            title="My Comic Books logo animation"
            allow="autoplay; fullscreen"
            tabIndex={-1}
          />
        ) : (
          <div className="flex h-full items-center justify-center opacity-40">
            <img
              src="/site/logo.svg"
              alt=""
              className="h-auto w-full max-w-[260px]"
              width={260}
              height={87}
              decoding="async"
            />
          </div>
        )}
      </div>
    </div>
  )
}
