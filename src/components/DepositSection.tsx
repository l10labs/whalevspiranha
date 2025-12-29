interface DepositSectionProps {
  depositAmount: string
  onDepositAmountChange: (value: string) => void
  onQuickDeposit: (amount: number) => void
  onDeposit: () => void
  minDeposit?: number
}

export function DepositSection({
  depositAmount,
  onDepositAmountChange,
  onQuickDeposit,
  onDeposit,
  minDeposit = 100000
}: DepositSectionProps) {
  const isValid = depositAmount && parseFloat(depositAmount) >= minDeposit
  
  return (
    <section className="deposit-section">
      <div className="deposit-label">ADD TO RESERVE</div>
      <div className="deposit-quick">
        <button className="quick-btn" onClick={() => onQuickDeposit(100000)}>$100K</button>
        <button className="quick-btn" onClick={() => onQuickDeposit(250000)}>$250K</button>
        <button className="quick-btn" onClick={() => onQuickDeposit(500000)}>$500K</button>
      </div>
      <div className="deposit-input-row">
        <span className="deposit-prefix">$</span>
        <input
          type="number"
          className="deposit-input"
          placeholder="100,000"
          value={depositAmount}
          onChange={(e) => onDepositAmountChange(e.target.value)}
          min={minDeposit}
          step={10000}
        />
      </div>
      <button 
        className="deposit-btn"
        onClick={onDeposit}
        disabled={!isValid}
      >
        DEPOSIT
      </button>
      <div className="deposit-min">MIN: ${minDeposit.toLocaleString()}</div>
    </section>
  )
}
