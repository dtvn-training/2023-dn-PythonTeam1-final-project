import Login from './Pages/LoginPage/Login';
import React, { } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import View from './Pages/View/View'
import Dashboard from './Pages/DashBoard/DashBoard';
import Account from './Pages/Account/Account';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login
        " element={<Login />} />
        <Route path="/" element={
          <View>
            <Dashboard />
          </View>
        } />
        <Route path="/account" element={
          <View>
            <Account />
          </View>
        }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
