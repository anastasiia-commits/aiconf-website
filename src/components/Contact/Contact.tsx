import './Contact.css'

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container contact-block">
        <div>
          <span className="section-tag mono">// 05_contact</span>
          <h2>Get in Touch</h2>
          <p>Questions about the conference, sponsorships, or speaking opportunities? Reach out to us directly.</p>
        </div>
        <a href="mailto:inquiries@barcelonaconference.ai" className="btn btn-primary btn-lg">Email Us &rarr;</a>
      </div>
    </section>
  )
}
