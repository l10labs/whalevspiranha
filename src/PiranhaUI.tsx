import { useState, useEffect } from 'react'
import {
  StatusBar,
  ProgressBar,
  DigitDisplay,
  NumberPad,
  ActionButtons,
  StatsGrid
} from './components'
import './components/GameUI.css'

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

  const comboItems = [
    { type: '1x', count: comboCounts['1x'], reward: '$10' },
    { type: '2x', count: comboCounts['2x'], reward: '$50' },
    { type: '3x', count: comboCounts['3x'], reward: '$500' },
    { type: '4x', count: comboCounts['4x'], reward: '$5K' }
  ]

  return (
    <div className="game-container">
      <StatusBar
        timeRemaining={timeRemaining}
        cycleNumber={cycleNumber}
        variant="piranha"
        rightContent={
          <span className="status-value status-value--balance">
            ${playerBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        }
      />
      
      <ProgressBar value={timeRemaining} max={10} variant="piranha" />
      
      <DigitDisplay
        label="YOUR ATTACK"
        digits={attackInput}
        variant="piranha"
        type="input"
      />
      
      <NumberPad
        currentInput={attackInput}
        onNumberClick={handleNumberClick}
      />
      
      <ActionButtons
        onClear={handleClear}
        onBackspace={handleBackspace}
        onRandomize={handleRandomize}
        onAttack={handleAttack}
        attackDisabled={attackInput.length !== 4}
      />
      
      <DigitDisplay
        label="LAST CRIT"
        digits={lastCritAttack}
        variant="piranha"
        type="crit"
      />
      
      <StatsGrid
        label="CYCLE HITS"
        items={comboItems}
        variant="piranha"
      />
    </div>
  )
}
