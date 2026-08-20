const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
const rateMap = new Map()

function isRateLimited(ip) {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now - entry.ts > RATE_LIMIT_WINDOW_MS) {
    rateMap.set(ip, { count: 1, ts: now })
    return false
  }
  entry.count += 1
  if (entry.count > RATE_LIMIT_MAX) return true
  return false
}

// Periodic cleanup to avoid unbounded growth (per-isolate)
if (typeof setInterval !== 'undefined') {
  // @ts-expect-error - global in Pages Functions isolate
  if (!globalThis.__contactRateLimitCleanup) {
    globalThis.__contactRateLimitCleanup = setInterval(() => {
      const now = Date.now()
      for (const [k, v] of rateMap) {
        if (now - v.ts > RATE_LIMIT_WINDOW_MS * 2) rateMap.delete(k)
      }
    }, RATE_LIMIT_WINDOW_MS * 2)
    // Allow process to exit in tests
    if (globalThis.__contactRateLimitCleanup.unref) globalThis.__contactRateLimitCleanup.unref()
  }
}

export async function onRequestPost(context) {
  const RESEND_API_KEY = context.env.RESEND_API_KEY

  // 1. Rate limit by IP (per-isolate; for durable limits use KV/Rate Limiting API)
  const ip = context.request.headers.get('cf-connecting-ip') || context.request.headers.get('x-forwarded-for') || 'unknown'
  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json', 'Retry-After': '60' },
    })
  }

  try {
    const formData = await context.request.formData()
    const name = formData.get('name')?.toString()?.trim() || ''
    const email = formData.get('email')?.toString()?.trim() || ''
    const message = formData.get('message')?.toString()?.trim() || ''
    const website = formData.get('website')?.toString()?.trim() || ''

    // 2. Honeypot — must be empty (bots fill hidden field)
    if (website) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // 3. Length caps
    if (name.length < 2 || name.length > 100) {
      return new Response(JSON.stringify({ error: 'Name must be 2–100 characters' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    if (message.length < 10 || message.length > 2000) {
      return new Response(JSON.stringify({ error: 'Message must be 10–2000 characters' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    if (email.length > 254) {
      return new Response(JSON.stringify({ error: 'Email is too long' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Rinzin Dorji <rd@mail.rinzin.qzz.io>',
        to: ['rdorji878@gmail.com'],
        subject: `New message from ${name}`,
        replyTo: email,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
        `,
      }),
    })

    if (!resp.ok) {
      const body = await resp.text().catch(() => '')
      console.error('Resend API error:', resp.status, body)
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Contact handler error:', err)
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
