import './designs/Design2.css'

export function Design2() {
  return (
    <div className="design2-container">
      <div className="design2-header">
        <h2>Piranha Player</h2>
        <span className="design2-status">Live</span>
      </div>

      <div className="design2-content">
        <div className="design2-section">
          <h3>Reserve Balance</h3>
          <div className="design2-balance">$450,250.00</div>
          <div className="design2-progress">
            <div className="design2-progress-fill" style={{ width: '78%' }}></div>
          </div>
          <p className="design2-note">78% of initial deposit remaining</p>
        </div>

        <div className="design2-stats">
          <div className="design2-stat-item">
            <span className="design2-stat-label">Cycle Progress</span>
            <span className="design2-stat-value">7/10s</span>
          </div>
          <div className="design2-stat-item">
            <span className="design2-stat-label">Active Attacks</span>
            <span className="design2-stat-value">142</span>
          </div>
          <div className="design2-stat-item">
            <span className="design2-stat-label">Total Winnings</span>
            <span className="design2-stat-value">$12,450</span>
          </div>
          <div className="design2-stat-item">
            <span className="design2-stat-label">Max Per Perm</span>
            <span className="design2-stat-value">40</span>
          </div>
        </div>

        <div className="design2-section">
          <h3>Latest Crit</h3>
          <div className="design2-crit">
            <span>2</span>
            <span>8</span>
            <span>7</span>
            <span>3</span>
          </div>
        </div>

        <div className="design2-section">
          <h3>Recent Winners</h3>
          <table className="design2-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Attack</th>
                <th>Reward</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>4x</strong></td>
                <td>2873</td>
                <td>$5,000</td>
              </tr>
              <tr>
                <td><strong>3x</strong></td>
                <td>2874</td>
                <td>$500</td>
              </tr>
              <tr>
                <td><strong>2x</strong></td>
                <td>2893</td>
                <td>$50</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
