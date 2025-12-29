import { useState, useEffect } from 'react'
import './designs/WhaleUI.css'

export function WhaleUI() {
  const [timeRemaining, setTimeRemaining] = useState(10)
  const [cycleNumber] = useState(42)
  const [reserve] = useState(425000.00)
  const [initialDeposit] = useState(400000.00)
  const [lastCritAttack] = useState('2873')
  const [cycleAttacks] = useState(1247)
  const [depositAmount, setDepositAmount] = useState('')
  
  const [cyclePayouts] = useState({
    '1x': { count: 12, total: 120 },
    '2x': { count: 8, total: 400 },
    '3x': { count: 3, total: 1500 },
    '4x': { count: 1, total: 5000 }
  })

  // Calculate attack limit per permutation: floor(reserve / 100,000) * 10
  const attackLimit = Math.floor(reserve / 100000) * 10

  // Calculate session P&L
  const sessionPnL = reserve - initialDeposit
  const sessionPnLPercent = ((sessionPnL / initialDeposit) * 100).toFixed(1)

  // Total cycle payout
  const totalCyclePayout = Object.values(cyclePayouts).reduce(
    (sum, p) => sum + p.total, 0
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => prev <= 1 ? 10 : prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount)
    if (amount >= 100000) {
      console.log('Deposit submitted:', amount)
      setDepositAmount('')
    }
  }

  const handleQuickDeposit = (amount: number) => {
    setDepositAmount(amount.toString())
  }

  const formatCurrency = (value: number, compact = false) => {
    if (compact && value >= 1000) {
      return '$' + (value / 1000).toFixed(value % 1000 === 0 ? 0 : 1) + 'K'
    }
    return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  return (
    <div className="w-container">
      {/* Status Bar */}
      <header className="w-status">
        <div className="w-timer">
          <span className="w-timer-value">{timeRemaining}</span>
          <span className="w-timer-label">SEC</span>
        </div>
        <div className="w-cycle">
          <span className="w-cycle-label">CYCLE</span>
          <span className="w-cycle-value">#{cycleNumber}</span>
        </div>
        <div className="w-limit">
          <span className="w-limit-label">ATK LIMIT</span>
          <span className="w-limit-value">{attackLimit}/PERM</span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-progress">
        <div className="w-progress-fill" style={{ width: `${(timeRemaining / 10) * 100}%` }} />
      </div>

      {/* Reserve Display - Hero Section */}
      <section className="w-reserve">
        <div className="w-reserve-label">WHALE RESERVE</div>
        <div className="w-reserve-value">{formatCurrency(reserve)}</div>
        <div className="w-reserve-indicator">
          <span className={`w-indicator ${sessionPnL >= 0 ? 'w-indicator--up' : 'w-indicator--down'}`}>
            {sessionPnL >= 0 ? '▲' : '▼'} {formatCurrency(Math.abs(sessionPnL), true)} ({sessionPnLPercent}%)
          </span>
        </div>
      </section>

      {/* Cycle Stats */}
      <section className="w-cycle-stats">
        <div className="w-stat">
          <span className="w-stat-label">ATTACKS</span>
          <span className="w-stat-value">{cycleAttacks.toLocaleString()}</span>
        </div>
        <div className="w-stat">
          <span className="w-stat-label">PAYOUTS</span>
          <span className="w-stat-value w-stat-value--negative">-{formatCurrency(totalCyclePayout, true)}</span>
        </div>
      </section>

      {/* Last Crit Attack */}
      <section className="w-last">
        <div className="w-last-header">
          <span className="w-last-label">LAST CRIT</span>
        </div>
        <div className="w-last-digits">
          {lastCritAttack.split('').map((digit, i) => (
            <span key={i} className="w-last-digit">{digit}</span>
          ))}
        </div>
      </section>

      {/* Cycle Payouts Breakdown */}
      <section className="w-payouts">
        <div className="w-payouts-label">CYCLE PAYOUTS</div>
        <div className="w-payouts-grid">
          {[
            { type: '1x', data: cyclePayouts['1x'], rate: '$10' },
            { type: '2x', data: cyclePayouts['2x'], rate: '$50' },
            { type: '3x', data: cyclePayouts['3x'], rate: '$500' },
            { type: '4x', data: cyclePayouts['4x'], rate: '$5K' }
          ].map(payout => (
            <div key={payout.type} className="w-payout">
              <span className="w-payout-type">{payout.type}</span>
              <span className="w-payout-count">{payout.data.count}</span>
              <span className="w-payout-total">-{formatCurrency(payout.data.total, true)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Deposit Section */}
      <section className="w-deposit">
        <div className="w-deposit-label">ADD TO RESERVE</div>
        <div className="w-deposit-quick">
          <button className="w-quick-btn" onClick={() => handleQuickDeposit(100000)}>$100K</button>
          <button className="w-quick-btn" onClick={() => handleQuickDeposit(250000)}>$250K</button>
          <button className="w-quick-btn" onClick={() => handleQuickDeposit(500000)}>$500K</button>
        </div>
        <div className="w-deposit-input">
          <span className="w-input-prefix">$</span>
          <input
            type="number"
            className="w-input"
            placeholder="100,000"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            min={100000}
            step={10000}
          />
        </div>
        <button 
          className="w-deposit-btn"
          onClick={handleDeposit}
          disabled={!depositAmount || parseFloat(depositAmount) < 100000}
        >
          DEPOSIT
        </button>
        <div className="w-deposit-min">MIN: $100,000</div>
      </section>
    </div>
  )
}
