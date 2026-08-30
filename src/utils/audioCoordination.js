export const COMIC_AUDIO_EVENT = 'mcb:comic-audio'

let narrationActive = false
let mutexInstalled = false

export function isNarrationActive() {
  return narrationActive
}

export function setNarrationActive(active) {
  narrationActive = active
  dispatchComicAudio(active)
}

export function pauseAllAudioExcept(except) {
  document.querySelectorAll('audio').forEach((el) => {
    if (el !== except) el.pause()
  })
}

export function dispatchComicAudio(playing) {
  window.dispatchEvent(new CustomEvent(COMIC_AUDIO_EVENT, { detail: { playing } }))
}

/** Only one <audio> element may play at a time across the whole site. */
export function installAudioMutex() {
  if (mutexInstalled || typeof document === 'undefined') return () => {}
  mutexInstalled = true

  const onPlay = (event) => {
    const target = event.target
    if (!(target instanceof HTMLAudioElement)) return

    document.querySelectorAll('audio').forEach((audio) => {
      if (audio !== target && !audio.paused) audio.pause()
    })
  }

  document.addEventListener('play', onPlay, true)
  return () => {
    document.removeEventListener('play', onPlay, true)
    mutexInstalled = false
  }
}
