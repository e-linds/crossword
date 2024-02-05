import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom"

import './App.css'
import CreatePage from "./CreatePage"
import SolvePage from "./SolvePage"
import MyAccount from "./MyAccount"
import Header from "./Header"
import Home from "./Home"
import CreateOptions from "./CreateOptions"
import SolveOptions from "./SolveOptions"

function App() {
  const [user, setUser] = useState(null)
  const [userPuzzles, setUserPuzzles] = useState([])
  const [UPAttempts, setUPAttempts] = useState([])

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

  useEffect(() => {

    if (user) {
      fetch('/api/puzzles')
      .then(r => r.json())
      .then(data => {
        let array = []
        for (const each in data) {
          if (data[each].user_id === user.id) {
            array.push(data[each])
          }
        }
        setUserPuzzles(array)
      })
  }
  }, [user])

  useEffect(() => {

    if (user) {
      fetch('/api/upattempts')
      .then(r => r.json())
      .then(data => {
        let array = []
        for (const each in data) {
          if (data[each].user_id === user.id) {
            array.push(data[each])
          }
        }
        setUPAttempts(array)
      })
  }
  }, [user])

  function deletePuzzle(id) {

    const puzzleToRemove = userPuzzles.find((each) => each.id === id)
    const index = userPuzzles.indexOf(puzzleToRemove)

    fetch(`/api/puzzles/${id}`, {
      method: "DELETE"
    })
    .then(r => {})
    .then(data => {

      let array = userPuzzles
      array.splice(index, 1)
      setUserPuzzles(array)
    })

  }


console.log(userPuzzles)
  
  return(
    <>
    <BrowserRouter>
    {user ?
    <>
    <Header />
    <Routes>
      <Route path='/home' element={<Home user={user} setUser={setUser}/>}/>
      <Route path='/create' element={<CreatePage user={user} userPuzzles={userPuzzles} setUserPuzzles={setUserPuzzles}/>}/>
      <Route path='/create/:puzzleid' element={<CreatePage user={user} userPuzzles={userPuzzles} setUserPuzzles={setUserPuzzles} deletePuzzle={deletePuzzle}/>}/>
      <Route path='/createoptions' element={<CreateOptions userPuzzles={userPuzzles} />}/>
      <Route path='/solveoptions' element={<SolveOptions userPuzzles={userPuzzles} UPAttempts={UPAttempts}/>}/>
      <Route path='/solve/:puzzleid' element={<SolvePage user={user} userPuzzles={userPuzzles} UPAttempts={UPAttempts}/>}/>
      <Route path='/myaccount' element={<MyAccount user={user} setUser={setUser} />}/>
      {/* <Route path="*" element={<Navigate to="/home" />} /> */}
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
