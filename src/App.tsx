import { useEffect } from 'react'
import Header from './components/Header/Header.tsx'
import Hero from './components/Hero/Hero.tsx'
import About from './components/About/About.tsx'
import Program from './components/Program/Program.tsx'
import Speakers from './components/Speakers/Speakers.tsx'
import Info from './components/Info/Info.tsx'
import Contact from './components/Contact/Contact.tsx'
import Tickets from './components/Tickets/Tickets.tsx'
import Organizers from './components/Organizers/Organizers.tsx'
import Footer from './components/Footer/Footer.tsx'

export default function App() {
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const el = document.querySelector(hash)
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <>
      <div className="scanlines" aria-hidden="true" />
      <Header />
      <Hero />
      <About />
      <Program />
      <Speakers />
      <Info />
      <Contact />
      <Tickets />
      <Organizers />
      <Footer />
    </>
  )
}
