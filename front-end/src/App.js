import './App.css';
import { Navigate, createPath } from "react-router-dom";
import DashBoard from './Components/DashBoard/DashBoard'
import { CheckToken, isAuth } from './services/AuthService'
import Login from './Pages/LoginPage/Login';
import React, { } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <CheckToken>
              <DashBoard />
            </CheckToken>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
