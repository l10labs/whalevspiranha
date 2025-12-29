import './designs/Design7.css'

export function Design7() {
  return (
    <div className="design7-container">
      <div className="design7-header">
        <h1>ATTACK ARENA</h1>
        <div className="design7-status-badge">
          <div className="design7-pulse-dot"></div>
          ACTIVE
        </div>
      </div>

      <div className="design7-content">
        <div className="design7-hero-section">
          <div className="design7-label">Whale Reserve</div>
          <div className="design7-hero-value">$450,250.00</div>
          <div className="design7-hero-bar">
            <div className="design7-hero-fill" style={{ width: '78%' }}></div>
          </div>
        </div>

        <div className="design7-stat-grid">
          <div className="design7-stat-box stat-1">
            <div className="design7-stat-icon">⏰</div>
            <div className="design7-stat-label">Cycle</div>
            <div className="design7-stat-text">7s / 10s</div>
          </div>
          <div className="design7-stat-box stat-2">
            <div className="design7-stat-icon">🎯</div>
            <div className="design7-stat-label">Attacks</div>
            <div className="design7-stat-text">142</div>
          </div>
          <div className="design7-stat-box stat-3">
            <div className="design7-stat-icon">💎</div>
            <div className="design7-stat-label">Payouts</div>
            <div className="design7-stat-text">$12,450</div>
          </div>
          <div className="design7-stat-box stat-4">
            <div className="design7-stat-icon">⚡</div>
            <div className="design7-stat-label">Rate</div>
            <div className="design7-stat-text">10 / 10s</div>
          </div>
        </div>

        <div className="design7-attack-section">
          <div className="design7-label">Critical Strike</div>
          <div className="design7-attack-display">
            <span className="design7-attack-digit d1">2</span>
            <span className="design7-attack-digit d2">8</span>
            <span className="design7-attack-digit d3">7</span>
            <span className="design7-attack-digit d4">3</span>
          </div>
        </div>

        <div className="design7-combo-section">
          <div className="design7-label">Combo Rewards</div>
          <div className="design7-combo-cards">
            <div className="design7-combo-card combo-gold">
              <div className="design7-combo-rank">★★★★</div>
              <div className="design7-combo-level">4x Match</div>
              <div className="design7-combo-code">2873</div>
              <div className="design7-combo-earnings">+$5,000</div>
            </div>
            <div className="design7-combo-card combo-silver">
              <div className="design7-combo-rank">★★★</div>
              <div className="design7-combo-level">3x Match</div>
              <div className="design7-combo-code">2874</div>
              <div className="design7-combo-earnings">+$500</div>
            </div>
            <div className="design7-combo-card combo-bronze">
              <div className="design7-combo-rank">★★</div>
              <div className="design7-combo-level">2x Match</div>
              <div className="design7-combo-code">2893</div>
              <div className="design7-combo-earnings">+$50</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
