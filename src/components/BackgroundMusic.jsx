import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { themeSong } from '../data/siteContent.js'

export function BackgroundMusic() {
  const { pathname } = useLocation()
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [needsGesture, setNeedsGesture] = useState(false)
  const onHome = pathname === '/'

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !onHome) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    audio.volume = themeSong.volume ?? 0.45
    audio.loop = themeSong.loop !== false

    const onPlay = () => {
      setPlaying(true)
      setNeedsGesture(false)
    }
    const onPause = () => setPlaying(false)

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    if (reduceMotion) {
      queueMicrotask(() => setNeedsGesture(true))
      return () => {
        audio.removeEventListener('play', onPlay)
        audio.removeEventListener('pause', onPause)
        audio.pause()
      }
    }

    const tryPlay = () =>
      audio.play().catch(() => {
        setNeedsGesture(true)
      })

    tryPlay()

    const unlock = () => {
      if (!audio.paused) return
      tryPlay()
    }
    document.addEventListener('pointerdown', unlock, { once: true })
    document.addEventListener('keydown', unlock, { once: true })

    return () => {
      document.removeEventListener('pointerdown', unlock)
      document.removeEventListener('keydown', unlock)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.pause()
    }
  }, [onHome])

  if (!onHome) return null

  function toggle() {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      audio.play().catch(() => setNeedsGesture(true))
    } else {
      audio.pause()
    }
  }

  return (
    <>
      <audio ref={audioRef} src={themeSong.src} preload="auto" playsInline>
        <track kind="captions" />
      </audio>

      <div className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6">
        <button
          type="button"
          onClick={toggle}
          className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-ink/95 px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-cream shadow-lg shadow-black/30 backdrop-blur-md transition hover:border-brand hover:bg-ink"
          aria-pressed={playing}
          aria-label={playing ? `Pause ${themeSong.title}` : `Play ${themeSong.title}`}
        >
          <span aria-hidden="true">{playing ? '❚❚' : '▶'}</span>
          <span>{needsGesture && !playing ? 'Play music' : playing ? 'Music on' : 'Music off'}</span>
        </button>
      </div>
    </>
  )
}
