import buildAPI from "../const/buildAPI";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const setToken = (token) => {
  localStorage.setItem("access_token", token);
};

export const getToken = () => {
  return localStorage.getItem("access_token");
};

export function isAuth() {
  const token = getToken();
  if (!token) {
    return false;
  }

  buildAPI
    .get("auth/checkTokenExpired")
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
  let auth = getToken();
  let location = useLocation();
  const navigate_login = <Navigate to="/" state={{ from: location }} />;
  const navigate_current = children;
  if (!auth) {
    return navigate_login;
  }
  return navigate_current;
}
