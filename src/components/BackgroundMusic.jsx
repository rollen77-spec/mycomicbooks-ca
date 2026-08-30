import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { themeSong } from '../data/siteContent.js'
import { COMIC_AUDIO_EVENT, isNarrationActive } from '../utils/audioCoordination.js'

export function BackgroundMusic() {
  const { pathname } = useLocation()
  const audioRef = useRef(null)
  const [musicMounted, setMusicMounted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const onHome = pathname === '/'
  const showMusic = !onHome

  useEffect(() => {
    if (!showMusic) {
      setMusicMounted(false)
      setPlaying(false)
    }
  }, [showMusic])

  useEffect(() => {
    const onComicAudio = (event) => {
      if (!event.detail?.playing) return
      setMusicMounted(false)
      setPlaying(false)
    }
    window.addEventListener(COMIC_AUDIO_EVENT, onComicAudio)
    return () => window.removeEventListener(COMIC_AUDIO_EVENT, onComicAudio)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !musicMounted) return undefined

    audio.volume = themeSong.volume ?? 0.45
    audio.loop = themeSong.loop !== false

    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    if (isNarrationActive()) {
      audio.pause()
      return () => {
        audio.removeEventListener('play', onPlay)
        audio.removeEventListener('pause', onPause)
      }
    }

    audio.play().catch(() => {
      setMusicMounted(false)
      setPlaying(false)
    })

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.pause()
    }
  }, [musicMounted])

  if (!showMusic) return null

  function toggle() {
    if (isNarrationActive()) return

    if (musicMounted) {
      audioRef.current?.pause()
      setMusicMounted(false)
      setPlaying(false)
      return
    }

    setMusicMounted(true)
  }

  return (
    <>
      {musicMounted ? (
        <audio ref={audioRef} src={themeSong.src} preload="none" playsInline>
          <track kind="captions" />
        </audio>
      ) : null}

      <div className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6">
        <button
          type="button"
          onClick={toggle}
          disabled={isNarrationActive()}
          className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-ink/95 px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-cream shadow-lg shadow-black/30 backdrop-blur-md transition hover:border-brand hover:bg-ink disabled:cursor-not-allowed disabled:opacity-50"
          aria-pressed={playing}
          aria-label={playing ? `Pause ${themeSong.title}` : `Play ${themeSong.title}`}
        >
          <span aria-hidden="true">{playing ? '❚❚' : '▶'}</span>
          <span>{isNarrationActive() ? 'Narration on' : playing ? 'Music on' : 'Play music'}</span>
        </button>
      </div>
    </>
  )
}
