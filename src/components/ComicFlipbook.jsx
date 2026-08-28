import { useEffect, useRef, useState } from 'react'
import {
  COMIC_AUDIO_EVENT,
  dispatchComicAudio,
  pauseAllAudioExcept,
} from '../utils/audioCoordination.js'

function pageIndexForTime(time, pageStarts) {
  let index = 0
  for (let i = 0; i < pageStarts.length; i += 1) {
    if (time >= pageStarts[i]) index = i
  }
  return index
}

export function ComicFlipbook({ pages, audio }) {
  const audioRef = useRef(null)
  const seekingRef = useRef(false)
  const pageRef = useRef(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [flipping, setFlipping] = useState(false)
  const [playing, setPlaying] = useState(false)
  const page = pages[currentPage]
  const pageStarts = audio?.pageStarts ?? []

  useEffect(() => {
    pageRef.current = currentPage
  }, [currentPage])

  useEffect(() => {
    const el = audioRef.current
    if (!el) return undefined

    const onPlay = () => {
      pauseAllAudioExcept(el)
      setPlaying(true)
      dispatchComicAudio(true)
    }
    const onPause = () => {
      setPlaying(false)
      dispatchComicAudio(false)
    }
    const onTime = () => {
      if (seekingRef.current || !audio?.pageStarts?.length) return
      const nextPage = pageIndexForTime(el.currentTime, audio.pageStarts)
      if (nextPage !== pageRef.current) {
        setFlipping(true)
        setCurrentPage(nextPage)
        window.setTimeout(() => setFlipping(false), 220)
      }
    }

    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onPause)
    el.addEventListener('ended', onPause)
    el.addEventListener('timeupdate', onTime)

    return () => {
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onPause)
      el.removeEventListener('ended', onPause)
      el.removeEventListener('timeupdate', onTime)
      el.pause()
      dispatchComicAudio(false)
    }
  }, [audio?.pageStarts])

  function goTo(nextIndex) {
    if (flipping || nextIndex < 0 || nextIndex >= pages.length || nextIndex === currentPage) return
    setFlipping(true)
    setCurrentPage(nextIndex)
    pageRef.current = nextIndex
    const el = audioRef.current
    const start = pageStarts[nextIndex]
    if (el && typeof start === 'number') {
      seekingRef.current = true
      el.currentTime = start
      window.setTimeout(() => {
        seekingRef.current = false
      }, 250)
    }
    window.setTimeout(() => setFlipping(false), 220)
  }

  function toggleNarration() {
    const el = audioRef.current
    if (!el) return
    if (el.paused) {
      pauseAllAudioExcept(el)
      el.play().catch(() => {})
    } else {
      el.pause()
    }
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          className="rounded-lg border border-ink/15 bg-white px-4 py-2 text-sm font-semibold uppercase tracking-wide text-ink transition hover:bg-cream-muted disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage <= 0 || flipping}
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
          disabled={currentPage >= pages.length - 1 || flipping}
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
          <button type="button" className="ui-btn-primary" onClick={toggleNarration}>
            {playing ? 'Pause narration' : 'Play narration'}
          </button>
          <audio ref={audioRef} className="w-full" controls preload="auto" src={audio.src}>
            <track kind="captions" />
          </audio>
          <p className="text-xs text-body-muted">
            One recording for the whole issue. Pages turn with the story — or flip first and the audio follows.
          </p>
        </div>
      ) : null}
    </div>
  )
}
