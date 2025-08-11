import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import ProtectedRoutes from './Components/ProtectedRoutes';
import Dashboard from './Pages/Dashboard';
import ForgotPassword from './Pages/ForgotPassword';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
