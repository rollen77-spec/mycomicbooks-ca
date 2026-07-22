import { useState } from 'react'

export function ComicFlipbook({ pages }) {
  const [currentPage, setCurrentPage] = useState(0)
  const [flipping, setFlipping] = useState(false)
  const page = pages[currentPage]

  function goTo(nextIndex) {
    if (flipping || nextIndex < 0 || nextIndex >= pages.length || nextIndex === currentPage) return
    setFlipping(true)
    window.setTimeout(() => {
      setCurrentPage(nextIndex)
      setFlipping(false)
    }, 220)
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
          Page {currentPage + 1} of {pages.length} · use the buttons to flip
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
    </div>
  )
}
