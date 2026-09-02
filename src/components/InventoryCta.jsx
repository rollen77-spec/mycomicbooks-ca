import { Link } from 'react-router-dom'

export function InventoryCta({ heading, body, ctaLabel, to, className = '' }) {
  return (
    <div className={['ui-cta-panel text-center', className].filter(Boolean).join(' ')}>
      <h2 className="font-display text-2xl tracking-wide text-ink sm:text-3xl">{heading}</h2>
      {body ? <p className="mx-auto mt-3 max-w-xl text-body-muted">{body}</p> : null}
      <Link to={to} className="ui-btn-primary mt-5">
        {ctaLabel}
      </Link>
    </div>
  )
}
