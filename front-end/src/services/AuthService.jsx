import buildAPI from "../const/buildAPI";
import React from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { dispatchLogin, dispatchLogout } from "../redux/actions/authAction";

export const setToken = (token) => {
  localStorage.setItem("access_token", token);
};

export const getToken = () => {
  return localStorage.getItem("access_token");
};

export function validateToken() {
  buildAPI
    .get("auth/checkTokenExpired")
    .then((response) => {
      if (response.status === 200) {
      } else {
        console.log("false1");
        return false;
      }
    })
    .catch(function (error) {
      console.log(error, "error");
      return false;
      // if (error.response && error.response.status === 404) {
      //   alert("Invalid username or password. Please try again.");
      // } else {
      //   alert("Login failed. Please try again.");
      // }
    });
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
