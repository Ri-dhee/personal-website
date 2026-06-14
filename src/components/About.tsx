import { useRef, useState, useEffect } from 'react'
import Reveal from './Reveal'

interface AnimatedStatProps {
  end: number
  label: string
  suffix?: string
}

function AnimatedStat({ end, label, suffix = '+' }: AnimatedStatProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const counted = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !counted.current) {
          counted.current = true
          let start = 0
          const duration = 1500
          const step = 30
          const increment = end / (duration / step)
          const timer = setInterval(() => {
            start += increment
            if (start >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, step)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [end])

  return (
    <div ref={ref} className="about__stat">
      <span className="about__stat-number">{count}{suffix}</span>
      <span className="about__stat-label">{label}</span>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <Reveal>
          <h2 className="section-title">Professional Summary</h2>
        </Reveal>
        <div className="about__grid">
          <Reveal className="about__text" delay={100} direction="left">
            <div className="about__text-card">
              <p>
                Tech-forward researcher and Organic Agriculture graduate with a proven track record in socio-economic surveying, statistical modeling, and high-stakes strategic communication. As a member of the 2nd Cohort Pelsuup, I combine institutional leadership with an ability to distill complex data into actionable insights, notably representing my cohort before His Majesty the King. Proficient in leveraging AI-assisted development workflows to rapidly prototype, debug, and deploy software solutions at the intersection of nature and technology.
              </p>
              <p>
                Recently selected to present project initiatives during an audience with
                <strong> His Majesty the King</strong>, showcasing an ability to communicate complex
                data under high-pressure conditions. Proficient in R for statistical analysis,
                digital data collection, and qualitative community engagement.
              </p>
              <p>
                I am passionate about youth migration issues, nutrition-sensitive food systems,
                and the ethical application of AI in agriculture.
              </p>
            </div>
          </Reveal>
          <Reveal delay={200} direction="right">
            <div className="about__stats">
              <AnimatedStat end={4} label="Languages" suffix="" />
              <AnimatedStat end={100} label="Household Surveys" suffix="+" />
              <AnimatedStat end={2} label="Theses & Research" suffix="" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
