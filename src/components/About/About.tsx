import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useCarouselControls } from '../../hooks/useCarouselControls.ts'
import './About.css'

const cards = [
  { title: 'Who We Are', text: 'Leaders from Uber, Incode, and Nebius — building real-world ML products for 9+ years.' },
  { title: 'Who This Is For', text: 'AI/ML engineers, data scientists, STEM researchers, and senior engineers seeking peer exchange.' },
  { title: 'Why We Do It', text: "Most conferences talk about AI without showing how it's built. We fix that." },
  { title: 'What to Expect', text: 'Workshops and talks by engineers from OpenAI, NVIDIA, Google DeepMind, and more.' },
  { title: 'When & Where', text: 'Barcelona, September 12, 2026. A focused single-day event built for depth over breadth.' },
]

export default function About() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  })

  const { selectedIndex, scrollSnaps, scrollTo, scrollPrev, scrollNext } =
    useCarouselControls(emblaApi)

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') scrollPrev()
      if (e.key === 'ArrowRight') scrollNext()
    },
    [scrollPrev, scrollNext]
  )

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag mono">// 01_about</span>
          <h2>About</h2>
        </div>

        <div className="about-slider-wrap" aria-label="About carousel">
          <div className="about-viewport" ref={emblaRef} tabIndex={0} onKeyDown={handleKeyDown}>
            <div className="about-cards">
              {cards.map((card, i) => (
                <div key={i} className="about-slide">
                  <div className={`about-card${i === selectedIndex ? ' active' : ''}`}>
                    <div className="card-index mono">{String(i + 1).padStart(2, '0')}/{String(cards.length).padStart(2, '0')}</div>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="slider-controls">
            <button className="slider-btn prev" type="button" aria-label="Previous" onClick={scrollPrev}>&larr;</button>
            <div className="slider-dots">
              {scrollSnaps.map((_, i) => (
                <button
                  key={i}
                  className={`dot-item${i === selectedIndex ? ' active' : ''}`}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => scrollTo(i)}
                />
              ))}
            </div>
            <button className="slider-btn next" type="button" aria-label="Next" onClick={scrollNext}>&rarr;</button>
          </div>
        </div>
      </div>
    </section>
  )
}
