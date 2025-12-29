import { useState } from 'react'
import { Design1 } from './Design1'
import { Design2 } from './Design2'
import { Design3 } from './Design3'
import { Design4 } from './Design4'
import './App.css'

function App() {
  const [activeDesign, setActiveDesign] = useState<1 | 2 | 3 | 4>(1)

  return (
    <div className="app-wrapper">
      <div className="app-tabs">
        <button
          className={`tab ${activeDesign === 1 ? 'active' : ''}`}
          onClick={() => setActiveDesign(1)}
        >
          Neon Futuristic
        </button>
        <button
          className={`tab ${activeDesign === 2 ? 'active' : ''}`}
          onClick={() => setActiveDesign(2)}
        >
          Minimalist
        </button>
        <button
          className={`tab ${activeDesign === 3 ? 'active' : ''}`}
          onClick={() => setActiveDesign(3)}
        >
          Gaming Dashboard
        </button>
        <button
          className={`tab ${activeDesign === 4 ? 'active' : ''}`}
          onClick={() => setActiveDesign(4)}
        >
          Brutalist
        </button>
      </div>

      <div className="app-content">
        {activeDesign === 1 && <Design1 />}
        {activeDesign === 2 && <Design2 />}
        {activeDesign === 3 && <Design3 />}
        {activeDesign === 4 && <Design4 />}
      </div>
    </div>
  )
}

export default App
