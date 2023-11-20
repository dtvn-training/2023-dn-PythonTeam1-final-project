import './App.css';

import DashBoard from './Components/DashBoard'
import { RequireToken } from './services/AuthService'
import Login from './Components/Login';

import React, { } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (

    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <RequireToken>
              <DashBoard />
            </RequireToken>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
