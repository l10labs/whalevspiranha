interface ProgressBarProps {
  value: number
  max: number
  variant?: 'piranha' | 'whale'
}

export function ProgressBar({ value, max, variant = 'piranha' }: ProgressBarProps) {
  const percentage = (value / max) * 100
  const isWhale = variant === 'whale'
  
  return (
    <div className={`progress-bar ${isWhale ? 'progress-bar--whale' : ''}`}>
      <div 
        className={`progress-fill ${isWhale ? 'progress-fill--whale' : ''}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}
