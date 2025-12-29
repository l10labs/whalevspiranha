interface ReserveDisplayProps {
  reserve: number
  sessionPnL: number
  sessionPnLPercent: string
  formatCurrency: (value: number, compact?: boolean) => string
}

export function ReserveDisplay({ reserve, sessionPnL, sessionPnLPercent, formatCurrency }: ReserveDisplayProps) {
  const isPositive = sessionPnL >= 0
  
  return (
    <section className="reserve-section">
      <div className="reserve-label">WHALE RESERVE</div>
      <div className="reserve-value">{formatCurrency(reserve)}</div>
      <span className={`reserve-indicator ${isPositive ? 'reserve-indicator--up' : 'reserve-indicator--down'}`}>
        {isPositive ? '+' : ''}{formatCurrency(sessionPnL, true)} ({sessionPnLPercent}%)
      </span>
    </section>
  )
}
