interface StatsItem {
  type: string
  count: number
  reward: string
}

interface StatsGridProps {
  label: string
  items: StatsItem[]
  variant?: 'piranha' | 'whale'
  showNegative?: boolean
}

export function StatsGrid({ label, items, variant = 'piranha', showNegative = false }: StatsGridProps) {
  const isWhale = variant === 'whale'
  
  return (
    <section className={`stats-section ${isWhale ? 'stats-section--whale' : ''}`}>
      <div className={`stats-label ${isWhale ? 'stats-label--whale' : ''}`}>{label}</div>
      <div className="stats-grid">
        {items.map(item => (
          <div key={item.type} className={`stat-card ${isWhale ? 'stat-card--whale' : ''}`}>
            <span className={`stat-type ${isWhale ? 'stat-type--whale' : ''}`}>{item.type}</span>
            <span className={`stat-count ${isWhale ? 'stat-count--whale' : ''}`}>{item.count}</span>
            <span className={`stat-reward ${showNegative ? 'stat-reward--negative' : ''}`}>
              {showNegative ? '-' : ''}{item.reward}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
