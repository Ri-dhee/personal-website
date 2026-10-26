import SocialIcons from './SocialIcons'
import { CONTACT_ICONS } from './socialIconsConstants'
import SciFiBackground from './SciFiBackground'

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <SciFiBackground />
      <div className="hero__clouds" aria-hidden="true">
        <div className="hero__cloud hero__cloud--1" />
        <div className="hero__cloud hero__cloud--2" />
        <div className="hero__cloud hero__cloud--3" />
        <div className="hero__cloud hero__cloud--4" />
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
            Organic Agriculture graduate and field researcher working in socio-economic
            surveying, data analysis and practical digital tools.
          </p>
          <div className="hero__contact-row">
            <span>{CONTACT_ICONS.pin} Thimphu, Bhutan</span>
            <span>{CONTACT_ICONS.mail} rdorji878@gmail.com</span>
          </div>
          <div className="hero__actions">
            <a href="#projects" className="btn btn-primary">
              <span>Explore my work</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#contact" className="btn btn-outline">Contact me</a>
          </div>
          <SocialIcons variant="circle" />
        </div>
        <div className="hero__visual">
          <figure className="hero__portrait">
            <div className="hero__avatar">
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
          <figcaption className="hero__portrait-caption">Rinzin Dorji — field researcher, Thimphu, Bhutan</figcaption>
        </figure>
      </div>
      </div>
    </section>
  )
}
