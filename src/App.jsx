import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
const App = () => {
  return (
  <>
    <Router>
      <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </Router>
  </>
  )
}

export default App
