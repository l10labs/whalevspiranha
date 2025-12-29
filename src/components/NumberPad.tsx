interface NumberPadProps {
  currentInput: string
  maxDigits?: number
  onNumberClick: (num: number) => void
}

export function NumberPad({ currentInput, maxDigits = 4, onNumberClick }: NumberPadProps) {
  return (
    <section className="number-pad">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
        <button
          key={num}
          className="pad-btn"
          onClick={() => onNumberClick(num)}
          disabled={currentInput.length >= maxDigits || currentInput.includes(num.toString())}
        >
          {num}
        </button>
      ))}
    </section>
  )
}
