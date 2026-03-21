import { useState, useEffect, useRef } from 'react'
import './Header.css'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        navRef.current && !navRef.current.contains(e.target as Node) &&
        hamburgerRef.current && !hamburgerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const closeNav = () => setIsOpen(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">
          <span className="brand-bracket">[</span>BAIC<span className="brand-bracket">]</span>
        </div>

        <button
          ref={hamburgerRef}
          className={`hamburger${isOpen ? ' open' : ''}`}
          aria-label="Open menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span /><span /><span />
        </button>

        <nav ref={navRef} className={`nav${isOpen ? ' open' : ''}`}>
          <a href="#about" onClick={closeNav}><span className="nav-num">01</span>About</a>
          <a href="#program" onClick={closeNav}><span className="nav-num">02</span>Program</a>
          <a href="#speakers" onClick={closeNav}><span className="nav-num">03</span>Speakers</a>
          <a href="#info" onClick={closeNav}><span className="nav-num">04</span>Venue</a>
          <a href="#contact" onClick={closeNav}><span className="nav-num">05</span>Contact</a>
          <a href="#preregister-form" className="nav-preregister" onClick={closeNav}>Pre-register</a>
        </nav>

        <a href="#preregister-form" className="btn btn-primary">Pre-register</a>
      </div>
    </header>
  )
}
