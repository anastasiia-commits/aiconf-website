import './Info.css'

export default function Info() {
  return (
    <section id="info" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-tag mono">// 04_venue_info</span>
          <h2>In Brief</h2>
        </div>

        <div className="info-bento">
          <div className="info-bento-wide">
            <span className="info-label mono">// goal</span>
            <p>Share key problems and best practices in applied frontier AI, focusing on computer vision and large language models — both building and shipping cutting-edge AI. We also cover best practices for AI-assisted coding and using LLMs for downstream tasks.</p>
          </div>

          <div className="info-bento-card accent-card">
            <span className="info-label mono">// date</span>
            <div className="info-big">Sep 12<br /><span className="info-year">2026</span></div>
          </div>

          <div className="info-bento-card">
            <span className="info-label mono">// location</span>
            <div className="info-big-sm">Barcelona<br /><span className="info-sub">Spain</span></div>
          </div>

          <div className="info-bento-card">
            <span className="info-label mono">// scale</span>
            <div className="info-big">200<br /><span className="info-sub">participants</span></div>
          </div>

          <div className="info-bento-card">
            <span className="info-label mono">// speakers</span>
            <div className="info-big">10+<br /><span className="info-sub">speakers</span></div>
          </div>

          <div className="info-bento-card" style={{ gridColumn: 'span 2' }}>
            <span className="info-label mono">// venue</span>
            <p>Modern, thoughtfully designed venue in Barcelona — details coming soon.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
