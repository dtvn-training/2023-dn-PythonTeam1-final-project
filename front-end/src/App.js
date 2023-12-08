import Login from './Pages/LoginPage/Login';
import React, { useEffect, Suspense, lazy } from 'react';
// import Dashboard from './Pages/DashBoard/DashBoard';
import './App.css';
import Campaign from './Pages/Campaign/Campaign.jsx';
import Account from './Pages/Account/Account.jsx';
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { validateToken } from './redux/actions/authAction';
// import Loading from './Components/Loading/Loading.jsx';



const View = lazy(() => import('./Pages/View/View'));



function App() {
  const isLogged = useSelector((state) => state.auth.isLogged);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(validateToken())
  }, [])
  return (
    <Suspense fallback={""}>
      <BrowserRouter>
        <Routes>
          <Route path="/account" element={
            isLogged ?
              <View>
                <Campaign />
              </View>
              : <Navigate to="/login" />
          }
          />
          <Route
            path="/"
            element={
              isLogged ?
                <View>
                  <Campaign />
                </View>
                : <Navigate to="/login" />
            }
          />
          <Route path="/login"
            element={
              isLogged ? <Navigate to="/" /> : <Login />
            } />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
