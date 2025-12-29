interface DigitDisplayProps {
  label: string
  digits: string
  slots?: number
  variant?: 'piranha' | 'whale'
  type?: 'input' | 'crit'
}

export function DigitDisplay({ 
  label, 
  digits, 
  slots = 4, 
  variant = 'piranha',
  type = 'input'
}: DigitDisplayProps) {
  const isWhale = variant === 'whale'
  const isCrit = type === 'crit'
  
  const labelClass = isCrit 
    ? `digit-label digit-label--crit${isWhale ? '-whale' : ''}`
    : `digit-label ${isWhale ? 'digit-label--whale' : ''}`
  
  const getBoxClass = (hasDigit: boolean) => {
    let cls = 'digit-box'
    if (isCrit) {
      cls += ` digit-box--small digit-box--crit${isWhale ? '-whale' : ''}`
    } else if (hasDigit) {
      cls += ' digit-box--active'
    }
    return cls
  }
  
  return (
    <section className={`digit-section ${isWhale ? 'digit-section--whale' : ''}`}>
      <div className={labelClass}>{label}</div>
      <div className="digit-row">
        {Array.from({ length: slots }).map((_, i) => (
          <div key={i} className={getBoxClass(!!digits[i])}>
            {digits[i] || '_'}
          </div>
        ))}
      </div>
    </section>
  )
}
