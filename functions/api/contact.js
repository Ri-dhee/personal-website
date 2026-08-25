const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
const rateMap = new Map()

function isRateLimited(ip) {
  const now = Date.now()
  // Light cleanup on each request to avoid unbounded growth (no global setInterval — disallowed in Pages Functions)
  if (rateMap.size > 100) {
    for (const [k, v] of rateMap) {
      if (now - v.ts > RATE_LIMIT_WINDOW_MS * 2) rateMap.delete(k)
    }
  }
  const entry = rateMap.get(ip)
  if (!entry || now - entry.ts > RATE_LIMIT_WINDOW_MS) {
    rateMap.set(ip, { count: 1, ts: now })
    return false
  }
  entry.count += 1
  if (entry.count > RATE_LIMIT_MAX) return true
  return false
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

    // Free-tier KV fallback — store before email so no message is lost if Gmail bounces (550-5.7.1)
    const kv = context.env.CONTACT_KV
    const kvKey = `contact:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`
    const kvValue = JSON.stringify({ name, email, message, ip, createdAt: new Date().toISOString(), via: 'rinzin.qzz.io' })
    if (kv) {
      try { await kv.put(kvKey, kvValue, { expirationTtl: 60 * 60 * 24 * 90 }) } catch (e) { console.error('KV put failed', e) }
    }

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      // Still success — message is in KV
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
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
        from: 'Rinzin Dorji <contact@mail.rinzin.qzz.io>',
        to: ['rdorji878@gmail.com'],
        subject: `Portfolio contact: ${name}`,
        reply_to: email,
        html: `
          <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#111">
            <p>You received a new message via <a href="https://rinzin.qzz.io/#contact">rinzin.qzz.io</a> contact form.</p>
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0" />
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="border-left:3px solid #0ea5e9;padding-left:12px;margin:8px 0;color:#334155">${escapeHtml(message).replace(/\n/g, '<br>')}</blockquote>
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0" />
            <p style="font-size:12px;color:#64748b">Reply directly to this email to respond to ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;. Sent from ${escapeHtml(context.request.headers.get('cf-connecting-ip') || '')} via Cloudflare Pages.</p>
          </div>
        `,
        text: `New message via rinzin.qzz.io\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nReply to ${email} to respond.`,
      }),
    })

    if (!resp.ok) {
      const body = await resp.text().catch(() => '')
      console.error('Resend API error:', resp.status, body)
      // Free-tier: don't fail user if KV saved — Gmail may bounce on shared IP, but message is preserved
      if (kv) {
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      }
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
