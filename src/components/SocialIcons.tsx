import { SOCIALS } from './socialIconsData'
import { ICONS } from './socialIconsConstants'

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
