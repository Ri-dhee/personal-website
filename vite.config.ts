import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, writeFileSync, unlinkSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function inlineCriticalCss() {
  return {
    name: 'inline-critical-css',
    enforce: 'post',
    closeBundle() {
      const dist = resolve(__dirname, 'dist')
      const htmlPath = resolve(dist, 'index.html')
      let html = readFileSync(htmlPath, 'utf-8')
      const match = html.match(/<link rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/)
      if (!match) return
      const cssPath = resolve(dist, match[1].replace(/^\//, ''))
      const css = readFileSync(cssPath, 'utf-8')
      html = html.replace(match[0], `<style>${css}</style>`)
      writeFileSync(htmlPath, html)
      unlinkSync(cssPath)
    },
  }
}

export default defineConfig({
  plugins: [react(), inlineCriticalCss()],
  base: '/',
  // @ts-expect-error vitest augments the config type via triple-slash reference
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
