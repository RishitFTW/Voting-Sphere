import { useState } from 'react'
import './App.css'
import Signup from './appComponents/Signup'
import Login from './appComponents/Login'
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './appComponents/Home';



function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home/>} /> 
        <Route path="/" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
