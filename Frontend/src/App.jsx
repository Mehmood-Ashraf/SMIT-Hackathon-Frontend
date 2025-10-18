import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/HomePage'
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
      </Routes>
    </>
  )
}

export default App
