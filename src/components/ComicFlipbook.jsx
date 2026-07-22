import { forwardRef, useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'

const ComicPage = forwardRef(function ComicPage({ src, alt }, ref) {
  return (
    <div ref={ref} className="h-full w-full overflow-hidden bg-white">
      <img src={src} alt={alt} className="h-full w-full object-contain" draggable={false} />
    </div>
  )
})

export function ComicFlipbook({ pages }) {
  const bookRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(0)

  function flipPrev() {
    bookRef.current?.pageFlip()?.flipPrev()
  }

  function flipNext() {
    bookRef.current?.pageFlip()?.flipNext()
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          className="rounded-lg border border-ink/15 bg-white px-4 py-2 text-sm font-semibold uppercase tracking-wide text-ink transition hover:bg-cream-muted disabled:cursor-not-allowed disabled:opacity-40"
          onClick={flipPrev}
          disabled={currentPage <= 0}
        >
          Previous page
        </button>
        <p className="text-sm text-body-muted">
          Page {currentPage + 1} of {pages.length} · click or drag to flip
        </p>
        <button
          type="button"
          className="ui-btn-primary-sm disabled:cursor-not-allowed disabled:opacity-40"
          onClick={flipNext}
          disabled={currentPage >= pages.length - 1}
        >
          Next page
        </button>
      </div>

      <div className="w-full max-w-[60rem]">
        <HTMLFlipBook
          ref={bookRef}
          width={700}
          height={934}
          size="stretch"
          minWidth={420}
          maxWidth={875}
          minHeight={466}
          maxHeight={1166}
          usePortrait
          maxShadowOpacity={0.45}
          showCover={false}
          mobileScrollSupport
          className="mx-auto"
          onFlip={(event) => setCurrentPage(event.data)}
        >
          {pages.map((page, index) => (
            <ComicPage key={page.src} src={page.src} alt={page.alt ?? `Comic page ${index + 1}`} />
          ))}
        </HTMLFlipBook>
      </div>
    </div>
  )
}
