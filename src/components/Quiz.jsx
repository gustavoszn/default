import { useState, useEffect, useRef } from 'react'
import './css/Quiz.css'
import { sfx } from '../utils/sfx'

const Q1_OPTIONS = [
  { id: 'a', emoji: '👗', label: 'Roupa' },
  { id: 'b', emoji: '👟', label: 'Tênis' },
  { id: 'c', emoji: '👕', label: 'Camisa', correct: true },
  { id: 'd', emoji: '💍', label: 'Joia' },
  { id: 'e', emoji: '👜', label: 'Bolsa' },
]

const REVEAL_TEXT = 'SIMMM! A CAMISA DOS ESQUERDISTAS!'
const REVEAL_SUB  = '(como diz minha sogra)'
const REVEAL_SUB2 = 'Nem de Corinthians eu gosto, agora de Corinthiana...'

const PARTICLES = Array.from({ length: 20 }, (_, i) => i)

function useTypewriter(text, active, speed = 45, onTick) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    if (!active) { setDisplayed(''); return }
    setDisplayed('')
    let i = 0
    const t = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (onTick && i % 2 === 0) onTick()
      if (i >= text.length) clearInterval(t)
    }, speed)
    return () => clearInterval(t)
  }, [active, text, speed])
  return displayed
}

export default function Quiz() {
  const [visible,  setVisible]  = useState(false)
  const [q,        setQ]        = useState(1)
  const [phase,    setPhase]    = useState('idle')
  const [selected, setSelected] = useState(null)
  const [dead,     setDead]     = useState([])
  const [showSub,  setShowSub]  = useState(false)
  const [showSub2, setShowSub2] = useState(false)
  const [burst,    setBurst]    = useState(false)
  const startRef   = useRef(null)
  const sectionRef = useRef(null)

  const mainText = useTypewriter(REVEAL_TEXT, phase === 'reveal', 48, sfx.tick)
  const subText  = useTypewriter(REVEAL_SUB,  showSub,  36, sfx.tick)
  const sub2Text = useTypewriter(REVEAL_SUB2, showSub2, 36, sfx.tick)

  useEffect(() => {
    const el = sectionRef.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); startRef.current = Date.now() }
    }, { threshold: 0.25 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (phase === 'reveal' && mainText === REVEAL_TEXT) {
      setBurst(true)
      sfx.reveal()
      const t = setTimeout(() => setShowSub(true), 500)
      return () => clearTimeout(t)
    }
  }, [mainText, phase])

  useEffect(() => {
    if (showSub && subText === REVEAL_SUB) {
      const t = setTimeout(() => setShowSub2(true), 300)
      return () => clearTimeout(t)
    }
  }, [subText, showSub])

  const choose = (opt) => {
    if (phase !== 'idle' && phase !== 'wrong') return
    if (dead.includes(opt.id)) return

    sfx.click()
    const elapsed = startRef.current ? (Date.now() - startRef.current) / 1000 : 99
    setSelected(opt.id)
    setPhase('checking')

    setTimeout(() => {
      if (opt.correct) {
        if (elapsed < 4) {
          sfx.sera()
          setPhase('sera')
          setTimeout(() => setPhase('reveal'), 2400)
        } else {
          sfx.reveal()
          setPhase('reveal')
        }
      } else {
        sfx.wrong()
        setDead(d => [...d, opt.id])
        setPhase('wrong')
        setTimeout(() => setSelected(null), 900)
      }
    }, 800)
  }

  const goQ2 = () => {
    sfx.mystery()
    setQ(2)
    setPhase('q2')
  }

  const wrongCount = dead.length

  return (
    <section ref={sectionRef} className={`quiz-section ${visible ? 'quiz-visible' : ''}`}>
      <div className="quiz-glow" />

      {q === 1 && (
        <div className={`quiz-card ${phase === 'reveal' || phase === 'sera' ? 'quiz-card-dark' : ''}`}>

          {phase !== 'reveal' && phase !== 'sera' && (
            <>
              <div className="quiz-tag">Surpresa</div>
              <p className="quiz-intro">
                Oi, meu amor... provavelmente estamos juntos agora e você não deve estar entendendo nada, enfim.
                Você vai receber seu presente, mas quero que você tente adivinhar primeiro...
              </p>
              <h2 className="quiz-question">
                {wrongCount === 0 && 'O que você ganhou?'}
                {wrongCount === 1 && 'Hmm... tenta de novo.'}
                {wrongCount === 2 && 'Última chance...'}
              </h2>

              <div className="quiz-options">
                {Q1_OPTIONS.map(opt => {
                  const isDead     = dead.includes(opt.id)
                  const isSelected = selected === opt.id
                  const isChecking = phase === 'checking' && isSelected
                  const isWrong    = phase === 'wrong'    && isSelected

                  return (
                    <button
                      key={opt.id}
                      className={[
                        'quiz-opt',
                        isDead     ? 'quiz-opt-dead'     : '',
                        isChecking ? 'quiz-opt-checking' : '',
                        isWrong    ? 'quiz-opt-wrong'    : '',
                        !isDead && !isChecking && !isWrong && isSelected ? 'quiz-opt-selected' : '',
                      ].filter(Boolean).join(' ')}
                      onClick={() => choose(opt)}
                      disabled={isDead || phase === 'checking'}
                    >
                      <span className="quiz-opt-emoji">{opt.emoji}</span>
                      <span className="quiz-opt-label">{opt.label}</span>
                      {isChecking && <span className="quiz-opt-spinner" />}
                      {isWrong    && <span className="quiz-opt-x">✗</span>}
                      {isDead     && <span className="quiz-opt-x quiz-opt-x-dead">✗</span>}
                    </button>
                  )
                })}
              </div>
            </>
          )}

          {phase === 'sera' && (
            <div className="quiz-sera">
              <p className="quiz-sera-text">Será?</p>
              <div className="quiz-sera-dots"><span /><span /><span /></div>
            </div>
          )}

          {phase === 'reveal' && (
            <div className="quiz-reveal">
              {burst && (
                <div className="quiz-particles" aria-hidden>
                  {PARTICLES.map(i => (
                    <span key={i} className="quiz-particle" style={{ '--pi': i }} />
                  ))}
                </div>
              )}
              <div className="quiz-reveal-icon">👕</div>
              <p className="quiz-reveal-main">
                {mainText}
                {mainText !== REVEAL_TEXT && <span className="quiz-cursor">|</span>}
              </p>
              {showSub && (
                <p className="quiz-reveal-sub">
                  {subText}
                  {subText !== REVEAL_SUB && <span className="quiz-cursor">|</span>}
                </p>
              )}
              {showSub2 && (
                <p className="quiz-reveal-sub quiz-reveal-sub2">
                  {sub2Text}
                  {sub2Text !== REVEAL_SUB2 && <span className="quiz-cursor">|</span>}
                </p>
              )}
              {showSub2 && sub2Text === REVEAL_SUB2 && (
                <button
                  className="quiz-next-btn"
                  onMouseEnter={sfx.hover}
                  onClick={goQ2}
                >
                  Continuar
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {q === 2 && (
        <div className="quiz-card quiz-card-q2">
          <div className="quiz-tag quiz-tag-mystery">Mistério</div>
          <h2 className="quiz-question quiz-question-q2">
            Hoje vamos dormir juntos... combinando? talvez? enfim...
          </h2>
          <p className="quiz-mystery-hint">olha pra trás</p>
          <div className="quiz-mystery-dots">
            <span /><span /><span />
          </div>
        </div>
      )}
    </section>
  )
}
