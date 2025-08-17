import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EVChargingLanding from './Pages/EVLanding'
import EVChargingDashboard from './Pages/EVDashboard'
import EVDashboard from './components/EVDashboard'
function App() {
  return (
    <Router>
      <div>
        <Routes>
      
          <Route path="/" element={< EVChargingLanding/>} />
           <Route path="/Dashboard" element={< EVChargingDashboard/>} />
             <Route path="/Dashboard1" element={< EVDashboard/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
