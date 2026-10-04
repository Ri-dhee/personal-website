# Project Specification — personal-website

> Source of truth for WHAT this software must do. Ranked below explicit
> user requirements, above code behavior (per constitution §6).

## 1. Identity

Personal portfolio site for **Rinzin Dorji** — Organic Agriculture graduate,
field researcher, AI-assisted developer. Live at
**https://rinzin.qzz.io/** (Cloudflare Pages project `rinzin-site`,
Git-connected auto-deploy from `main`).

## 2. Stack (verified via package.json)

- React 19 + TypeScript + Vite 7 (+ `@vitejs/plugin-react` 5)
- Lenis smooth scroll (disabled under `prefers-reduced-motion`)
- Vitest 2 + Testing Library (11 tests, 3 files)
- Cloudflare Pages + Pages Functions + KV (`CONTACT_KV`)
- CI Node 20 (wrangler prefers 22 — known gap, do not upgrade casually)

## 3. Page structure (verified via src/App.tsx)

Single-page, lazy-loaded sections in order:
`Navbar → Hero → About → Skills → Projects → Product → Contact → Footer`,
plus `ScrollProgress`, `BackToTop`, skip-link, section dividers.
Motion: reveal-on-scroll, animated counters, 3D-tilt project cards.

## 4. Projects section (current, verified)

Cards rendered from the `projects` array in `src/components/Projects.tsx`.
Current entries: **LabLedger** (with live `link` → workers.dev URL),
WERELIS-Bhutan, Bioplastic from Potato Peel, Pelsung, Springboard ELEVATE,
Agrifood Challenge, Organic Farm Internship.
REMOVED (user decision, Oct 2026): Cropping Calendar, Finapp.
`Project.link?` renders a styled `project-card__link` ("View Live →",
`target="_blank"`, new-tab). Any new link-bearing project MUST ship with
`.project-card__link` CSS intact.

## 5. Featured product section (verified)

`src/components/Product.tsx` — "Science Lab Inventory" feature block.
"Open Live Demo" MUST point to
`https://science-lab-inventory.rdorji878.workers.dev/`
(a Worker; there is NO `.pages.dev` host for it — a past bug pointed there
and produced `DNS_PROBE_FINISHED_NXDOMAIN`).

## 6. Contact pipeline (verified end-to-end Oct 2026)

`src/components/Contact.tsx` POSTs `FormData(name,email,message,website)`
to `/api/contact` → `functions/api/contact.js`:

1. Rate limit 5/min/IP (429 + `Retry-After`).
2. Honeypot `website` must be empty (bots get fake `200 {success:true}`).
3. Validation: all fields required; name 2–100; message 10–2000;
   email ≤254 + regex.
4. Message stored in KV (`contact:<ts>:<rand>`, 90-day TTL) BEFORE emailing.
5. Email via Resend API: from `Rinzin Dorji <contact@mail.rinzin.qzz.io>`
   (domain verified: SPF `amazonses.com`, DKIM `resend._domainkey` present),
   to `rdorji878@gmail.com`, `reply_to` = sender.
6. Contract: `200 {success:true}` on accept (incl. KV-fallback accepts),
   `400` validation, `429` rate-limit, `500` server error.
7. Admin viewer `GET /api/admin/contacts` gated by `ADMIN_SECRET` env.

Deliverability constraint (verified incident): Gmail content-filtered early
sends; sender IP was removed from the email footer as a spam trigger.
Retest protocol for any template change: submit natural-language message,
check Resend → Emails status, check Gmail inbox+spam.

## 7. Secrets and config (never commit)

`RESEND_API_KEY`, `ADMIN_SECRET` (dashboard-only) + `CONTACT_KV` binding.
Local overrides in `.dev.vars` (gitignored). KV namespace IDs are
non-secret identifiers. New/changed dashboard vars need a fresh deploy.

## 8. Quality gates

`npm run typecheck` + `npm run lint` (zero errors) + `npm test` (11 passing)
+ `npm run build`. Lighthouse budgets in `.lighthouserc.json`. GitHub:
`main` protected, 8 required checks, squash merges, PR-only flow.
Deploys: Pages Git integration (production); CLI deploys land as Preview.
Repo: public; secret scanning + push protection on; Dependabot weekly
(patch/minor auto-merge on green CI).

## 9. Explicit non-goals

- No npm publishing / semantic-release (removed — website, not a library).
- No redundant deploy workflow (removed — Pages owns deploys).
- No required PR approvals (solo repo; checks are the gate).
