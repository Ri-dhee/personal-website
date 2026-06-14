import { useEffect, useState } from 'react'
import SocialIcons, { CONTACT_ICONS } from './SocialIcons'
import { useReducedMotion } from '../hooks/useReducedMotion'

const roles = [
  'B.Sc. Organic Agriculture',
  '2nd Cohort Pelsung',
  'Research Enumerator',
  'UNDP Youth Fellow',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting) {
      if (displayed.length < current.length) {
        const speed = reduced ? 0 : 80
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), speed)
      } else {
        timeout = setTimeout(() => setDeleting(true), reduced ? 0 : 2000)
      }
    } else {
      if (displayed.length > 0) {
        const speed = reduced ? 0 : 40
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), speed)
      } else {
        setDeleting(false)
        setRoleIndex((i) => (i + 1) % roles.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIndex, reduced])

  return (
    <section id="hero" className="hero">
      <div className="hero__bg">
        <div className="hero__bg-shape hero__bg-shape--1" />
        <div className="hero__bg-shape hero__bg-shape--2" />
        <div className="hero__bg-shape hero__bg-shape--3" />
        <div className="hero__bg-shape hero__bg-shape--4" />
      </div>
      <div className="hero__particles">
        <div className="hero__particle" /><div className="hero__particle" />
        <div className="hero__particle" /><div className="hero__particle" />
        <div className="hero__particle" /><div className="hero__particle" />
        <div className="hero__particle" /><div className="hero__particle" />
        <div className="hero__particle" /><div className="hero__particle" />
      </div>
      <div className="container hero__inner">
        <div className="hero__content">
          <div className="hero__badge">Open to opportunities</div>
          <p className="hero__greeting">Hi, I'm</p>
          <h1 className="hero__name">
            Rinzin <span className="gradient-text">Dorji</span>
          </h1>
          <h2 className="hero__title">
            <span aria-live="polite">{displayed}</span>
            <span className="hero__cursor" aria-hidden="true">|</span>
          </h2>
          <p className="hero__tagline">
            Organic Agriculture graduate with proven field experience in socio-economic
            surveying and agricultural research. Pelsung member selected to present to
            His Majesty the King.
          </p>
          <div className="hero__contact-row">
            <span>{CONTACT_ICONS.pin} Thimphu, Bhutan</span>
            <span>{CONTACT_ICONS.mail} rdorji878@gmail.com</span>
          </div>
          <div className="hero__actions">
            <a href="#projects" className="btn btn-primary">
              <span>View My Work</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#product" className="btn btn-outline">See Featured Product</a>
            <a href="#contact" className="btn btn-outline">Get In Touch</a>
          </div>
          <SocialIcons variant="circle" />
        </div>
        <div className="hero__visual">
          <div className="hero__avatar">
            <div className="hero__avatar-ring" />
            <picture>
              <source
                type="image/avif"
                srcSet="/profile-96.avif 96w, /profile-180.avif 180w, /profile-300.avif 300w, /profile-600.avif 600w"
                sizes="(max-width: 768px) 180px, 300px"
              />
              <source
                type="image/webp"
                srcSet="/profile-96.webp 96w, /profile-180.webp 180w, /profile-300.webp 300w, /profile-600.webp 600w"
                sizes="(max-width: 768px) 180px, 300px"
              />
              <img
                src="/profile-300.jpeg"
                srcSet="/profile-180.jpeg 180w, /profile-300.jpeg 300w, /profile-600.jpeg 600w"
                sizes="(max-width: 768px) 180px, 300px"
                alt="Portrait of Rinzin Dorji"
                className="hero__image"
                width={300}
                height={300}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  )
}
