const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.pdf': 'application/pdf',
}

export default {
  async fetch(request) {
    const url = new URL(request.url)

    if (url.pathname.startsWith('/api/')) {
      return fetch('https://rinzin-site.pages.dev' + url.pathname + url.search, {
        method: request.method,
        headers: request.headers,
        body: request.body,
      })
    }

    const target = new URL('https://rinzin-site.pages.dev')
    target.pathname = url.pathname
    target.search = url.search

    const response = await fetch(target.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
    })

    const ext = '.' + url.pathname.split('.').pop().toLowerCase()
    const contentType = MIME_TYPES[ext]

    if (contentType) {
      const headers = new Headers(response.headers)
      headers.set('Content-Type', contentType)
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      })
    }

    return response
  },
}
