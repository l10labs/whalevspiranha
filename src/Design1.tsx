import './designs/Design1.css'

export function Design1() {
  return (
    <div className="design1-container">
      <div className="design1-header">
        <h2>PIRANHA ATTACK PROTOCOL</h2>
        <div className="design1-status">● ACTIVE</div>
      </div>

      <div className="design1-content">
        <div className="design1-section">
          <div className="design1-label">WHALE RESERVE</div>
          <div className="design1-value">$450,250.00</div>
          <div className="design1-bar">
            <div className="design1-fill" style={{ width: '78%' }}></div>
          </div>
        </div>

        <div className="design1-grid">
          <div className="design1-card">
            <div className="design1-card-title">CURRENT CYCLE</div>
            <div className="design1-card-value">7s / 10s</div>
          </div>
          <div className="design1-card">
            <div className="design1-card-title">ACTIVE ATTACKS</div>
            <div className="design1-card-value">142</div>
          </div>
          <div className="design1-card">
            <div className="design1-card-title">TOTAL PAYOUTS</div>
            <div className="design1-card-value">$12,450</div>
          </div>
          <div className="design1-card">
            <div className="design1-card-title">CYCLE RATE</div>
            <div className="design1-card-value">10 / 10s</div>
          </div>
        </div>

        <div className="design1-section">
          <div className="design1-label">LAST CRIT ATTACK</div>
          <div className="design1-attack">
            <span className="design1-digit">2</span>
            <span className="design1-digit">8</span>
            <span className="design1-digit">7</span>
            <span className="design1-digit">3</span>
          </div>
        </div>

        <div className="design1-section">
          <div className="design1-label">TOP COMBOS THIS CYCLE</div>
          <div className="design1-combo-list">
            <div className="design1-combo">
              <span className="design1-combo-type">4x</span>
              <span>2873</span>
              <span className="design1-combo-reward">+$5,000</span>
            </div>
            <div className="design1-combo">
              <span className="design1-combo-type">3x</span>
              <span>2874</span>
              <span className="design1-combo-reward">+$500</span>
            </div>
            <div className="design1-combo">
              <span className="design1-combo-type">2x</span>
              <span>2893</span>
              <span className="design1-combo-reward">+$50</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
