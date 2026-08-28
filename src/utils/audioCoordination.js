export const COMIC_AUDIO_EVENT = 'mcb:comic-audio'

export function pauseAllAudioExcept(except) {
  document.querySelectorAll('audio').forEach((el) => {
    if (el !== except) el.pause()
  })
}

export function dispatchComicAudio(playing) {
  window.dispatchEvent(new CustomEvent(COMIC_AUDIO_EVENT, { detail: { playing } }))
}
