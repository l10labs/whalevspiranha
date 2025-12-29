import './designs/Design3.css'

export function Design3() {
  return (
    <div className="design3-container">
      <div className="design3-header">
        <div className="design3-title">WHALE vs PIRANHA</div>
        <div className="design3-game-status">
          <span className="design3-status-dot"></span>
          <span>Game Active</span>
        </div>
      </div>

      <div className="design3-content">
        <div className="design3-main-stat">
          <div className="design3-stat-box">
            <div className="design3-stat-label">Reserve Pool</div>
            <div className="design3-stat-amount">$450,250</div>
            <div className="design3-stat-subtext">Down from $575,000</div>
          </div>
        </div>

        <div className="design3-row">
          <div className="design3-card">
            <div className="design3-card-label">Cycle Time</div>
            <div className="design3-card-big">7s / 10s</div>
            <div className="design3-card-small">Resets in 3 seconds</div>
          </div>
          <div className="design3-card">
            <div className="design3-card-label">Attacks Pending</div>
            <div className="design3-card-big">142</div>
            <div className="design3-card-small">This cycle</div>
          </div>
          <div className="design3-card">
            <div className="design3-card-label">Payouts Released</div>
            <div className="design3-card-big">$12,450</div>
            <div className="design3-card-small">Total winnings</div>
          </div>
        </div>

        <div className="design3-section">
          <div className="design3-section-header">Current Crit Code</div>
          <div className="design3-code-display">
            <div className="design3-code-digit">2</div>
            <div className="design3-code-digit">8</div>
            <div className="design3-code-digit">7</div>
            <div className="design3-code-digit">3</div>
          </div>
        </div>

        <div className="design3-section">
          <div className="design3-section-header">Leaderboard</div>
          <div className="design3-leaderboard">
            <div className="design3-leader">
              <div className="design3-leader-rank">1st</div>
              <div className="design3-leader-info">
                <div className="design3-leader-combo">4x Combo</div>
                <div className="design3-leader-code">2873</div>
              </div>
              <div className="design3-leader-reward">$5,000</div>
            </div>
            <div className="design3-leader">
              <div className="design3-leader-rank">2nd</div>
              <div className="design3-leader-info">
                <div className="design3-leader-combo">3x Combo</div>
                <div className="design3-leader-code">2874</div>
              </div>
              <div className="design3-leader-reward">$500</div>
            </div>
            <div className="design3-leader">
              <div className="design3-leader-rank">3rd</div>
              <div className="design3-leader-info">
                <div className="design3-leader-combo">2x Combo</div>
                <div className="design3-leader-code">2893</div>
              </div>
              <div className="design3-leader-reward">$50</div>
            </div>
          </div>
        </div>

        <div className="design3-info-bar">
          <span>Max attacks per permutation: 40</span>
          <span>Attack cost: $10</span>
          <span>Cycle duration: 10 seconds</span>
        </div>
      </div>
    </div>
  )
}
