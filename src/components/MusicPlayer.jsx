import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import './css/MusicPlayer.css'
import ordinary from '../assets/Alex Warren - Ordinary (Official Video) - Alex Warren (youtube).mp3'
import sorte    from '../assets/Sorte - Caetano Veloso & Gal Costa (1985) - George Kaplan (youtube).mp3'
import seraAmor from '../assets/Será que é amor (Ao vivo) - Arlindo Cruz (youtube).mp3'
import aindaBem from '../assets/Thiaguinho_-_Ainda_Bem_DVD_Ousadia_e_Alegria_Vdeo_Oficial.mp4'

const PLAYLIST = [
  { title: 'Ordinary',        artist: 'Alex Warren',  src: ordinary },
  { title: 'Sorte',           artist: 'Gal Costa',    src: sorte    },
  { title: 'Será Que É Amor', artist: 'Arlindo Cruz', src: seraAmor },
  { title: 'Ainda Bem',       artist: 'Thiaguinho',   src: aindaBem },
]

const fmt = s => { const n = Math.floor(s || 0); return `${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}` }

const ICONS = {
  prev:  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>,
  next:  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zm2-8.14 5.5 3.89L8 15.14V9.86zM16 6h2v12h-2z"/></svg>,
  pause: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>,
  play:  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>,
  list:  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h13v-2H3v2zm0-5h10v-2H3v2zm0-7v2h13V6H3zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5L21 15.59z"/></svg>,
  volOff:<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18l2 2L21 18.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z"/></svg>,
  volOn: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>,
}

const MusicPlayer = forwardRef(function MusicPlayer(_, ref) {
  const [index,    setIndex]    = useState(0)
  const [playing,  setPlaying]  = useState(false)
  const [pos,      setPos]      = useState(0)
  const [dur,      setDur]      = useState(0)
  const [vol,      setVol]      = useState(20)
  const [muted,    setMuted]    = useState(false)
  const [showList, setShowList] = useState(false)

  const audioRef    = useRef(null)
  const playingRef  = useRef(false)

  // expõe pause/resume para o pai
  useImperativeHandle(ref, () => ({
    pause() {
      if (playingRef.current && audioRef.current) {
        audioRef.current.pause()
        setPlaying(false)
        playingRef.current = false
        return true // estava tocando
      }
      return false
    },
    resume() {
      if (audioRef.current) {
        audioRef.current.play().then(() => { setPlaying(true); playingRef.current = true }).catch(() => {})
      }
    },
  }))

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    a.volume = vol / 100
    const onTime = () => setPos(a.currentTime)
    const onMeta = () => setDur(a.duration || 0)
    const onEnd  = () => {
      const next = (index + 1) % PLAYLIST.length
      setIndex(next); setPos(0); setDur(0)
    }
    a.addEventListener('timeupdate', onTime)
    a.addEventListener('loadedmetadata', onMeta)
    a.addEventListener('ended', onEnd)
    return () => {
      a.removeEventListener('timeupdate', onTime)
      a.removeEventListener('loadedmetadata', onMeta)
      a.removeEventListener('ended', onEnd)
    }
  }, [index, vol])

  useEffect(() => {
    const a = audioRef.current; if (!a) return
    const wasPlaying = playingRef.current
    a.load(); setPos(0); setDur(0)
    if (wasPlaying) a.play().catch(() => {})
  }, [index])

  const toggle = () => {
    const a = audioRef.current; if (!a) return
    if (playing) {
      a.pause(); setPlaying(false); playingRef.current = false
    } else {
      a.play().then(() => { setPlaying(true); playingRef.current = true }).catch(() => {})
    }
  }

  const load = (i) => { setIndex(i); setShowList(false) }

  const seek = (v) => { setPos(v); if (audioRef.current) audioRef.current.currentTime = v }

  const changeVol = (v) => {
    setVol(v); setMuted(v === 0)
    if (audioRef.current) { audioRef.current.volume = v / 100; audioRef.current.muted = v === 0 }
  }

  const toggleMute = () => {
    const a = audioRef.current; if (!a) return
    const next = !muted; setMuted(next); a.muted = next
  }

  const track = PLAYLIST[index]

  return (
    <div className="pw-wrap">
      <audio ref={audioRef} src={track.src} preload="none" />

      <div className="pw">
        <div className="pw-info">
          <div className="pw-track-line">
            <span className={`pw-note ${playing ? 'pw-note-spin' : ''}`}>♪</span>
            <span className="pw-title">{track.title}</span>
            <span className="pw-sep">—</span>
            <span className="pw-artist">{track.artist}</span>
          </div>
          <div className="pw-bar">
            <span className="pw-time">{fmt(pos)}</span>
            <input type="range" className="pw-range" min={0} max={dur || 1} step={0.5} value={pos}
              onChange={e => seek(Number(e.target.value))} />
            <span className="pw-time">{fmt(dur)}</span>
          </div>
        </div>

        <div className="pw-controls">
          <button className="pw-btn" onClick={() => load((index - 1 + PLAYLIST.length) % PLAYLIST.length)}>{ICONS.prev}</button>
          <button className="pw-btn pw-play" onClick={toggle}>{playing ? ICONS.pause : ICONS.play}</button>
          <button className="pw-btn" onClick={() => load((index + 1) % PLAYLIST.length)}>{ICONS.next}</button>

          <button className="pw-btn" onClick={toggleMute}>{muted || vol === 0 ? ICONS.volOff : ICONS.volOn}</button>
          <input type="range" className="pw-range pw-vol-range" min={0} max={100} value={muted ? 0 : vol}
            onChange={e => changeVol(Number(e.target.value))} />

          <div className="pw-pop-wrap">
            <button className="pw-btn" onClick={() => setShowList(v => !v)}>{ICONS.list}</button>
            {showList && (
              <div className="pw-list">
                {PLAYLIST.map((t, i) => (
                  <button key={i} className={`pw-list-item ${i === index ? 'pw-list-active' : ''}`} onClick={() => load(i)}>
                    <span className="pw-list-title">{t.title}</span>
                    <span className="pw-list-artist">{t.artist}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})

export default MusicPlayer
