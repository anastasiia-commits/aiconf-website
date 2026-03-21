import { useScrollReveal } from '../../hooks/useScrollReveal.ts'
import './Organizers.css'

const organizers = [
  { initials: 'EB', name: 'Efim Boieru', role: 'Technical Vision & Content', linkedin: 'https://www.linkedin.com/in/efimboieru/' },
  { initials: 'AP', name: 'Anastasiia Prokopenko', role: 'Strategy & Partnerships', linkedin: 'https://www.linkedin.com/in/anastasiia-prokopenko/' },
  { initials: 'MG', name: 'Mikhail Gutnikov', role: 'Operations & Growth', linkedin: 'https://www.linkedin.com/in/mikhail-gutnikov-b662611b5/' },
]

function OrgCard({ org }: { org: typeof organizers[number] }) {
  const ref = useScrollReveal<HTMLAnchorElement>()
  return (
    <a ref={ref} className="org-card" href={org.linkedin} target="_blank" rel="noreferrer">
      <div className="org-avatar">{org.initials}</div>
      <h4>{org.name}</h4>
      <p>{org.role}</p>
      <span className="org-link mono">linkedin ↗</span>
    </a>
  )
}

export default function Organizers() {
  return (
    <section id="organizers" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag mono">// 07_organizers</span>
          <h2>Organizers</h2>
        </div>
        <div className="organizers-grid">
          {organizers.map((org) => (
            <OrgCard key={org.initials} org={org} />
          ))}
        </div>
      </div>
    </section>
  )
}
