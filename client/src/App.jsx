import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom"

import './App.css'
import CreatePage from "./CreatePage"
import SolvePage from "./SolvePage"
import MyAccount from "./MyAccount"
import Header from "./Header"
import Home from "./Home"

function App() {
  const [user, setUser] = useState(null)

  useEffect(()=>{
    fetch('/api/check_session')
    .then(r =>{
      if(r.ok){
        return r.json()
      }
      else{
        return null
      }
    })
    .then(data => setUser(data))
  },[])



  
  return(
    <>
    <BrowserRouter>
    {user ?
    <>
    <Header />
    <Routes>
      <Route path='/home' element={<Home user={user} setUser={setUser}/>}/>
      <Route path='/create' element={<CreatePage user={user}/>}/>
      <Route path='/solve' element={<SolvePage />}/>
      <Route path='/myaccount' element={<MyAccount user={user} setUser={setUser} />}/>
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
    </>
    :
    <Routes>
      <Route path='/home' element={<Home user={user} setUser={setUser}/>}/>
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
    }
    </BrowserRouter>
    </>
  )
}
export default App
