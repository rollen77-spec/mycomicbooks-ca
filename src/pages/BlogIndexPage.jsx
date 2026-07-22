import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { posts, site } from '../data/siteContent.js'

export function BlogIndexPage() {
  useEffect(() => {
    document.title = `Blog — ${site.name}`
  }, [])

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-gold-deep">Field notes</p>
        <h1 className="mt-2 font-display text-4xl tracking-wide text-ink sm:text-5xl">Blog</h1>
        <p className="mx-auto mt-3 max-w-2xl text-body-muted">
          Stories and collecting tips from {site.name}, migrated from your previous site.
        </p>
      </header>
      <ul className="mt-12 space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <article className="ui-card grid gap-6 sm:grid-cols-[280px_1fr]">
              <Link to={`/f/${post.slug}`} className="block bg-ink/5">
                <img src={post.image} alt="" className="h-full min-h-[200px] w-full object-cover sm:min-h-full" />
              </Link>
              <div className="flex flex-col justify-center p-6 sm:pr-10">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold-deep">{post.date}</p>
                <h2 className="mt-2 font-display text-2xl tracking-wide text-ink sm:text-3xl">
                  <Link to={`/f/${post.slug}`} className="hover:text-gold-deep">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 text-body-muted">{post.summary}</p>
                <Link
                  className="mt-4 inline-flex w-fit font-semibold uppercase tracking-wide text-ink underline-offset-4 hover:underline"
                  to={`/f/${post.slug}`}
                >
                  Read article
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}
