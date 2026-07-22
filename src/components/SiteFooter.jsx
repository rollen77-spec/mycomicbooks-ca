import { site } from '../data/siteContent.js'

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer id="contact" className="ui-site-footer">
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl tracking-wide text-brand">Contact</h2>
            <p className="mt-2 max-w-md text-cream/85">
              Vintage keys, reader copies, and hard-to-find issues—reach out for inventory and pricing.
            </p>
            <a
              className="mt-4 inline-block font-semibold text-brand underline-offset-4 hover:underline"
              href={`mailto:${site.email}`}
            >
              {site.email}
            </a>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">Newsletter</p>
            <p className="mt-2 text-sm text-cream/85">
              Be the first to hear about new arrivals, popular comics, and upcoming sales.
            </p>
            <a
              className="ui-btn-primary-sm mt-4"
              href={`mailto:${site.email}?subject=Newsletter%20signup&body=Please%20add%20me%20to%20your%20mailing%20list.`}
            >
              Email to subscribe
            </a>
          </div>
        </div>
        <p className="border-t border-white/10 pt-6 text-center text-sm text-cream/70">
          Copyright © {year} {site.legalName} — All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
