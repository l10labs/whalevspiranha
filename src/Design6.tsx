import './designs/Design6.css'

export function Design6() {
  return (
    <div className="design6-container">
      <div className="design6-header">
        <h2>Game Dashboard</h2>
        <div className="design6-badge">RUNNING</div>
      </div>

      <div className="design6-main">
        <div className="design6-primary-card">
          <div className="design6-card-header">Reserve Status</div>
          <div className="design6-amount">$450,250</div>
          <div className="design6-gauge">
            <div className="design6-gauge-fill" style={{ width: '78%' }}></div>
          </div>
          <div className="design6-gauge-label">78% Full</div>
        </div>

        <div className="design6-metrics">
          <div className="design6-metric">
            <div className="design6-metric-top">
              <span className="design6-metric-label">Time Remaining</span>
              <span className="design6-metric-icon">⏱</span>
            </div>
            <div className="design6-metric-value">7s</div>
          </div>
          <div className="design6-metric">
            <div className="design6-metric-top">
              <span className="design6-metric-label">Active Attacks</span>
              <span className="design6-metric-icon">⚔</span>
            </div>
            <div className="design6-metric-value">142</div>
          </div>
          <div className="design6-metric">
            <div className="design6-metric-top">
              <span className="design6-metric-label">Total Winnings</span>
              <span className="design6-metric-icon">💰</span>
            </div>
            <div className="design6-metric-value">$12,450</div>
          </div>
          <div className="design6-metric">
            <div className="design6-metric-top">
              <span className="design6-metric-label">Rate</span>
              <span className="design6-metric-icon">📊</span>
            </div>
            <div className="design6-metric-value">10/s</div>
          </div>
        </div>

        <div className="design6-crit-card">
          <div className="design6-card-header">Winning Number</div>
          <div className="design6-digits-display">
            <span className="design6-digit">2</span>
            <span className="design6-digit">8</span>
            <span className="design6-digit">7</span>
            <span className="design6-digit">3</span>
          </div>
        </div>

        <div className="design6-winners-card">
          <div className="design6-card-header">Top Winners</div>
          <div className="design6-winners-list">
            <div className="design6-winner-row winner-4x">
              <span className="design6-winner-type">4x MATCH</span>
              <span className="design6-winner-code">2873</span>
              <span className="design6-winner-prize">+$5,000</span>
            </div>
            <div className="design6-winner-row winner-3x">
              <span className="design6-winner-type">3x MATCH</span>
              <span className="design6-winner-code">2874</span>
              <span className="design6-winner-prize">+$500</span>
            </div>
            <div className="design6-winner-row winner-2x">
              <span className="design6-winner-type">2x MATCH</span>
              <span className="design6-winner-code">2893</span>
              <span className="design6-winner-prize">+$50</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
