// Sons minimalistas gerados via Web Audio API — sem arquivos externos

let ctx = null
const getCtx = () => {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  return ctx
}

function tone({ freq = 440, type = 'sine', duration = 0.12, gain = 0.18, decay = 0.1, delay = 0 }) {
  const ac = getCtx()
  const osc = ac.createOscillator()
  const env = ac.createGain()
  osc.connect(env)
  env.connect(ac.destination)
  osc.type = type
  osc.frequency.setValueAtTime(freq, ac.currentTime + delay)
  env.gain.setValueAtTime(0, ac.currentTime + delay)
  env.gain.linearRampToValueAtTime(gain, ac.currentTime + delay + 0.01)
  env.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + delay + duration + decay)
  osc.start(ac.currentTime + delay)
  osc.stop(ac.currentTime + delay + duration + decay + 0.05)
}

export const sfx = {
  // clique suave numa opção
  click() {
    tone({ freq: 660, type: 'sine', duration: 0.06, gain: 0.12, decay: 0.08 })
  },

  // erro — nota descendente
  wrong() {
    tone({ freq: 320, type: 'sine', duration: 0.08, gain: 0.18, decay: 0.15 })
    tone({ freq: 220, type: 'sine', duration: 0.08, gain: 0.14, decay: 0.2, delay: 0.1 })
  },

  // "Será?" — nota suspensa ascendente
  sera() {
    tone({ freq: 520, type: 'sine', duration: 0.15, gain: 0.14, decay: 0.3, delay: 0 })
    tone({ freq: 660, type: 'sine', duration: 0.15, gain: 0.12, decay: 0.4, delay: 0.18 })
    tone({ freq: 780, type: 'sine', duration: 0.2,  gain: 0.10, decay: 0.6, delay: 0.38 })
  },

  // revelação — acorde ascendente brilhante
  reveal() {
    [523, 659, 784, 1047].forEach((f, i) => {
      tone({ freq: f, type: 'sine', duration: 0.18, gain: 0.13, decay: 0.5, delay: i * 0.07 })
    })
  },

  // cada letra digitada — tick minimalista
  tick() {
    tone({ freq: 900, type: 'sine', duration: 0.02, gain: 0.05, decay: 0.03 })
  },

  // botão continuar / hover
  hover() {
    tone({ freq: 740, type: 'sine', duration: 0.04, gain: 0.08, decay: 0.05 })
  },

  // Q2 aparece — nota misteriosa
  mystery() {
    tone({ freq: 220, type: 'sine', duration: 0.3, gain: 0.12, decay: 0.8 })
    tone({ freq: 330, type: 'sine', duration: 0.2, gain: 0.08, decay: 0.6, delay: 0.3 })
  },
}
