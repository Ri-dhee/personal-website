import SocialIcons from './SocialIcons'
import { CONTACT_ICONS } from './socialIconsConstants'

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-shape hero__bg-shape--1" />
        <div className="hero__bg-shape hero__bg-shape--2" />
        <div className="hero__bg-shape hero__bg-shape--3" />
        <div className="hero__bg-shape hero__bg-shape--4" />
      </div>
      <div className="hero__particles" aria-hidden="true">
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
          <h2 className="hero__title">Research, Agriculture &amp; Practical Digital Tools</h2>
          <p className="hero__tagline">
            Organic Agriculture graduate and field researcher with experience in socio-economic
            surveying, data analysis and practical digital tools. AI assistance is used in
            selected projects such as LabLedger, where it supports prototyping and debugging.
          </p>
          <div className="hero__contact-row">
            <span>{CONTACT_ICONS.pin} Thimphu, Bhutan</span>
            <span>{CONTACT_ICONS.mail} rdorji878@gmail.com</span>
          </div>
          <div className="hero__actions">
            <a href="#projects" className="btn btn-primary">
              <span>View selected work</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#contact" className="btn btn-outline">Contact me</a>
            <a href="/cv.pdf" className="hero__cv-link">Download CV (PDF)</a>
          </div>
          <SocialIcons variant="circle" />
        </div>
        <div className="hero__visual">
          <div className="hero__avatar">
            <div className="hero__avatar-ring" aria-hidden="true" />
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
                alt="Portrait of Rinzin Dorji in Bhutanese dress"
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
