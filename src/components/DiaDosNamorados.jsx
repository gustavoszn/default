import { useState, useEffect, useRef, useCallback } from 'react'
import Rating from './Rating'
import Quiz from './Quiz'
import './css/DiaDosNamorados.css'
import MusicPlayer from './MusicPlayer'

import nossoVideo  from '../assets/WhatsApp Video 2026-03-15 at 00.09.07.mp4'
import imgBe       from '../assets/be.jpeg'
import imgIsa      from '../assets/isa.jpeg'
import imgLa       from '../assets/la.jpeg'
import imgIsabela1 from '../assets/isabela1.jpeg'
import imgIsabela3 from '../assets/isabela3.jpeg'
import imgIsabela4 from '../assets/isabela4.jpeg'
import imgIsabela5 from '../assets/isabela5.jpeg'
import imgIsabela6 from '../assets/isabela6.jpeg'
import imgIsabela9 from '../assets/isabela9.jpeg'
import imgIsabela10 from '../assets/isabela10.jpeg'
import imgIsabela12 from '../assets/isabela12.jpeg'
import img16       from '../assets/16.jpeg'
import imgNovo     from '../assets/novo.jpeg'

const START_DATE = new Date('2024-03-16')
const PETALS = Array.from({ length: 12 }, (_, i) => i)

function useDaysTogether() {
  const [days, setDays] = useState(0)
  useEffect(() => {
    const calc = () => setDays(Math.floor((Date.now() - START_DATE.getTime()) / 86400000))
    calc()
    const t = setInterval(calc, 60000)
    return () => clearInterval(t)
  }, [])
  return days
}

const memorias = [
  { id: 1,  image: imgBe,        title: 'A Primeira Vez',                    date: '16/03/2024', description: 'Esse foi o dia. Eu tava super ansioso, tremendo de medo. Quando ouvi "cheguei", bateu aquele frio na barriga. Quando te vi, foi maravilhoso. Você tava linda demais. A primeira vez foi cheia de nervosismo, mas tentamos de novo na escada... e foi surreal. Uma conexão que eu nunca tinha sentido antes. "Cara de apaixonada você tá." "Eu não." Mas tava sim... e só se fez muito.' },
  { id: 2,  image: imgIsa,       title: 'A Primeira Saída',                  date: '01/06/2024', description: 'Aqui foi a primeira vez que saímos juntos de verdade. A gente já tinha ficado algumas vezes, já tinha tido nossos primeiros momentos… e eu fiquei um pouco nervoso por um motivo: ia falar com o seu pai. Mas acabou sendo tranquilo, porque a luz da sua casa acabou e ele acabou adiando a conversa. Só restou a gente se divertir.' },
  { id: 3,  image: imgLa,        title: 'Nosso Primeiro Dia dos Namorados',  date: '12/06/2024', description: 'Esse dia foi incrível, nosso primeiro dia dos namorados mesmo sendo ficantes? Para mim você já era minha namorada. Na escola, eu falei: "Feliz Dia dos Namorados" e você me olhou com os olhos brilhando, igual a um nenem. Eu te dei um chocolate e ainda pedi para cantarem para você, kkkkk. Depois você veio para minha casa direto da escola, ficou quase uma hora no banheiro e saiu com uma caixa cheia de presentes. Chorei, porque nunca tinha me sentido tão amado e nunca tinha sentido aquilo, era algo que realmente estava se formando, ou que já estava formado, enfim... Passamos o dia inteiro juntos e foi simplesmente incrível.' },
  { id: 4,  image: imgIsabela5,  title: 'Nossa Primeira Festa Junina',       date: '14/06/2024', description: 'Aqui curtimos nossa primeira festa junina na escola juntos. Você estava muito linda e eu estava cansado e meio chato, porque nunca gostei dessa escola e ter que ir me irritou, mas mesmo assim foi muito bom. Comemos, ficamos juntos e foi bem apaixonado.' },
  { id: 5,  image: imgIsabela12, title: 'Nossa Primeira Conexão Íntima',     date: '22/06/2024', description: 'Nossa, esse foi um dia que fiquei muito nervoso, kkkkkkkkk. Foi nossa primeira conexão íntima e foi maravilhoso. Você conheceu meus avós, estávamos na festa junina na casa da sua best veyr rsrs e depois fomos para minha casa. Nos beijamos bastante e tivemos nossa primeira relação. Foi rápido e a gente estava nervoso, mas foi muito bom. A questão é que você é linda e gostosa demais, não aguento 😅.' },
  { id: 6,  image: img16,        title: 'O Pedido de Namoro',                date: '21/09/2024', description: 'Nosso dia 21 foi inesquecível, o dia em que concretizamos nosso compromisso. A Dandara perdeu a voz kkkkk, você estava na casa dela e eu queria te entregar a aliança na roda-gigante do Villa-Lobos, mas não deu. Te chamei para minha casa. Você, teimosa como sempre, não queria ir, mas sua mãe te convenceu. Te entreguei a aliança com um buquê gigante, pedi sua mão ao seu pai, que ficou emocionado. Foi a primeira e única vez que me ajoelhei para pedir a mão de alguém em namoro, e foi do amor da minha vida. Você chorou bastante, não acreditou, mas o importante é que você gostou!' },
  { id: 7,  image: imgIsabela3,  title: 'Nossa Primeira Praia',              date: '12/10/2024', description: 'Nossa primeira praia juntos foi maravilhosa. Saímos com minha mãe e minha tia, e dormimos pela primeira vez juntos em uma cama de casal. Você estava imensuravel mente linda, principalmente quando estava sem roupa rsrs. Você gemendo alto e a gente movendo a cama lá pra janela, vizinho de baixo ficou com inveja.' },
  { id: 8,  image: imgNovo,      title: 'Nosso Ano Novo',                    date: '31/12/2024', description: 'Nosso primeiro ano novo. Você foi para minha casa à noite, fomos para a minha prima e você ficou bêbada pela primeira vez kkkkk. Aproveitamos bastante e na hora dos fogos foi bem romantico. Como sempre, brigamos de madrugada.... por motivos bestas (culpa sua sempre kkkkk). Voltamos para minha casa de manhã, eu dormindo no sofá e você saiu do banheiro sem roupa, rindo e dizendo que eu estava louco de dormir, já subindo em cima de mim. Aproveitamos nossa manhã juntos e depois dormimos. Foi ótimo!' },
  { id: 9,  image: imgIsabela1,  title: 'Nossa Formatura',                   date: '18/12/2025', description: 'Dia da nossa formatura foi maravilhoso, praticamente a última vez com o pessoal da escola. Aproveitamos muito, brincamos, gritamos "Murilão grandão" no meio da cerimônia kkkkk. Você estava linda demais! Me surpreendo sempre que te vejo, você é surreal. Esse dia... Foi o fim de um ciclo, o fim do nosso ensino médio, e ficamos juntos até o final, algo que vou ter o prazer de contar para nossos filhos.' },
  { id: 10, image: imgIsabela10, title: 'Nosso Segundo Ano Novo',            date: '31/12/2025', description: 'Nosso segundo ano novo juntos. Você estava maravilhosa como sempre, combinamos roupas, vimos os fogos e eu fiquei bêbado demais... falei que ia ficar igual o Woody de Toy Story! Levei bebida dos outros para casa KKKKKKKKKKK e apesar da confusão, foi divertido e é história para contar!' },
  { id: 11, image: imgIsabela9,  title: 'Nossa Viagem para Olímpia',         date: '15/01/2026', description: 'Nossa primeira viagem com sua família foi para Olímpia, foram longas seis horas de carro, mas foi muito legal. Passeamos, aproveitamos bastante e foi tudo maravilhoso. Fomos ao parque enquanto a cidade estava sem luz, pegamos ingressos de graça e você ainda imitou um sapo, minha PCDzinha, te amo! Qualquer viagem com você e sua família é sempre incrível.' },
  { id: 12, image: imgIsabela6,  title: 'Nossa Última Viagem',               date: '01/03/2026', description: 'A última viagem que fizemos também foi em família, fomos para a praia. Aproveitamos muito, brincamos à noite, caminhamos bastante procurando uma moto elétrica para passear (sem sucesso), tomamos sorvete, comemos muito bem, e foi simplesmente maravilhoso. Já estou ansioso pela próxima!' },
]

function VideoModal({ onClose }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(true)
  const [muted,   setMuted]   = useState(false)
  const [pos,     setPos]     = useState(0)
  const [dur,     setDur]     = useState(0)
  const [vol,     setVol]     = useState(1)
  const [ended,   setEnded]   = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      const v = videoRef.current
      if (v) { setPos(v.currentTime); setDur(v.duration || 0) }
    }, 300)
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { clearInterval(t); window.removeEventListener('keydown', onKey) }
  }, [onClose])

  useEffect(() => {
    if (ended) {
      const t = setTimeout(() => onClose(), 3000)
      return () => clearTimeout(t)
    }
  }, [ended, onClose])

  const toggle = () => {
    const v = videoRef.current; if (!v) return
    playing ? v.pause() : v.play()
    setPlaying(p => !p)
  }

  const seek = (e) => {
    const val = Number(e.target.value)
    if (videoRef.current) videoRef.current.currentTime = val
    setPos(val)
  }

  const changeVol = (e) => {
    const val = Number(e.target.value)
    setVol(val); setMuted(val === 0)
    if (videoRef.current) videoRef.current.volume = val
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    const next = !muted; videoRef.current.muted = next; setMuted(next)
  }

  const fmt = (s) => { const n = Math.floor(s || 0); return `${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}` }

  return (
    <div className="vmodal-backdrop" onClick={onClose}>
      <div className="vmodal-box" onClick={e => e.stopPropagation()}>
        <video
          ref={videoRef}
          src={nossoVideo}
          className="vmodal-video"
          autoPlay playsInline
          onEnded={() => { setPlaying(false); setEnded(true) }}
          onError={() => setPlaying(false)}
        />
        {ended && (
          <div className="vmodal-ended">
            <p className="vmodal-ended-text">Eu te amo!</p>
            <p className="vmodal-ended-sub">agora aproveita as fotos. ❤️</p>
          </div>
        )}
        <div className="vmodal-controls">
          <div className="vmodal-progress-wrap">
            <div className="vmodal-progress-bg">
              <div className="vmodal-progress-fill" style={{ width: `${dur ? (pos/dur)*100 : 0}%` }} />
              <input type="range" className="vmodal-seek" min={0} max={dur || 1} step={0.1} value={pos} onChange={seek} />
            </div>
            <div className="vmodal-times"><span>{fmt(pos)}</span><span>{fmt(dur)}</span></div>
          </div>
          <div className="vmodal-btns">
            <button className="vmodal-btn vmodal-play" onClick={toggle}>
              {playing
                ? <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                : <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>}
            </button>
            <div className="vmodal-vol-wrap">
              <button className="vmodal-btn" onClick={toggleMute}>
                {muted || vol === 0
                  ? <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18l2 2L21 18.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z"/></svg>
                  : <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>}
              </button>
              <input type="range" className="vmodal-vol-range" min={0} max={1} step={0.05} value={muted ? 0 : vol} onChange={changeVol} />
            </div>
            <span className="vmodal-title-label">16/03 — Nossa História ❤️</span>
            <button className="vmodal-btn vmodal-close-btn" onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DiaDosNamorados() {
  const days = useDaysTogether()
  const [videoOpen,   setVideoOpen]   = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [activeCard,  setActiveCard]  = useState(null)
  const musicRef = useRef(null)
  const wasPlayingRef = useRef(false)

  // autoplay Sorte ao montar (requer interação prévia do usuário — já houve no clique do perfil)
  useEffect(() => {
    const t = setTimeout(() => {
      musicRef.current?.resume()
    }, 600)
    return () => clearTimeout(t)
  }, [])

  const openVideo = useCallback(() => {
    wasPlayingRef.current = musicRef.current?.pause() ?? false
    setVideoOpen(true)
  }, [])

  const closeVideo = useCallback(() => {
    setVideoOpen(false)
    if (wasPlayingRef.current) musicRef.current?.resume()
  }, [])

  return (
    <div className="dias-namorados">
      <div className="petals-bg" aria-hidden>
        {PETALS.map(i => <span key={i} className="petal" style={{ '--pi': i }}>🌸</span>)}
      </div>

      {videoOpen && <VideoModal onClose={closeVideo} />}

      {activeCard && (
        <div className="mcard-backdrop" onClick={() => setActiveCard(null)}>
          <div className="mcard-sheet" onClick={e => e.stopPropagation()}>
            <img src={activeCard.image} alt={activeCard.title} className="mcard-img" />
            <div className="mcard-body">
              <p className="mcard-date">{activeCard.date}</p>
              <h3 className="mcard-title">{activeCard.title}</h3>
              <p className="mcard-desc">{activeCard.description}</p>
            </div>
            <button className="mcard-close" onClick={() => setActiveCard(null)}>✕</button>
          </div>
        </div>
      )}

      <header className="header">
        <div className="header-left">
          <div className="logo">NETFLIX</div>
          <nav className="nav-menu">
            <a href="#inicio">Início</a>
            <a href="#series">Séries</a>
            <a href="#filmes">Filmes</a>
            <a href="#bombando">Bombando</a>
            <a href="#lista">Minha lista</a>
          </nav>
        </div>
        <div className="header-right">
          <button className="header-btn" aria-label="Buscar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
          <button className="header-btn" aria-label="Notificações">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
            </svg>
          </button>
          <button className="header-btn header-avatar" aria-label="Perfil">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
            </svg>
          </button>
          <button
            className="header-btn hamburger"
            aria-label="Menu"
            onClick={() => setMenuOpen(v => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
          <a href="#inicio">Início</a>
          <a href="#series">Séries</a>
          <a href="#filmes">Filmes</a>
          <a href="#bombando">Bombando</a>
          <a href="#lista">Minha lista</a>
        </div>
      )}

      <div className="days-badge">
        <span className="days-num">{days}</span>
        <span className="days-label">dias juntos ❤️</span>
      </div>

      <section className="hero" id="inicio">
        <div className="hero-background">
          <div className="hero-collage">
            <img src={imgIsabela10} alt="" className="collage-img collage-1" loading="lazy" />
            <img src={imgIsabela1}  alt="" className="collage-img collage-2" loading="lazy" />
            <img src={imgNovo}      alt="" className="collage-img collage-3" loading="lazy" />
            <img src={imgIsabela9}  alt="" className="collage-img collage-4" loading="lazy" />
            <img src={imgIsabela6}  alt="" className="collage-img collage-5" loading="lazy" />
            <img src={img16}        alt="" className="collage-img collage-6" loading="lazy" />
            <img src={imgLa}        alt="" className="collage-img collage-7" loading="lazy" />
            <img src={imgIsabela4}  alt="" className="collage-img collage-8" loading="lazy" />
          </div>
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-badge">❤️ 2 anos juntos</div>
            <h1 className="hero-title"><div className="title-text">16/03</div></h1>
            <p className="hero-description">
              Em um dia que parecia comum, entre risadas, conversas e um churrasco entre amigos,
              dois caminhos se cruzam. O que começa simples logo vira algo maior: o início de um
              amor e de uma parceria que mudaria duas vidas para sempre. ❤️
            </p>
            <div className="hero-buttons">
              <button className="btn btn-play" onClick={openVideo}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                Assistir
              </button>
              <button className="btn btn-info" onClick={() =>
                document.querySelector('.section-title')?.scrollIntoView({ behavior: 'smooth' })
              }>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                Mais informações
              </button>
            </div>
            <div className="hero-player"><MusicPlayer ref={musicRef} /></div>
          </div>
        </div>
      </section>

      <section className="parabens-section">
        <div className="parabens-glow" aria-hidden />
        <div className="parabens-content">
          <div className="parabens-icon">🎉</div>
          <h2 className="parabens-title">Parabéns pra nós, meu amor</h2>
          <p className="parabens-sub">
            Dois anos. {days} dias de escolher um ao outro todo dia.<br />
            De brigas que passam, de risos que ficam, de um amor que só cresce.<br />
            Você é a melhor coisa que já aconteceu na minha vida. ❤️
          </p>
          <div className="parabens-badges">
            <div className="parabens-badge"><span>💍</span> 2 anos</div>
            <div className="parabens-badge"><span>❤️</span> {days} dias</div>
            <div className="parabens-badge"><span>✨</span> Para sempre</div>
          </div>
        </div>
      </section>

      <section className="content-section" id="series">
        <h2 className="section-title">Nossos melhores momentos!</h2>
        <div className="carousel-container">
          {[memorias.slice(0,6), memorias.slice(6,12)].map((row, ri) => (
            <div key={ri} className="carousel-row">
              {row.map((m, ci) => (
                <div key={m.id} className="carousel-item" style={{ '--ci': ri * 6 + ci }}
                  onClick={() => setActiveCard(m)}
                >
                  <div className="carousel-item-image">
                    <img src={m.image} alt={m.title} loading="lazy" />
                    <div className="carousel-item-label">
                      <div className="carousel-item-label-title">{m.title}</div>
                      <div className="carousel-item-label-date">{m.date}</div>
                    </div>
                  </div>
                  <div className="carousel-text-box">
                    <h3 className="carousel-text-title">{m.title}</h3>
                    <p className="carousel-text-date">{m.date}</p>
                    <p className="carousel-text-description">{m.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <Quiz />

      <footer className="footer">
        <div className="footer-content">
          <h2 className="footer-title">Nossa História Continua...</h2>
          <p className="footer-text">
            Cada foto aqui é mais do que uma memória, é um pedaço da nossa história,
            do nosso amor, da nossa cumplicidade. Desde aquele primeiro dia até agora,
            você só me surpreende cada vez mais. Ver você crescer, evoluir e se tornar
            essa mulher incrível que você é hoje me enche de orgulho.
          </p>
          <p className="footer-text">
            Tenho certeza absoluta de que você será uma psicóloga de sucesso,
            porque você tem tudo: dedicação, inteligência, empatia e um coração gigante.
            E pode ter certeza de uma coisa, eu sempre vou estar ao seu lado,
            te apoiando, te amando e vibrando por cada conquista sua! Parabéns pelo novo emprego!
          </p>
          <p className="footer-text">
            Obrigado por cada momento, cada sorriso, cada beijo, cada abraço.
            Obrigado por ser minha parceira, minha melhor amiga, meu amor.
            Te amo hoje, amanhã e para sempre.
          </p>
          <div className="footer-signature">
            <p>Com todo meu amor,</p>
            <p className="footer-name">Gustavo ❤️</p>
          </div>
        </div>
      </footer>

      <Rating />
    </div>
  )
}
