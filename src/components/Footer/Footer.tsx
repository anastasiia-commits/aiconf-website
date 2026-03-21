import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand mono">[BAIC] 2026</div>
        <div className="footer-copy">&copy; {new Date().getFullYear()} Barcelona Applied Intelligence Conference</div>
        <a href="mailto:support@barcelonaconference.ai" className="footer-email mono">support@barcelonaconference.ai</a>
      </div>
    </footer>
  )
}
