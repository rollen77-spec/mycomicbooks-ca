import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { postBySlug, site } from '../data/siteContent.js'

export function BlogPostPage() {
  const { slug } = useParams()
  const post = postBySlug(slug)

  useEffect(() => {
    document.title = post ? `${post.title} — ${site.name}` : `Not found — ${site.name}`
  }, [post])

  if (!post) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-4xl text-ink">Post not found</h1>
        <p className="mt-3 text-body-muted">That article is not in this migration yet.</p>
        <Link className="mt-6 inline-block font-semibold text-gold-deep underline-offset-4 hover:underline" to="/f">
          Back to blog
        </Link>
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs font-semibold uppercase tracking-wide text-gold-deep">{post.date}</p>
      <h1 className="mt-2 font-display text-4xl leading-tight tracking-wide text-ink sm:text-5xl">{post.title}</h1>
      <div className="ui-media mt-8">
        <img src={post.image} alt="" className="w-full object-cover" />
      </div>
      <div className="mt-8 max-w-none space-y-4 text-body-muted">
        {post.body.map((paragraph, index) => (
          <p key={index} className="text-lg leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="ui-cta-panel mt-10 text-left">
        <p className="font-semibold text-ink">Looking for a specific book?</p>
        <p className="mt-1 text-sm text-body-muted">
          Email <a className="font-semibold text-gold-deep hover:underline" href={`mailto:${site.email}`}>{site.email}</a>{' '}
          with titles and grades you want—we will respond with availability and pricing.
        </p>
      </div>
      <Link
        className="mt-8 inline-flex font-semibold uppercase tracking-wide text-ink underline-offset-4 hover:underline"
        to="/f"
      >
        ← All posts
      </Link>
    </article>
  )
}
