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
      <span className="about__stat-number" aria-label={`${end}${suffix} ${label}`}>{count}{suffix}</span>
      <span className="about__stat-label">{label}</span>
    </div>
  )
}

const experience = [
  { period: '2025 – Present', role: 'Pelsung (2nd Cohort), Gelephu Mindfulness City', detail: 'Institutional trust, confidentiality protocols and national service standards. Selected to present project implementation strategies to His Majesty the King.' },
  { period: 'Apr – Jul 2025', role: 'Field Enumerator, WERELIS-Bhutan (ICIMOD & Dept. of Energy)', detail: 'Socio-economic baseline surveys for 100+ rural households on decentralized lift irrigation.' },
  { period: 'Sep – Nov 2024', role: 'Youth Co:Lab ELEVATE Fellow (UNDP & Citi Foundation)', detail: 'Design thinking and social impact measurement for youth livelihood challenges.' },
  { period: 'Aug – Sep 2024', role: 'National Agrifood Innovation Challenge (Loden, FAO, UNDP)', detail: 'Value-chain solution for Bhutan’s agrifood sector, pitched to dignitaries.' },
  { period: 'Sep 2023 – May 2024', role: 'Undergraduate thesis, CNR (potato-peel bioplastic)', detail: 'Lab research, statistical analysis in R, findings presented to the Ministry of Agriculture and Livestock.' },
  { period: 'Dec 2022 – Jan 2023', role: 'Organic farm internship, Samdrup Jongkhar Initiative', detail: 'Regenerative agriculture practice and community outreach.' },
]

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <Reveal>
          <h2 className="section-title">About</h2>
        </Reveal>
        <div className="about__grid">
          <Reveal className="about__text" delay={100} direction="left">
            <div className="about__text-card">
              <p>
                I work on field research and data analysis in agriculture, and build practical
                digital tools for problems I encounter in that work. My experience spans
                socio-economic surveying, statistical analysis in R, and small software projects
                such as LabLedger, where AI assistance supports prototyping and debugging.
              </p>
              <p>
                My experience includes more than 100 household surveys, an undergraduate thesis
                on bioplastic from potato peel, and national service as a Pelsung (2nd Cohort),
                where I presented project strategies to His Majesty the King.
              </p>
              <p>
                I am currently interested in youth migration, nutrition-sensitive food systems,
                and the ethical use of AI in agriculture. I welcome research collaborations,
                field-enumeration work, and digital-tool projects at the intersection of
                agriculture and technology.
              </p>
              <p>
                I also publish essays and reflections on{' '}
                <a href="https://abetterlifelearning.blogspot.com" target="_blank" rel="noopener noreferrer">
                  Reading Venture
                </a>
                , my journal from Bhutan.
              </p>
            </div>
          </Reveal>
          <Reveal delay={200} direction="right">
            <div className="about__stats">
              <AnimatedStat end={4} label="Languages" suffix="" />
              <AnimatedStat end={100} label="Household Surveys" suffix="+" />
              <AnimatedStat end={2} label="Research items" suffix="" />
            </div>
          </Reveal>
        </div>
        <Reveal delay={300}>
          <div className="about__timeline">
            <h3 className="about__timeline-title">Experience</h3>
            <ul className="about__timeline-list">
              {experience.map((e) => (
                <li key={e.role} className="about__timeline-item">
                  <span className="about__timeline-period">{e.period}</span>
                  <div>
                    <strong>{e.role}</strong>
                    <p>{e.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
