import type { ReactNode } from 'react'
import { SOCIALS, type SocialLink } from './socialIconsData'

const ICONS: Record<SocialLink['id'], ReactNode> = {
  blog: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.44 12.62l-7.87 7.87a3.04 3.04 0 01-4.3 0l-1.7-1.71a3.04 3.04 0 010-4.3l7.87-7.87a3.04 3.04 0 014.3 0l1.7 1.71a3.04 3.04 0 010 4.3z" />
      <path d="M13.53 5.47l5.66 5.66" />
      <path d="M8.12 16.47l4.24-4.24" />
    </svg>
  ),
  github: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  orcid: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15h-2V7h2v10zm-1-11.25c-.69 0-1.25-.56-1.25-1.25S8.31 3.25 9 3.25s1.25.56 1.25 1.25S9.69 5.75 9 5.75zM17 17h-2v-4c0-1.1-.9-2-2-2s-2 .9-2 2v4H9V7h2v1.5c.63-.87 1.68-1.5 3-1.5 2.21 0 4 1.79 4 4v6z" />
    </svg>
  ),
}

const CONTACT_ICONS: Record<string, ReactNode> = {
  mail: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  pin: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  mailLg: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  pinLg: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
}

export interface SocialIconsProps {
  variant?: 'circle' | 'square'
}

export default function SocialIcons({ variant = 'circle' }: SocialIconsProps) {
  return (
    <div className={variant === 'circle' ? 'hero__social' : 'contact__social'}>
      {SOCIALS.map((s) => (
        <a key={s.id} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer">
          {ICONS[s.id]}
        </a>
      ))}
    </div>
  )
}

export { ICONS as SOCIAL_ICONS, CONTACT_ICONS }
