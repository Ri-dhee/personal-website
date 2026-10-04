import Reveal from './Reveal'

const features = [
  'Item detail pages with QR-friendly links',
  'Checkout approvals, returns, and audit logs',
  'Cloudflare deployment with production checks',
  'Observability, health, and maintenance tooling',
]

const stats = [
  { value: '4', label: 'Core workflows' },
  { value: '1', label: 'Production-ready stack' },
  { value: '100%', label: 'Tracked changes' },
]

export default function Product() {
  return (
    <section id="product" className="product">
      <div className="container">
        <Reveal>
          <p className="section-kicker">Featured Product</p>
          <h2 className="section-title">Science Lab Inventory</h2>
        </Reveal>
        <div className="product__layout">
          <Reveal className="product__card" delay={100} direction="left">
            <p className="product__lead">
              A production-focused inventory system for labs, with item tracking, checkout
              approvals, QR access, audit history, and admin observability built in.
            </p>
            <p className="product__copy">
              Designed to replace spreadsheet chaos with a clean operational workflow for
              equipment, consumables, and accountability.
            </p>
            <div className="product__cta">
              <a href="https://science-lab-inventory.rdorji878.workers.dev/" className="btn btn-primary" target="_blank" rel="noreferrer">
                Open Live Demo
              </a>
              <a href="#contact" className="btn btn-outline">Request a Walkthrough</a>
            </div>
          </Reveal>
          <Reveal className="product__panel" delay={180} direction="right">
            <div className="product__stats">
              {stats.map((stat) => (
                <div key={stat.label} className="product__stat">
                  <span className="product__stat-value">{stat.value}</span>
                  <span className="product__stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
            <ul className="product__features">
              {features.map((feature) => (
                <li key={feature} className="product__feature">{feature}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
