import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
// import ProtectedRoutes from './Components/ProtectedRoutes';
// import Dashboard from './Pages/Dashboard.jsx';
import ForgotPassword from './Pages/ForgotPassword';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
// import ProtectedRoutes from './Pages/ProtectedRoutes';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        {/* <Route path='/' element={<Dashboard/>}/> */}
        {/* <Route element={<ProtectedRoutes />}>
          <Route path='/home' element={<Home />} />
        </Route> */}
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </Router>
  );
};

export default App;
