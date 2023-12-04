import Login from './Pages/LoginPage/Login';
import React, { } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import View from './Pages/View/View'
// import Dashboard from './Pages/DashBoard/DashBoard';
import Account from './Pages/Account/Account.jsx';
import Campaign from './Pages/Campaign/Campaign';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* <Route path="/" element={
          <View>
            <Dashboard />
          </View>
        } /> */}

        <Route path="/campaign" element={
          <View>
            <Campaign />
          </View>
        }
        />

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
