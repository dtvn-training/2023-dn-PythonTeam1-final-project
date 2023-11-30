import './App.css';
import { useSelector, useDispatch } from "react-redux";
import DashBoard from './Components/DashBoard/DashBoard'
// import { validateToken } from './services/AuthService'
import Login from "./Pages/LoginPage/Login";
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { validateToken } from './redux/actions/authAction';

function App() {
  const token = useSelector((state) => state.token);
  const isLogged = useSelector((state) => state.auth.isLogged);
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(validateToken())
  }, [])

  return (

    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLogged ? <DashBoard /> : <Navigate to="/login" />
          }
        />
        <Route path="/login"
          element={
            isLogged ? <Navigate to="/" /> : <Login />
          } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
