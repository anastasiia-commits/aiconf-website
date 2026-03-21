import { useEffect, useRef } from 'react'

export function useScrollReveal<T extends HTMLElement>(skip = false) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || skip) return

    el.style.opacity = '0'
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease'

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).style.opacity = '1'
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [skip])

  return ref
}
