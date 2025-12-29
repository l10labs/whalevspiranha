import { useState } from 'react'
import { Design1 } from './Design1'
import { Design2 } from './Design2'
import { Design3 } from './Design3'
import { Design4 } from './Design4'
import { Design5 } from './Design5'
import { Design6 } from './Design6'
import { Design7 } from './Design7'
import { PiranhaUI } from './PiranhaUI'
import './App.css'

function App() {
  const [activeDesign, setActiveDesign] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>(1)

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
         <button
           className={`tab ${activeDesign === 5 ? 'active' : ''}`}
           onClick={() => setActiveDesign(5)}
         >
           Glassmorphism
         </button>
         <button
           className={`tab ${activeDesign === 6 ? 'active' : ''}`}
           onClick={() => setActiveDesign(6)}
         >
           Professional
         </button>
          <button
            className={`tab ${activeDesign === 7 ? 'active' : ''}`}
            onClick={() => setActiveDesign(7)}
          >
            Vibrant
          </button>
          <button
            className={`tab ${activeDesign === 8 ? 'active' : ''}`}
            onClick={() => setActiveDesign(8)}
          >
            Piranha UI
          </button>
        </div>

        <div className="app-content">
          {activeDesign === 1 && <Design1 />}
          {activeDesign === 2 && <Design2 />}
          {activeDesign === 3 && <Design3 />}
          {activeDesign === 4 && <Design4 />}
          {activeDesign === 5 && <Design5 />}
          {activeDesign === 6 && <Design6 />}
          {activeDesign === 7 && <Design7 />}
          {activeDesign === 8 && <PiranhaUI />}
        </div>
    </div>
  )
}

export default App
