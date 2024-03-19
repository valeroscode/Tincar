import React, { useState } from 'react'
import Home from './Home'
import Finder from './Finder'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SavedCars from './SavedCars'
import Success from './Success'
import Careers from './Careers';
import Blog from './Blog';
import './App.css'

function App() {

  return (
    <>
      <Router>
        
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/Find" element={<Finder/>}></Route>
          <Route path="/Careers" element={<Careers/>}></Route>
          <Route path="/Blog" element={<Blog/>}></Route>
          <Route path="/Success" element={<Success/>}></Route>
        </Routes>
     
        </Router>
    </>
  )
}

export default App
