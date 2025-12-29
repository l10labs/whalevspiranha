interface StatusBarProps {
  timeRemaining: number
  cycleNumber: number
  variant?: 'piranha' | 'whale'
  rightContent: React.ReactNode
}

export function StatusBar({ timeRemaining, cycleNumber, variant = 'piranha', rightContent }: StatusBarProps) {
  const isWhale = variant === 'whale'
  
  return (
    <header className={`status-bar ${isWhale ? 'status-bar--whale' : ''}`}>
      <div className="status-item status-item--left">
        <span className={`status-value status-value--timer ${isWhale ? 'status-value--timer-whale' : ''}`}>
          {timeRemaining}
        </span>
        <span className="status-label">SEC</span>
      </div>
      
      <div className="status-item">
        <span className="status-label">CYCLE</span>
        <span className="status-value status-value--cycle">#{cycleNumber}</span>
      </div>
      
      <div className="status-item status-item--right">
        {rightContent}
      </div>
    </header>
  )
}
