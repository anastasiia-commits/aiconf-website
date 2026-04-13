import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-tag"><span className="dot" /> Barcelona &middot; September 12, 2026</div>
        <h1>
           Barcelona Applied<br />
  <span className="hero-accent">Intelligence</span><br />
  <span className="hero-outline">Conference-2026</span>
        </h1>
        <p className="hero-sub">
  A space for engineers building &amp; shipping modern AI —<br className="br-desktop" /> practical insights into LLMs, computer vision, and AI in production.
</p>
        <div className="hero-actions">
          <a href="#preregister-form" className="btn btn-primary btn-lg">Pre-register</a>
          <a href="mailto:inquiries@barcelonaconference.ai?subject=Speaker%20Application" className="btn btn-ghost btn-lg">Become a Speaker &rarr;</a>
        </div>
        <div className="hero-stats">
          <div className="stat"><span className="stat-num">200</span><span className="stat-label">Participants</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-num">1</span><span className="stat-label">Focused Day</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-num">10+</span><span className="stat-label">Speakers</span></div>
        </div>
      </div>
    </section>
  )
}
