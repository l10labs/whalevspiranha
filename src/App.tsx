import { useState } from 'react'
import { PiranhaUI } from './PiranhaUI'
import { WhaleUI } from './WhaleUI'
import './App.css'

type PlayerRole = 'piranha' | 'whale'

function App() {
  const [activeRole, setActiveRole] = useState<PlayerRole>('piranha')

  return (
    <div className="app-wrapper">
      <nav className="app-tabs">
        <button 
          className={`tab tab--piranha ${activeRole === 'piranha' ? 'active' : ''}`}
          onClick={() => setActiveRole('piranha')}
        >
          PIRANHA
        </button>
        <button 
          className={`tab tab--whale ${activeRole === 'whale' ? 'active' : ''}`}
          onClick={() => setActiveRole('whale')}
        >
          WHALE
        </button>
      </nav>
      <div className="app-content">
        {activeRole === 'piranha' ? <PiranhaUI /> : <WhaleUI />}
      </div>
    </div>
  )
}

export default App
