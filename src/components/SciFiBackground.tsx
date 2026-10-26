import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  hue: string
}

export default function SciFiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let particles: Particle[] = []
    let raf = 0
    const colors = ['rgba(34,197,94,', 'rgba(245,158,11,', 'rgba(226,232,240,']

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas!.clientWidth
      height = canvas!.clientHeight
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function init() {
      resize()
      const count = Math.min(70, Math.floor((width * height) / 18000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.6 + 0.6,
        hue: colors[Math.floor(Math.random() * colors.length)],
      }))
    }

    function step() {
      ctx!.clearRect(0, 0, width, height)

      // update + draw particles
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = p.hue + '0.85)'
        ctx!.fill()

        // glow
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2)
        const g = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3)
        g.addColorStop(0, p.hue + '0.25)')
        g.addColorStop(1, p.hue + '0)')
        ctx!.fillStyle = g
        ctx!.fill()
      }

      // connecting lines
      const threshold = 130
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < threshold) {
            const alpha = (1 - dist / threshold) * 0.25
            ctx!.strokeStyle = `rgba(226,232,240,${alpha})`
            ctx!.lineWidth = 0.6
            ctx!.beginPath()
            ctx!.moveTo(a.x, a.y)
            ctx!.lineTo(b.x, b.y)
            ctx!.stroke()
          }
        }
      }

      raf = requestAnimationFrame(step)
    }

    init()
    step()
    window.addEventListener('resize', init)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', init)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      className="hero__scifi"
      aria-hidden="true"
    />
  )
}
