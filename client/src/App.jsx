import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EVChargingLanding from './Pages/EVLanding'
import EVChargingDashboard from './Pages/EVDashboard'
 
function App() {
  return (
    <Router>
      <div>
        <Routes>
      
          <Route path="/" element={< EVChargingLanding/>} />
           <Route path="/Dashboard" element={< EVChargingDashboard/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
