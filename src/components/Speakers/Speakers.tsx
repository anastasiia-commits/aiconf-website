import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useCarouselControls } from '../../hooks/useCarouselControls.ts'
import './Speakers.css'

const speakers = [
  { initials: 'ML', title: 'Manager of ML Engineering', company: 'Incode' },
  { initials: '3D', title: 'Senior 3D CV Researcher', company: 'Cinemersive Labs' },
  { initials: 'GD', title: 'Research Engineer', company: 'Google DeepMind' },
  { initials: 'NB', title: 'PhD in Generative AI', company: 'Nebius' },
  { initials: 'MS', title: 'AI Research Scientist', company: 'Mistral AI' },
  { initials: 'NV', title: 'ML Manager', company: 'NVIDIA' },
]

export default function Speakers() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    slidesToScroll: 'auto',
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
    <section id="speakers" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag mono">// 03_speakers</span>
          <h2>Speakers</h2>
        </div>
        <p className="section-intro">Engineers and researchers from teams building today&rsquo;s most advanced AI systems.</p>

        <div className="speakers-carousel-wrap">
          <button className="carousel-arrow left" type="button" aria-label="Previous" onClick={scrollPrev}>&larr;</button>

          <div className="speakers-viewport" ref={emblaRef} tabIndex={0} onKeyDown={handleKeyDown}>
            <div className="speakers-container">
              {speakers.map((s, i) => (
                <div key={i} className="speakers-slide">
                  <div className="speaker-card">
                    <div className="avatar"><span>{s.initials}</span></div>
                    <div className="speaker-info">
                      <h3>{s.title}</h3>
                      <p className="speaker-company">{s.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-arrow right" type="button" aria-label="Next" onClick={scrollNext}>&rarr;</button>
        </div>

        <div className="carousel-dots">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              className={`dot-item${i === selectedIndex ? ' active' : ''}`}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollTo(i)}
            />
          ))}
        </div>
      <div className="speakers-cta">
            href="mailto:inquiries@barcelonaconference.ai?subject=Speaker%20Application"
            className="btn btn-secondary"
          <a>
            Become a Speaker
          </a>
        </div>
      </div>
    </section>
  )
}
