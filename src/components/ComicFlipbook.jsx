import { useEffect, useRef, useState } from 'react'
import {
  pauseAllAudioExcept,
  setNarrationActive,
} from '../utils/audioCoordination.js'

function pageIndexForTime(time, pageStarts) {
  let index = 0
  for (let i = 0; i < pageStarts.length; i += 1) {
    if (time >= pageStarts[i]) index = i
  }
  return index
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const total = Math.floor(seconds)
  const mins = Math.floor(total / 60)
  const secs = total % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function ComicFlipbook({ pages, audio }) {
  const audioRef = useRef(null)
  const pageRef = useRef(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [flipping, setFlipping] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const page = pages[currentPage]
  const pageStarts = audio?.pageStarts ?? []

  function syncPage(index) {
    pageRef.current = index
    setCurrentPage(index)
  }

  useEffect(() => {
    const el = audioRef.current
    if (!el) return undefined

    const onLoaded = () => setDuration(el.duration || 0)
    const onPlay = () => {
      pauseAllAudioExcept(el)
      setNarrationActive(true)
      setPlaying(true)
    }
    const onPause = () => {
      setPlaying(false)
      setNarrationActive(false)
    }
    const onTime = () => {
      setProgress(el.currentTime)
      if (el.seeking || el.paused || !pageStarts.length) return
      const nextPage = pageIndexForTime(el.currentTime, pageStarts)
      if (nextPage !== pageRef.current) {
        pageRef.current = nextPage
        setFlipping(true)
        setCurrentPage(nextPage)
        window.setTimeout(() => setFlipping(false), 220)
      }
    }

    el.addEventListener('loadedmetadata', onLoaded)
    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onPause)
    el.addEventListener('ended', onPause)
    el.addEventListener('timeupdate', onTime)

    if (el.readyState >= 1) onLoaded()

    return () => {
      el.removeEventListener('loadedmetadata', onLoaded)
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onPause)
      el.removeEventListener('ended', onPause)
      el.removeEventListener('timeupdate', onTime)
      el.pause()
      setNarrationActive(false)
    }
  }, [audio?.src, pageStarts])

  function goTo(nextIndex) {
    if (flipping || nextIndex < 0 || nextIndex >= pages.length || nextIndex === currentPage) return
    setFlipping(true)
    syncPage(nextIndex)

    const el = audioRef.current
    const start = pageStarts[nextIndex]
    if (el && !el.paused && typeof start === 'number') {
      el.currentTime = start
      setProgress(start)
    }

    window.setTimeout(() => setFlipping(false), 220)
  }

  function startNarration() {
    const el = audioRef.current
    if (!el) return

    pauseAllAudioExcept(el)
    setNarrationActive(true)
    el.currentTime = 0
    setProgress(0)
    syncPage(0)
    el.play().catch(() => {
      setNarrationActive(false)
    })
  }

  function toggleNarration() {
    const el = audioRef.current
    if (!el) return

    if (el.paused) {
      if (el.ended || el.currentTime < 1) {
        startNarration()
        return
      }
      pauseAllAudioExcept(el)
      setNarrationActive(true)
      el.play().catch(() => {
        setNarrationActive(false)
      })
      return
    }

    el.pause()
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          className="rounded-lg border border-ink/15 bg-white px-4 py-2 text-sm font-semibold uppercase tracking-wide text-ink transition hover:bg-cream-muted disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage <= 0 || flipping || playing}
        >
          Previous page
        </button>
        <p className="text-sm text-body-muted">
          Page {currentPage + 1} of {pages.length}
        </p>
        <button
          type="button"
          className="ui-btn-primary-sm disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => goTo(currentPage + 1)}
          disabled={currentPage >= pages.length - 1 || flipping || playing}
        >
          Next page
        </button>
      </div>

      <div className="w-full max-w-[40rem]">
        <div
          className={[
            'overflow-hidden rounded-xl border border-ink/10 bg-white shadow-lg shadow-black/15 transition duration-200',
            flipping ? 'scale-[0.985] opacity-70' : 'scale-100 opacity-100',
          ].join(' ')}
        >
          {page ? (
            <img
              key={page.src}
              src={page.src}
              alt={page.alt ?? `Comic page ${currentPage + 1}`}
              className="mx-auto block h-auto w-full"
              draggable={false}
            />
          ) : null}
        </div>
      </div>

      {audio?.src ? (
        <div className="w-full max-w-xl space-y-3 text-center">
          <p className="text-sm text-body-muted">{audio.description}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" className="ui-btn-primary" onClick={toggleNarration}>
              {playing ? 'Pause narration' : 'Play narration'}
            </button>
            {!playing ? (
              <button type="button" className="ui-btn-primary-sm" onClick={startNarration}>
                Start from page 1
              </button>
            ) : null}
          </div>
          <p className="text-xs text-body-muted">
            {formatTime(progress)}
            {duration ? ` / ${formatTime(duration)}` : ''}
          </p>
          <audio ref={audioRef} className="sr-only" preload="auto" src={audio.src}>
            <track kind="captions" />
          </audio>
          <p className="text-xs text-body-muted">
            Pages turn at 2:51 and 4:22 while narration plays. Pause background music for the best experience.
          </p>
        </div>
      ) : null}
    </div>
  )
}
