import { Link } from 'react-router-dom'

export function InventoryCta({ heading, body, ctaLabel, to, className = '' }) {
  return (
    <div className={['ui-cta-panel text-center', className].filter(Boolean).join(' ')}>
      <h2 className="font-display text-xl tracking-wide text-ink text-balance sm:text-2xl md:text-3xl">{heading}</h2>
      {body ? <p className="mx-auto mt-3 max-w-xl text-sm text-body-muted sm:text-base">{body}</p> : null}
      <Link to={to} className="ui-btn-primary mt-5 w-full justify-center sm:w-auto">
        {ctaLabel}
      </Link>
    </div>
  )
}
