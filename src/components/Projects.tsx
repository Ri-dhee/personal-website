import { useRef, useCallback } from 'react'
import Reveal from './Reveal'
import { useIsTouchDevice } from '../hooks/useIsTouchDevice'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface Project {
  title: string
  subtitle: string
  description: string
  tags: string[]
  color: string
  period: string
}

const projects: Project[] = [
  {
    title: 'Cropping Calendar',
    subtitle: 'AI-Assisted Development — JavaScript, HTML/CSS',
    description:
      'Leveraged AI coding assistants to build an interactive digital tool for agricultural scheduling; formulated targeted prompts to generate algorithms for seasonal farming patterns and performed manual debugging to ensure a responsive UI.',
    tags: ['JavaScript', 'AI-Assisted Development', 'Agriculture', 'UI/UX'],
    color: '#10b981',
    period: 'Personal Project',
  },
  {
    title: 'Finapp',
    subtitle: 'Financial Tracking App — TypeScript, JavaScript',
    description:
      'Utilized AI tools to rapidly scaffold a financial tracking application; managed code integration, testing, and troubleshooting to refine state management.',
    tags: ['TypeScript', 'AI-Assisted Development', 'Finance', 'State Management'],
    color: '#3b82f6',
    period: 'Personal Project',
  },
  {
    title: 'WERELIS-Bhutan Project',
    subtitle: 'Field Enumerator — ICIMOD & Dept. of Energy',
    description:
      'Executed socio-economic baseline surveys for 100+ rural households regarding decentralized lift irrigation. Managed digital data collection and quality control to ensure data integrity for national policy initiatives.',
    tags: ['Household Surveys', 'Data Quality', 'Rural Engagement'],
    color: '#06b6d4',
    period: 'Apr – Jul 2025',
  },
  {
    title: 'Bioplastic from Potato Peel',
    subtitle: 'Undergraduate Thesis — CNR',
    description:
      'Investigated sustainable bioplastic development from agricultural waste. Utilized R for statistical interpretation of biodegradation and water resistance, achieving a 40% improvement. Presented findings to Ministry of Agriculture and Livestock.',
    tags: ['R', 'Lab Research', 'Sustainability', 'Agri-Waste'],
    color: '#22c55e',
    period: 'Sep 2023 – May 2024',
  },
  {
    title: 'Pelsung National Service',
    subtitle: '2nd Cohort — Gelephu Mindfulness City',
    description:
      'Trained in institutional trust, confidentiality protocols, and national service standards. Selected to represent the Pelsung group in a presentation to His Majesty the King, delivering project implementation strategies with clarity and professionalism.',
    tags: ['Leadership', 'Public Speaking', 'Governance'],
    color: '#f59e0b',
    period: '2025 – Present',
  },
  {
    title: 'Springboard ELEVATE Fellowship',
    subtitle: 'Youth Co:Lab — UNDP & Citi Foundation',
    description:
      'Designed pitch-ready solutions for youth livelihood challenges focusing on inclusive innovation. Developed capacity in design thinking and social impact measurement.',
    tags: ['Design Thinking', 'Social Impact', 'Youth Development'],
    color: '#0EA5E9',
    period: 'Sep – Nov 2024',
  },
  {
    title: 'National Agrifood Innovation Challenge',
    subtitle: 'Loden Foundation, FAO, UNDP',
    description:
      'Developed a value-chain solution for Bhutan\'s agrifood sector. Pitched to international and local dignitaries, showcasing innovation in sustainable food systems.',
    tags: ['Agri-Food', 'Innovation', 'Pitching'],
    color: '#10B981',
    period: 'Aug – Sep 2024',
  },
  {
    title: 'Organic Farm Internship',
    subtitle: 'Samdrup Jongkhar Initiative (SJI)',
    description:
      'Supported organic farm operations and community-based training in regenerative agriculture. Developed practical skills in grassroots capacity building and rural farmer outreach.',
    tags: ['Organic Agriculture', 'Regenerative Farming', 'Community Outreach'],
    color: '#14b8a6',
    period: 'Dec 2022 – Jan 2023',
  },
]

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)
  const isTouch = useIsTouchDevice()
  const reduced = useReducedMotion()

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouch || reduced) return
      const el = cardRef.current
      if (!el) return
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0
        const rect = el.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        el.style.setProperty('--tilt-x', `${y * -8}deg`)
        el.style.setProperty('--tilt-y', `${x * 8}deg`)
      })
    },
    [isTouch, reduced]
  )

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }
    const el = cardRef.current
    if (el) {
      el.style.setProperty('--tilt-x', '0deg')
      el.style.setProperty('--tilt-y', '0deg')
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="project-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-card__glow" style={{ background: project.color }} />
      <div className="project-card__meta">
        <span className="project-card__period" style={{ color: project.color }}>{project.period}</span>
      </div>
      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__subtitle">{project.subtitle}</p>
      <p className="project-card__description">{project.description}</p>
      <div className="project-card__tags">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="project-card__tag"
            style={{ borderColor: `${project.color}30`, color: project.color }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <Reveal>
          <h2 className="section-title">Research & Field Experience</h2>
        </Reveal>
        <div className="projects__grid">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 80}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
