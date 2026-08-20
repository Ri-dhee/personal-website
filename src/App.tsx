import { useEffect, lazy, Suspense } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from './hooks/useReducedMotion'
import { TouchDeviceProvider } from './hooks/TouchDeviceProvider'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import './App.css'

const About = lazy(() => import('./components/About'))
const Skills = lazy(() => import('./components/Skills'))
const Projects = lazy(() => import('./components/Projects'))
const Product = lazy(() => import('./components/Product'))
const Contact = lazy(() => import('./components/Contact'))

function SmoothScroll() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    let lenis: Lenis | null = null
    let rafId = 0
    let cancelled = false

    function start() {
      if (cancelled || lenis) return
      lenis = new Lenis({ duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 3) })
      function raf(time: number) {
        lenis?.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    }

    // Defer Lenis until the browser is idle, or until the first user interaction.
    const ric = window.requestIdleCallback as ((cb: () => void) => number) | undefined
    let idleId: number | null = ric ? ric(start) : window.setTimeout(start, 1500)

    const onFirstInteract = () => {
      if (idleId !== null) {
        if (ric) window.cancelIdleCallback(idleId)
        else clearTimeout(idleId)
        idleId = null
      }
      start()
      window.removeEventListener('pointerdown', onFirstInteract)
      window.removeEventListener('keydown', onFirstInteract)
      window.removeEventListener('scroll', onFirstInteract)
    }
    window.addEventListener('pointerdown', onFirstInteract, { once: true, passive: true })
    window.addEventListener('keydown', onFirstInteract, { once: true })
    window.addEventListener('scroll', onFirstInteract, { once: true, passive: true })

    return () => {
      cancelled = true
      if (idleId !== null) {
        if (ric) window.cancelIdleCallback(idleId)
        else clearTimeout(idleId)
      }
      cancelAnimationFrame(rafId)
      lenis?.destroy()
      window.removeEventListener('pointerdown', onFirstInteract)
      window.removeEventListener('keydown', onFirstInteract)
      window.removeEventListener('scroll', onFirstInteract)
    }
  }, [reduced])

  return null
}

function SectionFallback() {
  return <div style={{ minHeight: '40vh' }} aria-hidden="true" />
}

export default function App() {
  return (
    <TouchDeviceProvider>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <SmoothScroll />
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <div className="section-divider">
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none"><path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#111827" opacity="0.6"/></svg>
          </div>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <div className="section-divider">
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none"><path d="M0,40 C360,0 1080,80 1440,40 L1440,80 L0,80 Z" fill="#0b1121" opacity="0.6"/></svg>
          </div>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <div className="section-divider">
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none"><path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#111827" opacity="0.7"/></svg>
          </div>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <div className="section-divider">
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none"><path d="M0,40 C360,0 1080,80 1440,40 L1440,80 L0,80 Z" fill="#0b1121" opacity="0.6"/></svg>
          </div>
          <Product />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <div className="section-divider">
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none"><path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#0b1121" opacity="0.4"/></svg>
          </div>
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </TouchDeviceProvider>
  )
}
