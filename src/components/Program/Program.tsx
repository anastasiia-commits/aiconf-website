import { useScrollReveal } from '../../hooks/useScrollReveal.ts'
import './Program.css'

function ProgramCard({ children }: { children: React.ReactNode }) {
  const ref = useScrollReveal<HTMLDivElement>()
  return <div ref={ref} className="program-card">{children}</div>
}

export default function Program() {
  return (
    <section id="program" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-tag mono">// 02_program</span>
          <h2>Program</h2>
        </div>
        <p className="section-intro">A focused, engineer-first day built around applied frontier AI — how to build and ship large language models and computer vision in production.</p>

        <div className="program-grid">
          <ProgramCard>
            <h3>Hands-on Workshops &amp; Technical Walkthroughs</h3>
            <p>Practical, step-by-step sessions diving deep into real tooling and workflows.</p>
            <ul className="list">
              <li>AI-assisted coding workflows</li>
              <li>Integrating LLMs &amp; VLMs into real products</li>
              <li>Vision models for deepfake detection</li>
            </ul>
          </ProgramCard>

          <ProgramCard>
            <h3>Applied AI Talks — Large Language Models</h3>
            <p>Focused on mechanisms, architectures, and implementation details.</p>
            <ul className="list">
              <li>Training LLMs from scratch</li>
              <li>Building coding agents</li>
              <li>Using AI for coding</li>
              <li>AI agents for energy, manufacturing, healthcare</li>
              <li>Multimodal LLMs</li>
            </ul>
          </ProgramCard>

          <ProgramCard>
            <h3>Applied AI Talks — Computer Vision</h3>
            <p>Deep dives into computer vision at the frontier.</p>
            <ul className="list">
              <li>GenAI in 2D &amp; 3D</li>
              <li>Deepfake detection pipelines</li>
              <li>AI for Robotics</li>
              <li>Building AI-first startups</li>
            </ul>
          </ProgramCard>
        </div>
      </div>
    </section>
  )
}
