import { Link, NavLink, useLocation } from 'react-router-dom'
import { site } from '../data/siteContent.js'

function navClass(active) {
  return ['ui-nav-link', active ? 'ui-nav-link-active' : 'ui-nav-link-idle'].join(' ')
}

export function SiteHeader() {
  const { pathname } = useLocation()
  const blogActive = pathname === '/f' || pathname.startsWith('/f/')
  const stockActive = pathname === '/whats-in-stock'

  return (
    <header className="ui-site-header">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 sm:gap-3" aria-label={`${site.name} home`}>
          <img
            src="/site/logo.svg"
            alt=""
            className="h-9 w-auto sm:h-12"
            width={180}
            height={60}
            decoding="async"
          />
          <span className="font-display text-lg tracking-wide sm:text-2xl">{site.name}</span>
        </Link>
        <nav className="flex w-full flex-wrap items-center justify-center gap-1 sm:w-auto sm:justify-end sm:gap-2" aria-label="Primary">
          <NavLink to="/" className={({ isActive }) => navClass(isActive)} end>
            Home
          </NavLink>
          <Link to="/whats-in-stock" className={navClass(stockActive)}>
            What&apos;s in stock
          </Link>
          <Link to="/f" className={navClass(blogActive)}>
            Blog
          </Link>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              ['ui-btn-contact-sm ml-1', isActive ? 'ui-btn-contact-sm-active' : ''].filter(Boolean).join(' ')
            }
          >
            Contact Us
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
