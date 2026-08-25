export async function onRequestGet(context) {
  const url = new URL(context.request.url)
  const key = url.searchParams.get('key') || context.request.headers.get('x-admin-key')
  const expected = context.env.ADMIN_SECRET

  if (!expected) {
    return new Response(JSON.stringify({ error: 'ADMIN_SECRET not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  if (key !== expected) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const kv = context.env.CONTACT_KV
  if (!kv) {
    return new Response(JSON.stringify({ error: 'CONTACT_KV not bound' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const list = await kv.list({ prefix: 'contact:', limit: 50 })
  const messages = []
  for (const k of list.keys) {
    const v = await kv.get(k.name)
    if (v) {
      try { messages.push({ key: k.name, ...JSON.parse(v) }) } catch { messages.push({ key: k.name, raw: v }) }
    }
  }
  // Newest first
  messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  return new Response(JSON.stringify({ count: messages.length, messages }, null, 2), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}
