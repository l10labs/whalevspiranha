import './designs/Design5.css'

export function Design5() {
  return (
    <div className="design5-container">
      <div className="design5-header">
        <h2>Piranha Control Center</h2>
        <div className="design5-status">
          <div className="design5-status-dot"></div>
          <span>Live</span>
        </div>
      </div>

      <div className="design5-content">
        <div className="design5-balance-card">
          <div className="design5-label">Reserve Balance</div>
          <div className="design5-value">$450,250.00</div>
          <div className="design5-progress">
            <div className="design5-progress-fill" style={{ width: '78%' }}></div>
          </div>
        </div>

        <div className="design5-grid">
          <div className="design5-stat-card">
            <div className="design5-stat-label">Cycle Time</div>
            <div className="design5-stat-value">7s / 10s</div>
          </div>
          <div className="design5-stat-card">
            <div className="design5-stat-label">Active Attacks</div>
            <div className="design5-stat-value">142</div>
          </div>
          <div className="design5-stat-card">
            <div className="design5-stat-label">Total Payouts</div>
            <div className="design5-stat-value">$12,450</div>
          </div>
          <div className="design5-stat-card">
            <div className="design5-stat-label">Attack Rate</div>
            <div className="design5-stat-value">10 / 10s</div>
          </div>
        </div>

        <div className="design5-crit-section">
          <div className="design5-label">Last Critical Attack</div>
          <div className="design5-crit-digits">
            <span className="design5-crit-digit">2</span>
            <span className="design5-crit-digit">8</span>
            <span className="design5-crit-digit">7</span>
            <span className="design5-crit-digit">3</span>
          </div>
        </div>

        <div className="design5-combos-section">
          <div className="design5-label">Recent Hits</div>
          <div className="design5-combo-list">
            <div className="design5-combo-item">
              <div className="design5-combo-badge">4x</div>
              <div className="design5-combo-code">2873</div>
              <div className="design5-combo-payout">+$5,000</div>
            </div>
            <div className="design5-combo-item">
              <div className="design5-combo-badge combo-3x">3x</div>
              <div className="design5-combo-code">2874</div>
              <div className="design5-combo-payout">+$500</div>
            </div>
            <div className="design5-combo-item">
              <div className="design5-combo-badge combo-2x">2x</div>
              <div className="design5-combo-code">2893</div>
              <div className="design5-combo-payout">+$50</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
