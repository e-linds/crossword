import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom"

import './App.css'
import CreatePage from "./CreatePage"
import SolvePage from "./SolvePage"
import MyAccount from "./MyAccount"
import Header from "./Header"

function App() {
  return(
    <>
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/create' element={<CreatePage/>}/>
      <Route path='/solve' element={<SolvePage />}/>
      <Route path='/myaccount' element={<MyAccount />}/>
    </Routes>
    </BrowserRouter>
      
    </>
  )
}
export default App
