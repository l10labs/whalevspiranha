import { useState, useEffect } from 'react'
import './designs/PiranhaUI.css'

export function PiranhaUI() {
  const [timeRemaining, setTimeRemaining] = useState(10)
  const [playerBalance] = useState(5250.50)
  const [attackInput, setAttackInput] = useState('')
  const [lastCritAttack] = useState('2873')
  const [cycleNumber] = useState(42)
  const [comboCounts] = useState({
    '1x': 12,
    '2x': 8,
    '3x': 3,
    '4x': 1
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => prev <= 1 ? 10 : prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleNumberClick = (num: number) => {
    if (attackInput.length < 4 && !attackInput.includes(num.toString())) {
      setAttackInput(prev => prev + num)
    }
  }

  const handleRandomize = () => {
    const available = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const shuffled = available.sort(() => Math.random() - 0.5)
    setAttackInput(shuffled.slice(0, 4).join(''))
  }

  const handleAttack = () => {
    if (attackInput.length === 4) {
      console.log('Attack submitted:', attackInput)
      setAttackInput('')
    }
  }

  const handleClear = () => setAttackInput('')
  const handleBackspace = () => setAttackInput(prev => prev.slice(0, -1))

  return (
    <div className="p-container">
      {/* Status Bar */}
      <header className="p-status">
        <div className="p-timer">
          <span className="p-timer-value">{timeRemaining}</span>
          <span className="p-timer-label">SEC</span>
        </div>
        <div className="p-cycle">
          <span className="p-cycle-label">CYCLE</span>
          <span className="p-cycle-value">#{cycleNumber}</span>
        </div>
        <div className="p-balance">
          <span className="p-balance-value">${playerBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="p-progress">
        <div className="p-progress-fill" style={{ width: `${(timeRemaining / 10) * 100}%` }} />
      </div>

      {/* Attack Input Display */}
      <section className="p-attack">
        <div className="p-attack-label">YOUR ATTACK</div>
        <div className="p-attack-digits">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`p-digit ${attackInput[i] ? 'p-digit--active' : ''}`}>
              {attackInput[i] || '_'}
            </div>
          ))}
        </div>
      </section>

      {/* Number Pad */}
      <section className="p-pad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button
            key={num}
            className={`p-pad-btn ${attackInput.includes(num.toString()) ? 'p-pad-btn--used' : ''}`}
            onClick={() => handleNumberClick(num)}
            disabled={attackInput.length >= 4 || attackInput.includes(num.toString())}
          >
            {num}
          </button>
        ))}
      </section>

      {/* Action Buttons */}
      <section className="p-actions">
        <button className="p-btn p-btn--secondary" onClick={handleClear}>CLR</button>
        <button className="p-btn p-btn--secondary" onClick={handleBackspace}>DEL</button>
        <button className="p-btn p-btn--secondary" onClick={handleRandomize}>RND</button>
        <button 
          className="p-btn p-btn--primary" 
          onClick={handleAttack} 
          disabled={attackInput.length !== 4}
        >
          ATTACK $10
        </button>
      </section>

      {/* Last Cycle Result */}
      <section className="p-last">
        <div className="p-last-header">
          <span className="p-last-label">LAST CRIT</span>
        </div>
        <div className="p-last-digits">
          {lastCritAttack.split('').map((digit, i) => (
            <span key={i} className="p-last-digit">{digit}</span>
          ))}
        </div>
      </section>

      {/* Combo Stats */}
      <section className="p-combos">
        <div className="p-combos-label">CYCLE HITS</div>
        <div className="p-combos-grid">
          {[
            { type: '1x', count: comboCounts['1x'], reward: '$10' },
            { type: '2x', count: comboCounts['2x'], reward: '$50' },
            { type: '3x', count: comboCounts['3x'], reward: '$500' },
            { type: '4x', count: comboCounts['4x'], reward: '$5K' }
          ].map(combo => (
            <div key={combo.type} className="p-combo">
              <span className="p-combo-type">{combo.type}</span>
              <span className="p-combo-count">{combo.count}</span>
              <span className="p-combo-reward">{combo.reward}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
