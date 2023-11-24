import axios from "axios";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const setToken = (token) => {
  localStorage.setItem("access_token", token);
};

export const fetchToken = () => {
  return localStorage.getItem("access_token");
};

export function isAuth() {
  const token = fetchToken();
  if (!token) {
    return false;
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  axios
    .get("http://127.0.0.1:8000/auth/checkTokenExpired", config)
    .then((response) => {
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch(function (error) {
      console.log(error, "error");
      if (error.response && error.response.status === 404) {
        alert("Invalid username or password. Please try again.");
      } else {
        alert("Login failed. Please try again.");
      }
    });
  return false;
}

export function CheckToken({ children }) {
  let auth = fetchToken();
  let location = useLocation();
  const navigate_login = <Navigate to="/" state={{ from: location }} />;
  const navigate_current = children;
  if (!auth) {
    return navigate_login;
  }
  return navigate_current;
}
