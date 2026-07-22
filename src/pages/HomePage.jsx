import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ComicFlipbook } from '../components/ComicFlipbook.jsx'
import { HeroAnimation } from '../components/HeroAnimation.jsx'
import {
  comicIssue,
  heroCopy,
  newsletter,
  podcast,
  posts,
  quotes,
  site,
} from '../data/siteContent.js'

export function HomePage() {
  useEffect(() => {
    document.title = `${site.name} — ${site.domain}`
  }, [])

  return (
    <>
      <section
        className="relative isolate min-h-[min(75vh,700px)] overflow-hidden bg-ink px-4 py-14 sm:px-6 sm:py-16"
        aria-label="Hero"
      >
        <HeroAnimation />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, #161616 0%, #161616 26%, rgba(22,22,22,0.88) 40%, rgba(22,22,22,0.18) 72%, rgba(22,22,22,0.55) 100%)',
          }}
        />
        <div className="relative z-[1] flex min-h-[min(60vh,560px)] items-center">
          <div className="mx-auto w-full max-w-6xl">
            <div className="max-w-xl space-y-4 text-left text-cream">
              <p className="font-display text-lg uppercase tracking-[0.2em] text-brand sm:text-xl">
                {heroCopy.kicker}
              </p>
              <h1 className="font-display text-4xl leading-tight tracking-wide sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
                {heroCopy.title}
              </h1>
              <p className="text-lg text-cream/90 sm:text-xl">{heroCopy.subtitle}</p>
              <div className="flex flex-wrap gap-3 pt-4">
                <a
                  className="ui-btn-primary"
                  href={`mailto:${site.email}?subject=INQUIRY%20FOR%20DETAILS&body=Contact%20us%20for%20pricing%20details.`}
                >
                  Contact for pricing
                </a>
                <Link className="ui-btn-ghost-light" to="/whats-in-stock">
                  What&apos;s in stock
                </Link>
                <Link className="ui-btn-ghost-light" to="/f">
                  Read the blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {quotes.map((q) => (
        <section
          key={q.text}
          className="ui-section-divider bg-ink px-4 py-14 text-center text-cream sm:px-6"
          aria-label="Quote"
        >
          <blockquote className="mx-auto max-w-4xl">
            <p className="font-display text-2xl leading-snug tracking-wide text-brand sm:text-3xl md:text-4xl">
              {q.text}
            </p>
            {q.attribution ? (
              <footer className="mt-4 text-sm font-semibold uppercase tracking-wide text-cream/80">
                {q.attribution}
              </footer>
            ) : null}
          </blockquote>
          {q.image ? (
            <figure className="mx-auto mt-10 max-w-[29rem] sm:max-w-[34rem]">
              <img
                src={q.image}
                alt={q.imageAlt ?? ''}
                className="w-full rounded-2xl border border-white/10 shadow-lg shadow-black/30"
                width={640}
                height={640}
                loading="lazy"
                decoding="async"
              />
            </figure>
          ) : null}
        </section>
      ))}

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6" aria-labelledby="comic-heading">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-deep">Digital comic</p>
          <h2 id="comic-heading" className="mt-2 font-display text-3xl tracking-wide text-ink sm:text-4xl">
            {comicIssue.title}
          </h2>
          <p className="mt-2 font-display text-xl tracking-wide text-ink sm:text-2xl">{comicIssue.issue}</p>
          <p className="mt-1 text-body-muted">{comicIssue.subtitle}</p>
        </div>

        <div className="ui-panel mt-10">
          <ComicFlipbook pages={comicIssue.pages} />

          <div className="mt-10 border-t border-ink/10 pt-8 text-center">
            <h3 className="font-display text-xl tracking-wide text-ink sm:text-2xl">{comicIssue.audio.title}</h3>
            <p className="mt-2 text-sm text-body-muted">{comicIssue.audio.description}</p>
            <audio className="mx-auto mt-4 w-full max-w-xl" controls preload="metadata" src={comicIssue.audio.src}>
              <track kind="captions" />
              Your browser does not support audio playback.
            </audio>
          </div>
        </div>
      </section>

      <section className="bg-ink px-4 py-14 text-cream sm:px-6" aria-labelledby="podcast-heading">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            <h2 id="podcast-heading" className="font-display text-3xl tracking-wide text-brand sm:text-4xl">
              {podcast.title}
            </h2>
            <p className="text-cream/85">{podcast.body}</p>
          </div>

          {podcast.episodes.length > 0 ? (
            <ul className="space-y-5">
              {podcast.episodes.map((episode) => (
                <li key={episode.id} className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="font-display text-xl tracking-wide text-cream sm:text-2xl">
                      {episode.title}
                    </h3>
                    {episode.date ? (
                      <time className="text-xs font-semibold uppercase tracking-wide text-brand/90" dateTime={episode.date}>
                        {episode.date}
                      </time>
                    ) : null}
                  </div>
                  {episode.description ? (
                    <p className="mt-2 text-sm text-cream/75">{episode.description}</p>
                  ) : null}
                  {episode.embedSrc ? (
                    <div className="mt-4 overflow-hidden rounded-xl">
                      <iframe
                        className="h-[152px] w-full"
                        src={episode.embedSrc}
                        title={episode.title}
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                      />
                    </div>
                  ) : episode.audioUrl ? (
                    <audio className="mt-4 w-full" controls preload="metadata" src={episode.audioUrl}>
                      <track kind="captions" />
                      Your browser does not support audio playback.
                    </audio>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 px-6 py-10 text-center">
              <p className="text-cream/80">Episodes will stream here as they drop.</p>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6" aria-labelledby="posts-heading">
        <div className="flex flex-col gap-3 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div>
            <h2 id="posts-heading" className="font-display text-3xl tracking-wide text-ink sm:text-4xl">
              Latest from the blog
            </h2>
            <p className="mt-2 text-body-muted">Articles mirrored from your GoDaddy feed.</p>
          </div>
          <Link
            className="font-semibold uppercase tracking-wide text-gold-deep underline-offset-4 hover:underline"
            to="/f"
          >
            View all
          </Link>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {posts.slice(0, 4).map((post) => (
            <li key={post.slug}>
              <article className="ui-card flex h-full flex-col">
                <Link to={`/f/${post.slug}`} className="block shrink-0">
                  <img src={post.image} alt="" className="aspect-[16/10] w-full object-cover" loading="lazy" />
                </Link>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gold-deep">{post.date}</p>
                  <h3 className="font-display text-xl tracking-wide text-ink">
                    <Link to={`/f/${post.slug}`} className="hover:text-gold-deep">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-body-muted">{post.summary}</p>
                  <Link
                    className="mt-auto inline-flex pt-2 text-sm font-semibold uppercase tracking-wide text-ink underline-offset-4 hover:underline"
                    to={`/f/${post.slug}`}
                  >
                    Continue reading
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section className="ui-section-divider-t bg-cream-muted px-4 py-14 sm:px-6" aria-labelledby="newsletter-heading">
        <div className="ui-panel mx-auto max-w-3xl text-center">
          <h2 id="newsletter-heading" className="font-display text-3xl tracking-wide text-ink sm:text-4xl">
            Stay in the loop
          </h2>
          <p className="mt-3 text-body-muted">{newsletter.title}</p>
          <p className="mt-2 text-sm text-body-muted">{newsletter.body}</p>
          <a
            className="ui-btn-primary mt-6"
            href={`mailto:${site.email}?subject=Newsletter%20signup&body=Please%20add%20me%20to%20your%20mailing%20list.`}
          >
            Email to subscribe
          </a>
        </div>
      </section>
    </>
  )
}
