import { useState } from 'react'
import Modal from '../Modal/Modal'
import PrivacyPolicy from '../Legal/PrivacyPolicy'
import TermsOfUse from '../Legal/TermsOfUse'
import './Footer.css'

type OpenModal = 'privacy' | 'terms' | null

export default function Footer() {
  const [openModal, setOpenModal] = useState<OpenModal>(null)
  const close = () => setOpenModal(null)

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand mono">[BAIC] 2026</div>
        <div className="footer-copy">&copy; {new Date().getFullYear()} Barcelona Applied Intelligence Conference</div>
        <div className="footer-links">
          <button type="button" className="footer-link" onClick={() => setOpenModal('privacy')}>Privacy</button>
          <button type="button" className="footer-link" onClick={() => setOpenModal('terms')}>Terms of Use</button>
        </div>
        <a href="mailto:inquiries@barcelonaconference.ai" className="footer-email mono">inquiries@barcelonaconference.ai</a>
      </div>

      <Modal open={openModal === 'privacy'} title="Privacy Policy" onClose={close}>
        <PrivacyPolicy />
      </Modal>
      <Modal open={openModal === 'terms'} title="Terms & Conditions" onClose={close}>
        <TermsOfUse />
      </Modal>
    </footer>
  )
}
