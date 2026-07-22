import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { stockPage, stockSections } from '../data/stockInventory.js'
import { site } from '../data/siteContent.js'

function InventoryCard({ item }) {
  return (
    <article className="ui-card flex h-full flex-col">
      {item.cover ? (
        <div className="aspect-[2/3] w-full shrink-0 overflow-hidden bg-neutral-200">
          <img
            src={item.cover}
            alt={`${item.name} cover photo`}
            className="h-full w-full object-cover object-top"
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : null}
      <header className="ui-card-header">
        <h2 className="font-display text-xl tracking-wide text-brand sm:text-2xl">{item.name}</h2>
      </header>
      <ul className="list-disc space-y-2 px-7 py-5 text-body-muted marker:text-gold-deep">
        {item.bullets.map((line, index) => (
          <li key={index} className="pl-1 text-base leading-snug">
            {line}
          </li>
        ))}
      </ul>
    </article>
  )
}

function CtaBand({ heading, body, ctaLabel, to }) {
  return (
    <div className="ui-cta-panel">
      <h2 className="font-display text-2xl tracking-wide text-ink sm:text-3xl">{heading}</h2>
      {body ? <p className="mx-auto mt-3 max-w-xl text-body-muted">{body}</p> : null}
      <Link to={to} className="ui-btn-primary mt-5">
        {ctaLabel}
      </Link>
    </div>
  )
}

export function StockPage() {
  useEffect(() => {
    document.title = `WHATS IN STOCK | ${site.name}`
  }, [])

  const [first, second] = stockSections

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-gold-deep">Inventory</p>
        <h1 className="mt-2 font-display text-4xl tracking-wide text-ink sm:text-5xl md:text-6xl">
          {stockPage.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-body-muted">
          Your online destination for comic books and more.
        </p>
      </header>

      <div className="mt-12 space-y-12">
        <CtaBand
          heading={stockPage.intro.heading}
          body={stockPage.intro.body}
          ctaLabel={stockPage.intro.ctaLabel}
          to={stockPage.intro.to}
        />

        <ul className="grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {first.items.map((item) => (
            <li key={item.name} className="p-0">
              <InventoryCard item={item} />
            </li>
          ))}
        </ul>

        <CtaBand
          heading={stockPage.midCta.heading}
          body={stockPage.midCta.body}
          ctaLabel={stockPage.midCta.ctaLabel}
          to={stockPage.midCta.to}
        />

        <ul className="grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {second.items.map((item) => (
            <li key={item.name} className="p-0">
              <InventoryCard item={item} />
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-14 text-center text-sm text-body-muted">
        Availability changes quickly —{' '}
        <Link className="font-semibold text-gold-deep hover:underline" to="/contact">
          contact us for pricing
        </Link>{' '}
        to confirm details and hold requests.
      </p>
    </div>
  )
}
