import { useState, useEffect } from 'react'
import {
  StatusBar,
  ProgressBar,
  DigitDisplay,
  StatsGrid,
  ReserveDisplay,
  CycleStats,
  DepositSection
} from './components'
import './components/GameUI.css'

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

  const attackLimit = Math.floor(reserve / 100000) * 10
  const sessionPnL = reserve - initialDeposit
  const sessionPnLPercent = ((sessionPnL / initialDeposit) * 100).toFixed(1)
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
    if (compact && Math.abs(value) >= 1000) {
      return '$' + (value / 1000).toFixed(Math.abs(value) % 1000 === 0 ? 0 : 1) + 'K'
    }
    return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  const payoutItems = [
    { type: '1x', count: cyclePayouts['1x'].count, reward: formatCurrency(cyclePayouts['1x'].total, true) },
    { type: '2x', count: cyclePayouts['2x'].count, reward: formatCurrency(cyclePayouts['2x'].total, true) },
    { type: '3x', count: cyclePayouts['3x'].count, reward: formatCurrency(cyclePayouts['3x'].total, true) },
    { type: '4x', count: cyclePayouts['4x'].count, reward: formatCurrency(cyclePayouts['4x'].total, true) }
  ]

  return (
    <div className="game-container game-container--whale">
      <StatusBar
        timeRemaining={timeRemaining}
        cycleNumber={cycleNumber}
        variant="whale"
        rightContent={
          <>
            <span className="status-label">ATK LIMIT</span>
            <span className="status-value status-value--limit">{attackLimit}/PERM</span>
          </>
        }
      />
      
      <ProgressBar value={timeRemaining} max={10} variant="whale" />
      
      <ReserveDisplay
        reserve={reserve}
        sessionPnL={sessionPnL}
        sessionPnLPercent={sessionPnLPercent}
        formatCurrency={formatCurrency}
      />
      
      <CycleStats
        cycleAttacks={cycleAttacks}
        totalPayout={totalCyclePayout}
        formatCurrency={formatCurrency}
      />
      
      <DigitDisplay
        label="LAST CRIT"
        digits={lastCritAttack}
        variant="whale"
        type="crit"
      />
      
      <StatsGrid
        label="CYCLE PAYOUTS"
        items={payoutItems}
        variant="whale"
        showNegative
      />
      
      <DepositSection
        depositAmount={depositAmount}
        onDepositAmountChange={setDepositAmount}
        onQuickDeposit={handleQuickDeposit}
        onDeposit={handleDeposit}
      />
    </div>
  )
}
