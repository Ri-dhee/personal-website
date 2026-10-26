import Reveal from './Reveal'

interface CaseStudy {
  id: string
  title: string
  subtitle: string
  sections: { heading: string; body: string }[]
}

const caseStudies: CaseStudy[] = [
  {
    id: 'werelis',
    title: 'WERELIS-Bhutan',
    subtitle: 'Field enumerator — ICIMOD & Department of Energy',
    sections: [
      { heading: 'Research purpose', body: 'Baseline socio-economic survey for decentralized lift irrigation in rural Bhutan, supporting national policy and planning.' },
      { heading: 'My responsibilities', body: 'Executed household surveys, managed digital data collection, and performed quality control to ensure data integrity for 100+ households.' },
      { heading: 'Survey methods', body: 'Structured household questionnaires, key informant interviews, and focus group discussions with rural communities.' },
      { heading: 'Quality checks', body: 'Validation rules on digital forms, completeness checks, cross-checks between enumerators, and review of outlier responses.' },
      { heading: 'Deliverables', body: 'Clean dataset and summary inputs for the baseline report and policy briefs.' },
    ],
  },
  {
    id: 'bioplastic',
    title: 'Potato-peel bioplastic research',
    subtitle: 'Undergraduate thesis — College of Natural Resources',
    sections: [
      { heading: 'Research question', body: 'Whether bioplastic produced from potato-peel agricultural waste can match practical performance requirements for water resistance and biodegradation.' },
      { heading: 'Experimental method', body: 'Prepared bioplastic samples from potato peel, tested water absorption/resistance and biodegradation behaviour under controlled conditions.' },
      { heading: 'Analysis', body: 'Used R for statistical interpretation of biodegradation and water-resistance results, comparing the potato-peel formulation against a control formulation.' },
      { heading: 'Findings', body: 'Reported a 40% improvement in the tested property (water resistance) relative to the control formulation. The exact metric, comparison baseline and measurement protocol should be confirmed against the original thesis before publication. Results presented to the Ministry of Agriculture and Livestock.' },
      { heading: 'Limitations', body: 'Lab-scale samples only; mechanical strength and scale-up production were not evaluated. Further work needed for commercial viability.' },
    ],
  },
  {
    id: 'labledger',
    title: 'LabLedger — Science Lab Inventory',
    subtitle: 'Digital project — Cloudflare Workers',
    sections: [
      { heading: 'User problem', body: 'School and teaching labs often track equipment in spreadsheets, leading to lost items, unclear accountability, and no audit trail.' },
      { heading: 'My contribution', body: 'Designed and built the application: data model, checkout/return workflows, QR label access, audit history, and admin observability. AI assistance supported prototyping and debugging.' },
      { heading: 'Principal workflows', body: 'Item registration and detail pages, checkout approvals, returns, overdue reminders, QR-based access, and audit-log review.' },
      { heading: 'Testing', body: 'Form validation, API contract checks (400/429/500 handling), honeypot bot protection, and production smoke checks on the deployed Worker.' },
      { heading: 'Current status', body: 'Live demo available. Offline sync and broader mobile polish remain under development.' },
      { heading: 'Audit history', body: 'Records item creation, edits, checkout and return events with timestamps and the acting user, providing a traceable record rather than a percentage of changes.' },
    ],
  },
]

export default function CaseStudies() {
  return (
    <section id="case-studies" className="case-studies">
      <div className="container">
        <Reveal>
          <h2 className="section-title">Case Studies</h2>
        </Reveal>
        {caseStudies.map((cs, i) => (
          <Reveal key={cs.id} delay={i * 100}>
            <article className="case-study" id={cs.id}>
              <h3 className="case-study__title">{cs.title}</h3>
              <p className="case-study__subtitle">{cs.subtitle}</p>
              <dl className="case-study__list">
                {cs.sections.map((s) => (
                  <div key={s.heading} className="case-study__item">
                    <dt>{s.heading}</dt>
                    <dd>{s.body}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
