import { describe, it, expect } from 'vitest'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate({ name, email, message }: { name: string; email: string; message: string }) {
  const errors: Record<string, string> = {}
  if (!name.trim()) errors.name = 'Please enter your name.'
  else if (name.trim().length < 2) errors.name = 'Name is too short.'
  if (!email.trim()) errors.email = 'Please enter your email.'
  else if (!EMAIL_RE.test(email.trim())) errors.email = 'That email looks invalid.'
  if (!message.trim()) errors.message = 'Please write a message.'
  else if (message.trim().length < 10) errors.message = 'Message is too short (min 10 chars).'
  return errors
}

describe('contact form validation', () => {
  it('rejects empty fields', () => {
    const errs = validate({ name: '', email: '', message: '' })
    expect(errs.name).toBeDefined()
    expect(errs.email).toBeDefined()
    expect(errs.message).toBeDefined()
  })

  it('rejects invalid email', () => {
    const errs = validate({ name: 'Rinzin', email: 'not-an-email', message: 'A long enough message here.' })
    expect(errs.email).toBe('That email looks invalid.')
  })

  it('rejects too-short message', () => {
    const errs = validate({ name: 'Rinzin', email: 'a@b.co', message: 'short' })
    expect(errs.message).toBe('Message is too short (min 10 chars).')
  })

  it('accepts a valid form', () => {
    const errs = validate({ name: 'Rinzin', email: 'a@b.co', message: 'Hello there, this is a proper message.' })
    expect(errs).toEqual({})
  })

  it('rejects 1-char names', () => {
    const errs = validate({ name: 'R', email: 'a@b.co', message: 'Hello there, this is a proper message.' })
    expect(errs.name).toBe('Name is too short.')
  })
})
