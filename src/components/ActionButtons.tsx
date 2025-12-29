interface ActionButtonsProps {
  onClear: () => void
  onBackspace: () => void
  onRandomize: () => void
  onAttack: () => void
  attackDisabled: boolean
  attackCost?: string
}

export function ActionButtons({
  onClear,
  onBackspace,
  onRandomize,
  onAttack,
  attackDisabled,
  attackCost = '$10'
}: ActionButtonsProps) {
  return (
    <section className="action-row">
      <button className="action-btn" onClick={onClear}>CLR</button>
      <button className="action-btn" onClick={onBackspace}>DEL</button>
      <button className="action-btn" onClick={onRandomize}>RND</button>
      <button 
        className="action-btn action-btn--primary"
        onClick={onAttack}
        disabled={attackDisabled}
      >
        ATTACK {attackCost}
      </button>
    </section>
  )
}
