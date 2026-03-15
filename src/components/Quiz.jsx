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

const REVEAL_TEXT = 'SIMMM! A CAMISA DOS ESQUERDISTAS! 😂'
const REVEAL_SUB  = '(como diz minha sogra)'
const REVEAL_SUB2 = ''

const Q3_OPTIONS = [
  { id: 'a', emoji: '💐', label: 'Outro buquê' },
  { id: 'b', emoji: '🧸', label: 'Pelúcia' },
  { id: 'c', emoji: '🍫', label: 'Chocolate' },
  { id: 'd', emoji: '🎁', label: 'Caixinha surpresa', correct: true },
  { id: 'e', emoji: '👑', label: 'Coroa (você merece)' },
]

const Q3_REVEAL_TEXT = 'UMA CAIXINHA SÓ PRA VOCÊ! 🎁'
const Q3_REVEAL_SUB  = 'Cada item dentro dela tem um pedacinho da nossa história.'
const Q3_REVEAL_SUB2 = 'Porque você merece muito mais do que eu consigo colocar numa caixa. ❤️'

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
  const [showSub,   setShowSub]   = useState(false)
  const [showSub2,  setShowSub2]  = useState(false)
  const [burst,     setBurst]     = useState(false)
  const [q3Phase,   setQ3Phase]   = useState('idle')
  const [q3Sel,     setQ3Sel]     = useState(null)
  const [q3Dead,    setQ3Dead]    = useState([])
  const [q3Sub,     setQ3Sub]     = useState(false)
  const [q3Sub2,    setQ3Sub2]    = useState(false)
  const [q3Burst,   setQ3Burst]   = useState(false)
  const startRef   = useRef(null)
  const sectionRef = useRef(null)

  const mainText  = useTypewriter(REVEAL_TEXT,    phase === 'reveal',       48, sfx.tick)
  const subText   = useTypewriter(REVEAL_SUB,     showSub,                  36, sfx.tick)
  const sub2Text  = useTypewriter(REVEAL_SUB2,    showSub2,                 36, sfx.tick)
  const q3Main    = useTypewriter(Q3_REVEAL_TEXT, q3Phase === 'reveal',     48, sfx.tick)
  const q3SubTxt  = useTypewriter(Q3_REVEAL_SUB,  q3Sub,                    36, sfx.tick)
  const q3Sub2Txt = useTypewriter(Q3_REVEAL_SUB2, q3Sub2,                   36, sfx.tick)

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

  const goQ3 = () => {
    sfx.mystery()
    setQ(3)
  }

  const chooseQ3 = (opt) => {
    if (q3Phase !== 'idle' && q3Phase !== 'wrong') return
    if (q3Dead.includes(opt.id)) return
    sfx.click()
    setQ3Sel(opt.id)
    setQ3Phase('checking')
    setTimeout(() => {
      if (opt.correct) {
        sfx.reveal()
        setQ3Phase('reveal')
      } else {
        sfx.wrong()
        setQ3Dead(d => [...d, opt.id])
        setQ3Phase('wrong')
        setTimeout(() => setQ3Sel(null), 900)
      }
    }, 800)
  }

  useEffect(() => {
    if (q3Phase === 'reveal' && q3Main === Q3_REVEAL_TEXT) {
      setQ3Burst(true)
      const t = setTimeout(() => setQ3Sub(true), 500)
      return () => clearTimeout(t)
    }
  }, [q3Main, q3Phase])

  useEffect(() => {
    if (q3Sub && q3SubTxt === Q3_REVEAL_SUB) {
      const t = setTimeout(() => setQ3Sub2(true), 300)
      return () => clearTimeout(t)
    }
  }, [q3SubTxt, q3Sub])

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
                AMORZÃO, sei que você está bem ansiosa, mas vamos brincar de um negócio. Tá bom? Vamos lá...
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
              {showSub && subText === REVEAL_SUB && (
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
          <button
            className="quiz-next-btn"
            onMouseEnter={sfx.hover}
            onClick={goQ3}
          >
            Continuar
          </button>
        </div>
      )}

      {q === 3 && (
        <div className="quiz-card quiz-card-q2">
          <div className="quiz-tag quiz-tag-mystery">Surpresa</div>
          <h2 className="quiz-question quiz-question-q2">
            Ainda tem mais uma coisinha...
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
