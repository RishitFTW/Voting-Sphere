import { useState } from 'react'
import './App.css'
import Signup from './appComponents/Signup'
import Login from './appComponents/Login'
import { BrowserRouter, Routes, Route } from "react-router";
import Profile from './appComponents/Profile';
import Navbar from './appComponents/Navbar';
import Leaderboards from './appComponents/Leaderboards';
import Adminpanel from './appComponents/Adminpanel';
import Home from './appComponents/Home';




function App() {

  const [ Admin, setAdmin ]= useState(false);
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/Leaderboards" element={<Leaderboards/>} /> 
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Profile admin={Admin} setAdmin={setAdmin}/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/Admin" element={<Adminpanel admin={Admin} />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
