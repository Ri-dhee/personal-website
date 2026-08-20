import { useState, type ChangeEvent, type FormEvent } from 'react'
import Reveal from './Reveal'
import SocialIcons, { CONTACT_ICONS } from './SocialIcons'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface FormData {
  name: string
  email: string
  message: string
  website: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

function validate({ name, email, message }: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!name.trim()) errors.name = 'Please enter your name.'
  else if (name.trim().length < 2) errors.name = 'Name is too short.'
  else if (name.trim().length > 100) errors.name = 'Name is too long (max 100 chars).'
  if (!email.trim()) errors.email = 'Please enter your email.'
  else if (email.trim().length > 254) errors.email = 'Email is too long.'
  else if (!EMAIL_RE.test(email.trim())) errors.email = 'That email looks invalid.'
  if (!message.trim()) errors.message = 'Please write a message.'
  else if (message.trim().length < 10) errors.message = 'Message is too short (min 10 chars).'
  else if (message.trim().length > 2000) errors.message = 'Message is too long (max 2000 chars).'
  return errors
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '', website: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [focused, setFocused] = useState<keyof FormData | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((f) => ({ ...f, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors((er) => {
        const next = { ...er }
        delete next[name as keyof FormData]
        return next
      })
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData.website) return

    const fieldErrors = validate(formData)
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors)
      return
    }

    setSending(true)
    setError(null)

    try {
      const form = new FormData()
      form.append('name', formData.name)
      form.append('email', formData.email)
      form.append('message', formData.message)

      const res = await fetch('/api/contact', { method: 'POST', body: form })
      const data: { error?: string } = await res.json().catch(() => ({}))

      if (res.ok) {
        setSent(true)
        setFormData({ name: '', email: '', message: '', website: '' })
      } else {
        setError(data.error || 'Something went wrong.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <Reveal>
          <h2 className="section-title">Get In Touch</h2>
        </Reveal>
        <div className="contact__grid">
          <Reveal delay={100}>
            <div className="contact__info">
               <p className="contact__description">
                 Open to research collaborations, AI-assisted development projects, and conversations
                 at the intersection of agriculture, technology, and sustainability.
               </p>
              <div className="contact__details">
                <div className="contact__detail">
                  <div className="contact__detail-icon">{CONTACT_ICONS.mailLg}</div>
                  <a href="mailto:rdorji878@gmail.com">rdorji878@gmail.com</a>
                </div>
                <div className="contact__detail">
                  <div className="contact__detail-icon">{CONTACT_ICONS.pinLg}</div>
                  <span>Thimphu, Bhutan</span>
                </div>
              </div>
              <SocialIcons variant="square" />
            </div>
          </Reveal>
          <Reveal delay={200}>
            <form className="contact__form" onSubmit={handleSubmit} noValidate>
              {sent ? (
                <div className="contact__success">
                  <div className="contact__success-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" aria-hidden="true">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h3>Message Sent!</h3>
                  <p>I'll get back to you as soon as possible.</p>
                  <button type="button" className="btn btn-primary" onClick={() => setSent(false)}>
                    Send Another
                  </button>
                </div>
              ) : (
                <>
                  <div className={`contact__field ${focused === 'name' ? 'contact__field--focused' : ''} ${errors.name ? 'contact__field--error' : ''}`}>
                    <label htmlFor="name">Your Name</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      autoComplete="name"
                      maxLength={100}
                      required
                    />
                    {errors.name && <p id="name-error" className="contact__field-error">{errors.name}</p>}
                  </div>
                  <div className={`contact__field ${focused === 'email' ? 'contact__field--focused' : ''} ${errors.email ? 'contact__field--error' : ''}`}>
                    <label htmlFor="email">Your Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      autoComplete="email"
                      maxLength={254}
                      required
                    />
                    {errors.email && <p id="email-error" className="contact__field-error">{errors.email}</p>}
                  </div>
                  <div className={`contact__field ${focused === 'message' ? 'contact__field--focused' : ''} ${errors.message ? 'contact__field--error' : ''}`}>
                    <label htmlFor="message">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      maxLength={2000}
                      required
                    />
                    {errors.message && <p id="message-error" className="contact__field-error">{errors.message}</p>}
                  </div>
                  <div aria-hidden="true" className="contact__honeypot">
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  {error && <p className="contact__error" role="alert" aria-live="assertive">{error}</p>}
                  <button type="submit" className="btn btn-primary contact__submit" disabled={sending} aria-label="Send message via contact form">
                    {sending ? 'Sending...' : 'Send Message'}
                    {!sending && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                    )}
                  </button>
                </>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
