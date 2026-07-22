import { Link } from 'react-router-dom'
import { site } from '../data/siteContent.js'

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer id="contact" className="ui-site-footer">
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-12 sm:px-6">
        <div className="max-w-xl">
          <h2 className="font-display text-2xl tracking-wide text-brand">Contact</h2>
          <p className="mt-2 text-cream/85">
            Vintage keys, reader copies, and hard-to-find issues—reach out for inventory and pricing.
          </p>
          <Link to="/contact" className="ui-btn-contact-sm mt-5">
            Contact Us
          </Link>
        </div>
        <p className="border-t border-white/10 pt-6 text-center text-sm text-cream/70">
          Copyright © {year} {site.legalName} — All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
