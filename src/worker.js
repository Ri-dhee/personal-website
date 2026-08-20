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
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.pdf': 'application/pdf',
}

function getExt(pathname) {
  // Handle SPA routes like /about or / without extension
  const lastSegment = pathname.split('/').pop() || ''
  if (!lastSegment.includes('.')) return ''
  const dot = lastSegment.lastIndexOf('.')
  if (dot === -1) return ''
  return lastSegment.slice(dot).toLowerCase()
}

export default {
  async fetch(request, _env) {
    const url = new URL(request.url)

    // Security headers for all responses
    const securityHeaders = {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    }

    try {
      // API passthrough — preserve method/body only when appropriate
      if (url.pathname.startsWith('/api/')) {
        const apiUrl = 'https://rinzin-site.pages.dev' + url.pathname + url.search
        const init = {
          method: request.method,
          headers: request.headers,
        }
        if (request.method !== 'GET' && request.method !== 'HEAD' && request.body) {
          init.body = request.body
          init.duplex = 'half'
        }
        const apiRes = await fetch(apiUrl, init)
        const headers = new Headers(apiRes.headers)
        for (const [k, v] of Object.entries(securityHeaders)) headers.set(k, v)
        return new Response(apiRes.body, {
          status: apiRes.status,
          statusText: apiRes.statusText,
          headers,
        })
      }

      const target = new URL('https://rinzin-site.pages.dev')
      target.pathname = url.pathname
      target.search = url.search

      const init = {
        method: request.method,
        headers: request.headers,
      }
      if (request.method !== 'GET' && request.method !== 'HEAD' && request.body) {
        init.body = request.body
        init.duplex = 'half'
      }

      const response = await fetch(target.toString(), init)

      const ext = getExt(url.pathname)
      const contentType = MIME_TYPES[ext]
      const headers = new Headers(response.headers)

      for (const [k, v] of Object.entries(securityHeaders)) headers.set(k, v)

      // Cache control for static assets
      if (ext && ext !== '.html' && response.ok) {
        // Hashed assets from Vite have immutable content
        if (url.pathname.includes('/assets/')) {
          headers.set('Cache-Control', 'public, max-age=31536000, immutable')
        } else {
          headers.set('Cache-Control', 'public, max-age=3600')
        }
      } else if (!ext || ext === '.html') {
        headers.set('Cache-Control', 'public, max-age=0, must-revalidate')
      }

      if (contentType) {
        headers.set('Content-Type', contentType)
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers,
        })
      }

      // For SPA routes without extension, ensure headers still applied
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      })
    } catch (err) {
      console.error('Worker fetch error:', err)
      return new Response('Internal Server Error', {
        status: 500,
        headers: { 'Content-Type': 'text/plain', ...securityHeaders },
      })
    }
  },
}
