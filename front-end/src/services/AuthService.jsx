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
