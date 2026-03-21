import { useScrollReveal } from '../../hooks/useScrollReveal.ts'
import PreregisterForm from '../PreregisterForm/PreregisterForm.tsx'
import './Tickets.css'

const tickets = [
  { type: 'early_bird', price: '€100', desc: "Limited quantity. Get in early before they're gone." },
  { type: 'standard', price: '€135', desc: 'Best for most attendees. Full access to all sessions.', badge: 'most popular' },
  { type: 'last chance', price: '€170', desc: "If you don't want to commit in advance. Full access to all sessions.", badge: 'short notice' },
  { type: 'student_selected', price: 'Free', desc: 'Send us your CV and be selected to join for free.' },
]

function TicketCard({ ticket }: { ticket: typeof tickets[number] }) {
  const ref = useScrollReveal<HTMLDivElement>()
  return (
    <div ref={ref} className="ticket-card">
      {ticket.badge && <div className="ticket-badge-inactive mono">{ticket.badge}</div>}
      <div className="ticket-type mono">{ticket.type}</div>
      <div className="ticket-price">{ticket.price}</div>
      <p className="ticket-desc">{ticket.desc}</p>
      <button className="btn btn-ghost" disabled>Not yet available</button>
    </div>
  )
}

export default function Tickets() {
  return (
    <section id="tickets" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-tag mono">// 06_tickets</span>
          <h2>Tickets</h2>
        </div>

        <PreregisterForm />

        <div className="tickets-inactive-label mono">// pricing — to be announced</div>
        <div className="tickets-grid tickets-inactive">
          {tickets.map((t) => (
            <TicketCard key={t.type} ticket={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
