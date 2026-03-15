import { useState, useEffect, useRef } from 'react'
import './css/Rating.css'

export default function Rating() {
  const [visible, setVisible] = useState(false)
  const [stars,   setStars]   = useState(0)
  const [hovered, setHovered] = useState(0)
  const [rated,   setRated]   = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.25 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className={`rating-section ${visible ? 'rating-visible' : ''}`}>
      <div className="rating-glow" />
      <div className="rating-card">
        <p className="rating-label">
          Seu programador aqui teve muito trabalho, dê uma nota de quanto você gostou. Te amo!
        </p>

        {!rated ? (
          <div className="rating-stars">
            {[1,2,3,4,5].map(n => (
              <button
                key={n}
                className={`rating-star ${n <= (hovered || stars) ? 'rating-star-on' : ''}`}
                onMouseEnter={() => setHovered(n)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => { setStars(n); setRated(true) }}
              >★</button>
            ))}
          </div>
        ) : (
          <div className="rating-result">
            <div className="rating-stars">
              {[1,2,3,4,5].map(n => (
                <span key={n} className={`rating-star rating-star-static ${n <= stars ? 'rating-star-on' : ''}`}>★</span>
              ))}
            </div>
            <p className="rating-thanks">
              {stars === 5 ? 'Perfeito! Obrigado, meu amor.'
              : stars >= 4 ? 'Quase perfeito! Obrigado.'
              : stars >= 3 ? 'Vou melhorar da próxima vez.'
              : 'Prometo que da próxima fica melhor.'}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
