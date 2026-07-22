import { useEffect, useState } from 'react'
import { site } from '../data/siteContent.js'

const initial = { name: '', email: '', message: '' }

export function ContactPage() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    document.title = `Contact Us | ${site.name}`
  }, [])

  function updateField(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${site.contactEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          _subject: `My Comic Books contact — ${form.name.trim() || 'Website visitor'}`,
          _template: 'table',
          _captcha: 'false',
        }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong sending your message.')
      }

      setStatus('success')
      setForm(initial)
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Unable to send right now.')
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 sm:py-16">
      <header className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-gold-deep">Get in touch</p>
        <h1 className="mt-2 font-display text-4xl tracking-wide text-ink sm:text-5xl">Contact Us</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-body-muted">
          Questions about inventory, pricing, or a want list? Send a note and we&apos;ll get back to you.
        </p>
      </header>

      <div className="ui-panel mt-10">
        {status === 'success' ? (
          <div className="space-y-4 text-center" role="status">
            <h2 className="font-display text-2xl tracking-wide text-ink">Message sent</h2>
            <p className="text-body-muted">
              Thanks for reaching out. We&apos;ll reply as soon as we can.
            </p>
            <button type="button" className="ui-btn-primary mt-2" onClick={() => setStatus('idle')}>
              Send another message
            </button>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="contact-name" className="ui-label">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={form.name}
                onChange={updateField}
                className="ui-input"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="ui-label">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={updateField}
                className="ui-input"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="ui-label">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={updateField}
                className="ui-input min-h-[10rem] resize-y"
                placeholder="What are you looking for?"
              />
            </div>

            {status === 'error' ? (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
                {errorMessage || 'Something went wrong. Please try again in a moment.'}
              </p>
            ) : null}

            <button type="submit" className="ui-btn-primary w-full sm:w-auto" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending…' : 'Send message'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
