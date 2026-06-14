import type { ReactNode } from 'react'
import Reveal from './Reveal'

interface SkillCategory {
  title: string
  icon: ReactNode
  skills: string[]
}

const skillCategories: SkillCategory[] = [
  {
    title: 'AI & Workflow Automation',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    skills: ['AI-Assisted Coding (Cursor, ChatGPT, Claude)', 'Prompt Engineering', 'Code Debugging & Refactoring', 'AI-Powered Prototyping'],
  },
  {
    title: 'Data Collection',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    skills: ['Household Surveys', 'Key Informant Interviews', 'FGD', 'Digital Data Collection', 'Quality Control'],
  },
  {
    title: 'Data Analysis',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    skills: ['R (Statistical Modeling)', 'R (Visualization)', 'MS Excel', 'SPSS', 'Data Integrity'],
  },
  {
    title: 'Core Technologies',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M4 7v10l10-5 10 5V7" />
        <path d="M14 3v4a2 2 0 002 2h4" />
        <path d="M10 21v-6a2 2 0 00-2-2H4a2 2 0 00-2 2v6" />
      </svg>
    ),
    skills: ['JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'GitHub Pages', 'Vite', 'React'],
  },
  {
    title: 'Geospatial & Lab',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="10" r="3" />
        <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 10-16 0c0 3 2.7 7 8 11.7z" />
      </svg>
    ),
    skills: ['ArcGIS Pro', 'Spatial Data Mapping', 'Spectrophotometry', 'Genetic Fidelity Testing', 'Material Characterization'],
  },
  {
    title: 'Communication',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    skills: ['Technical Writing', 'Policy Brief Inputs', 'Presentation Design', 'Blog Writing', 'Community Facilitation'],
  },
  {
    title: 'Languages',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
    skills: ['English (Fluent)', 'Dzongkha (Fluent)', 'Sharchop (Native)', 'Lhotsam (Fluent)'],
  },
  {
    title: 'Research & Leadership',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    skills: ['Pelsung (2nd Cohort)', 'UNDP Youth Fellow', 'Design Thinking', 'Social Impact Measurement', 'Agri-Food Innovation'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <Reveal>
          <h2 className="section-title">Technical Skills</h2>
        </Reveal>
        <div className="skills__grid">
          {skillCategories.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 80} direction={i % 2 === 0 ? 'up' : 'scale'}>
              <div className="skills__card">
                <div className="skills__card-header">
                  <div className="skills__card-icon">{cat.icon}</div>
                  <h3 className="skills__card-title">{cat.title}</h3>
                </div>
                <div className="skills__tags">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="skills__tag">{skill}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
