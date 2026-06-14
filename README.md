# Rinzin Dorji — Portfolio

A React + Vite + TypeScript portfolio site for Rinzin Dorji, showcasing expertise at the intersection of Organic Agriculture research and AI-assisted development. Features smooth scroll, reveal-on-scroll animations, animated counters, project cards with 3D tilt, and a contact form with validation and honeypot.

## Stack

- React 19 + TypeScript
- Vite 8
- Lenis (smooth scroll, respects `prefers-reduced-motion`)
- Cloudflare Pages + Workers for deployment

## Scripts

```bash
npm run dev         # dev server with HMR
npm run build       # type-check + production build to dist/
npm run lint        # ESLint
npm run typecheck   # tsc -b --noEmit
npm test            # run vitest suite
```

## Structure

```
src/
  App.tsx                       # root + Lenis provider
  main.tsx                      # React entry
  hooks/
    useScroll.ts                # shared scroll-position + progress subs
    useReducedMotion.ts         # prefers-reduced-motion matcher
    useIsTouchDevice.tsx        # touch-device context
  components/
    Navbar.tsx, Hero.tsx, About.tsx, Skills.tsx,
    Projects.tsx, Contact.tsx, Footer.tsx,
    ScrollProgress.tsx, BackToTop.tsx, Reveal.tsx,
    SocialIcons.tsx
  test/                         # vitest specs
public/                         # static assets (profile.jpeg, favicon)
worker.js                       # Cloudflare Worker (proxy to Pages origin)
```

## Deployment

- `wrangler.toml` deploys the static `dist/` to Cloudflare Pages (`rinzin-site`).
- `wrangler-worker.toml` runs a Worker at `rinzin.qzz.io/*` that forwards `/api/*` and assets to the Pages origin.

## Accessibility

- `prefers-reduced-motion` is respected globally (kills animations, disables Lenis, types out roles instantly).
- All decorative SVGs are `aria-hidden`; form inputs have proper labels and `aria-invalid`/`aria-describedby`.
- Honeypot field (`#website`) silently drops bot submissions.
