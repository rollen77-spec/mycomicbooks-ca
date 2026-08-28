export const COMIC_AUDIO_EVENT = 'mcb:comic-audio'

let narrationActive = false

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
