import React, { useState } from 'react'
import Home from './Home'
import Finder from './Finder'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SavedCars from './SavedCars'
import Success from './Success'

function App() {

  return (
    <>
      <Router>
        
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/Find" element={<Finder/>}></Route>
          <Route path="/Success" element={<Success/>}></Route>
        </Routes>
     
        </Router>
    </>
  )
}

export default App
