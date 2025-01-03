import { useState } from 'react'
import './App.css'
import Signup from './appComponents/Signup'
import Login from './appComponents/Login'
import { BrowserRouter, Routes, Route } from "react-router";
import Profile from './appComponents/Profile';
import Navbar from './appComponents/Navbar';
import Leaderboards from './appComponents/Leaderboards';
import { Home } from 'lucide-react';
import Adminpanel from './appComponents/Adminpanel';




function App() {


  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/Leaderboards" element={<Leaderboards/>} /> 
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/Admin" element={<Adminpanel/>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
