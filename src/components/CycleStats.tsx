interface CycleStatsProps {
  cycleAttacks: number
  totalPayout: number
  formatCurrency: (value: number, compact?: boolean) => string
}

export function CycleStats({ cycleAttacks, totalPayout, formatCurrency }: CycleStatsProps) {
  return (
    <section className="cycle-stats">
      <div className="cycle-stat">
        <span className="cycle-stat-label">ATTACKS</span>
        <span className="cycle-stat-value">{cycleAttacks.toLocaleString()}</span>
      </div>
      <div className="cycle-stat">
        <span className="cycle-stat-label">PAYOUTS</span>
        <span className="cycle-stat-value cycle-stat-value--negative">
          -{formatCurrency(totalPayout, true)}
        </span>
      </div>
    </section>
  )
}
