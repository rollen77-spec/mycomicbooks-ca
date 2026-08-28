import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { themeSong } from '../data/siteContent.js'
import { COMIC_AUDIO_EVENT, isNarrationActive } from '../utils/audioCoordination.js'

export function BackgroundMusic() {
  const { pathname } = useLocation()
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const onHome = pathname === '/'

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !onHome) return

    audio.volume = themeSong.volume ?? 0.45
    audio.loop = themeSong.loop !== false

    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    const onComicAudio = (event) => {
      if (event.detail?.playing) audio.pause()
    }
    window.addEventListener(COMIC_AUDIO_EVENT, onComicAudio)

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      window.removeEventListener(COMIC_AUDIO_EVENT, onComicAudio)
      audio.pause()
    }
  }, [onHome])

  if (!onHome) return null

  function toggle() {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      if (isNarrationActive()) return
      audio.play().catch(() => {})
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
          <span>{playing ? 'Music on' : 'Play music'}</span>
        </button>
      </div>
    </>
  )
}
