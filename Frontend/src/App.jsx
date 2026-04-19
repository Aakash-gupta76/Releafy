
import React from 'react'
import Navbar from './Components/Navbar/Navbar'

import Mainbody from './Components/MainBody/Mainbody'
import Home from './pages/Home'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Features from './pages/Features'
import About from './pages/About'
import AIFeatures from './pages/AIFeatures';
import Contact from './pages/Contact';
import ProtectedRoute from './Components/Auth/ProtectedRoute';

const App = () => {
  return (
    <>
    <BrowserRouter>
    
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/features' element={
        <ProtectedRoute>
          <Features />
        </ProtectedRoute>
      } />
      <Route path='/about' element={<About />} />
      <Route path="/ai-features" element={
        <ProtectedRoute>
          <AIFeatures />
        </ProtectedRoute>
      } />
      <Route path="/contact" element={<Contact />} />
     </Routes>
    
    


    
    
    </BrowserRouter>
   
   
    
    
    
    
    
    </>
  )
}

export default App