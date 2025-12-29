import { useState, useEffect } from 'react'
import './designs/PiranhaUI.css'

export function PiranhaUI() {
  const [timeRemaining, setTimeRemaining] = useState(10)
  const [playerBalance] = useState(5250.50)
  const [attackInput, setAttackInput] = useState('')
  const [lastCritAttack] = useState('2873')
  const [comboCounts] = useState({
    '1x': 12,
    '2x': 8,
    '3x': 3,
    '4x': 1
  })

  // Simulate cycle timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // New cycle starts
          return 10
        }
        return prev - 1
      })
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
      // Submit attack logic here
      console.log('Attack submitted:', attackInput)
      setAttackInput('')
    }
  }

  const handleClear = () => {
    setAttackInput('')
  }

  const progressPercentage = (timeRemaining / 10) * 100

  return (
    <div className="piranha-container">
      {/* Header: Cycle Number + Timer Progress Bar */}
      <div className="piranha-header">
        <div className="cycle-info">
          <div className="cycle-label">CYCLE</div>
          <div className="cycle-number">42</div>
        </div>
        <div className="timer-section">
          <div className="timer-display">{timeRemaining}s</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>
      </div>

      {/* Player Balance - Top Center */}
      <div className="balance-section">
        <div className="balance-label">PLAYER BALANCE</div>
        <div className="balance-value">${playerBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      </div>

      {/* Main Content Area */}
      <div className="piranha-content">
        {/* Attack Input Section */}
        <div className="attack-input-section">
          <div className="input-display">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="input-digit">
                {attackInput[i] || ''}
              </div>
            ))}
          </div>

          {/* 3x3 Number Pad */}
          <div className="number-pad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button
                key={num}
                className="pad-button"
                onClick={() => handleNumberClick(num)}
                disabled={attackInput.length >= 4 || attackInput.includes(num.toString())}
              >
                {num}
              </button>
            ))}
          </div>

          {/* Control Buttons */}
          <div className="control-buttons">
            <button className="btn-randomize" onClick={handleRandomize}>
              RANDOMIZE
            </button>
            <button className="btn-attack" onClick={handleAttack} disabled={attackInput.length !== 4}>
              ATTACK ($10)
            </button>
          </div>

          <button className="btn-clear" onClick={handleClear}>
            CLEAR
          </button>
        </div>

        {/* Last Cycle Attack Permutation */}
        <div className="last-attack-section">
          <div className="section-label">LAST CYCLE ATTACK</div>
          <div className="last-attack-display">
            {lastCritAttack.split('').map((digit, i) => (
              <div key={i} className="attack-digit">
                {digit}
              </div>
            ))}
          </div>
        </div>

        {/* Combo Statistics - 4 Column Split */}
        <div className="combo-stats-section">
          <div className="section-label">CYCLE COMBO RESULTS</div>
          <div className="combo-grid">
            <div className="combo-card">
              <div className="combo-type">1x</div>
              <div className="combo-count">{comboCounts['1x']}</div>
              <div className="combo-reward">$10 each</div>
            </div>
            <div className="combo-card">
              <div className="combo-type">2x</div>
              <div className="combo-count">{comboCounts['2x']}</div>
              <div className="combo-reward">$50 each</div>
            </div>
            <div className="combo-card">
              <div className="combo-type">3x</div>
              <div className="combo-count">{comboCounts['3x']}</div>
              <div className="combo-reward">$500 each</div>
            </div>
            <div className="combo-card">
              <div className="combo-type">4x</div>
              <div className="combo-count">{comboCounts['4x']}</div>
              <div className="combo-reward">$5,000 each</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
