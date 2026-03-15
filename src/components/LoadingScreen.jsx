import { useEffect, useState } from 'react'
import './css/LoadingScreen.css'

export default function LoadingScreen({ onFinish }) {
  const [phase, setPhase] = useState('logo')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('bar'), 300)
    const t2 = setTimeout(() => setPhase('fade'), 1800)
    const t3 = setTimeout(() => onFinish(), 2200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onFinish])

  return (
    <div className={`loading-screen ${phase === 'fade' ? 'loading-fade' : ''}`}>
      <div className="loading-logo">
        <span className="loading-logo-small">um pouco da</span>
        <span className="loading-logo-main">nossa história</span>
      </div>
      {phase !== 'logo' && (
        <div className="loading-bar-wrap">
          <div className={`loading-bar ${phase === 'bar' || phase === 'fade' ? 'loading-bar-fill' : ''}`} />
        </div>
      )}
    </div>
  )
}
