# Development Log — personal-website

> Authoritative cross-session memory. Update at the end of every substantial
> session (constitution §25).

## Session — 2026-10-04/05 (portfolio updates + gold-standard CI + email debugging)

### Current objective
Verify the contact-form email fix (template de-IP'd, natural-content retest sent).

### Completed (verified)
- Added LabLedger project card (first position) with working `link` field +
  `.project-card__link` CSS (was unstyled/invisible on first deploy).
- Fixed `Product.tsx` demo URL: `science-lab-inventory.pages.dev` (NXDOMAIN,
  does not exist) → `science-lab-inventory.rdorji878.workers.dev`.
- Removed Cropping Calendar + Finapp per user request.
- Fixed `SocialIcons.tsx` react-refresh lint errors (extracted
  `socialIconsConstants.tsx`; updated `Contact.tsx`/`Hero.tsx` imports).
- Pinned Vite 7 / Vitest 2 / plugin-react 5 (Vite 8 rolldown native-binding
  breaks on Windows Node 20); added `@testing-library/dom`.
- Gold-standard CI: `ci.yml` (typecheck/lint/test/build, prod-audit blocking,
  dev-audit informational), `preview.yml` (LHCI, no secrets),
  `security.yml` (TruffleHog filesystem scan + CodeQL v4),
  `dependabot.yml` + fetch-metadata auto-merge. Removed deprecated
  `cloudflare/pages-action` deploy workflow and `semantic-release`.
- Repo: public; secret scanning + push protection on; auto-merge on;
  `main` protected (8 required checks, strict, admins enforced, 0 approvals).
- Merged PRs #1 (CodeQL fix) and #2 (TruffleHog scan fix + email template fix).
- Email pipeline traced live: empty POST → exact `400` (real function
  serving); production tail showed 200 + empty logs (key set, Resend 2xx).
- DNS verified: SPF `amazonses.com` + Resend DKIM present on
  `mail.rinzin.qzz.io`. No secrets in repo/history (grep + history check).

### Verified (evidence)
- `npm run lint/typecheck/test (11/11)/build` — all PASS locally.
- Live probes: LabLedger link href correct; link opens worker site;
  portfolio HTTP 200; contact validation + accepts observed.
- GitHub: all 8 checks green on PRs #1 and #2 before squash-merge.

### Not verified / open
- **Whether the "Tashi Wangmo" natural-content test email arrived**
  (Gmail inbox/spam) and its Resend Emails status — user check pending.
- If still `blocked due to content`: cause shifts to new-domain reputation
  (warm-up / alternate recipient), not wording.
- PR #2 merged as `997c100`; production auto-deploy assumed (not re-probed).

### Known issues
- Resend free shared IPs get Gmail content/bounce filtering on new domains;
  KV fallback preserves every message regardless.
- Node 20 vs wrangler 22 engine warnings (cosmetic).
- Manual `wrangler pages deploy` lands as Preview only — production is
  Git-driven; do not present CLI deploys as releases.

### Assumptions
- `RESEND_API_KEY` valid + `mail.rinzin.qzz.io` Verified in Resend dashboard
  (inferred from 2xx API responses + DNS records; dashboard not accessed).

### Next recommended action
Confirm test-mail arrival; if bounced, read Resend bounce detail and decide:
content tweak vs domain warm-up.

### Files changed (this session)
`src/components/Projects.tsx`, `src/components/Product.tsx`,
`src/components/SocialIcons.tsx` (+new `socialIconsConstants.tsx`),
`src/components/{Contact,Hero}.tsx` (import updates), `src/App.css`
(link style), `functions/api/contact.js` (footer de-IP'd),
`package.json` + lockfile (pins), `.github/workflows/*`,
`.lighthouserc.json`, `.npmrc`, `.github/dependabot.yml`,
`AGENT/*` (new).

### Deployment status
Production: `main` @ `997c100` via Pages Git integration → rinzin.qzz.io.

## Session — constitution governance refinements (merged as #3, #4)

### Completed (verified)
- Created `AGENT/` three-layer setup via PR #3 (constitution + spec + log,
  all checks green, squash-merged `1ef46fa`).
- Integrated advisor governance refinements via PR #4 (merged `3197764`):
  documentation-is-control-not-evidence meta-rule, 9-level conflict
  hierarchy (replaces old 7-level source-of-truth list), anti-self-certification
  block in §15. Docs only, zero code changes, all checks green.

### Deployment status
Production: `main` @ `3197764` via Pages Git integration → rinzin.qzz.io.
