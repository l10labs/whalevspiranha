import './designs/Design4.css'

export function Design4() {
  return (
    <div className="design4-container">
      <div className="design4-header">
        <div className="design4-logo-block">WHALE vs PIRANHA</div>
        <div className="design4-status-block">ACTIVE</div>
      </div>

      <div className="design4-content">
        <div className="design4-reserve-section">
          <div className="design4-reserve-label">RESERVE</div>
          <div className="design4-reserve-value">$450,250.00</div>
          <div className="design4-reserve-bar">
            <div className="design4-reserve-fill" style={{ width: '78%' }}></div>
          </div>
        </div>

        <div className="design4-grid">
          <div className="design4-block">
            <div className="design4-block-label">CYCLE</div>
            <div className="design4-block-value">7/10</div>
          </div>
          <div className="design4-block">
            <div className="design4-block-label">ATTACKS</div>
            <div className="design4-block-value">142</div>
          </div>
          <div className="design4-block">
            <div className="design4-block-label">PAYOUTS</div>
            <div className="design4-block-value">$12K</div>
          </div>
          <div className="design4-block">
            <div className="design4-block-label">MAX/PERM</div>
            <div className="design4-block-value">40</div>
          </div>
        </div>

        <div className="design4-crit-section">
          <div className="design4-crit-label">CRIT CODE</div>
          <div className="design4-crit-display">
            <div className="design4-crit-digit">2</div>
            <div className="design4-crit-digit">8</div>
            <div className="design4-crit-digit">7</div>
            <div className="design4-crit-digit">3</div>
          </div>
        </div>

        <div className="design4-winners-section">
          <div className="design4-winners-label">WINNERS</div>
          <div className="design4-winner-item design4-winner-gold">
            <div className="design4-winner-rank">1ST</div>
            <div className="design4-winner-combo">4X</div>
            <div className="design4-winner-code">2873</div>
            <div className="design4-winner-amount">$5,000</div>
          </div>
          <div className="design4-winner-item design4-winner-silver">
            <div className="design4-winner-rank">2ND</div>
            <div className="design4-winner-combo">3X</div>
            <div className="design4-winner-code">2874</div>
            <div className="design4-winner-amount">$500</div>
          </div>
          <div className="design4-winner-item design4-winner-bronze">
            <div className="design4-winner-rank">3RD</div>
            <div className="design4-winner-combo">2X</div>
            <div className="design4-winner-code">2893</div>
            <div className="design4-winner-amount">$50</div>
          </div>
        </div>

        <div className="design4-footer">
          <div className="design4-footer-item">ATTACK COST: $10</div>
          <div className="design4-footer-item">CYCLE: 10S</div>
          <div className="design4-footer-item">ACTIVE GAME</div>
        </div>
      </div>
    </div>
  )
}
