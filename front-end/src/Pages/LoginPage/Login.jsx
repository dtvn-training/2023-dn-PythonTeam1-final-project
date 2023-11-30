import React, { useEffect, useState } from "react";
import "./Login.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setToken, validateToken } from "../../services/AuthService";
import { useDispatch } from "react-redux";
import { dispatchLogin, dispatchLogout } from "../../redux/actions/authAction";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageEmail, setMessageEmail] = useState("");
  const [messagePassword, setMessagePassword] = useState("");

  const dispatch = useDispatch();
  const handleEmailOnChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordOnChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOnClickLogin = (e) => {
    let flag = true;
    const regex = new RegExp(
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    if (regex.test(email)) setMessageEmail("");
    else {
      setMessageEmail("Email is Invalid");
      flag = false;
    }

    if (password === "") {
      setMessagePassword("Missing Password");
      flag = false;
    } else setMessagePassword("");

    if (flag) {
      axios
        .post("http://127.0.0.1:8000/auth/login", {
          email: email,
          password: password,
        })
        .then(function (response) {
          if (response.data.access_token) {
            dispatch(dispatchLogin());

            // console.log(dispatchLogin);
            setToken(response.data.access_token);
            navigate("/");
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
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Welcome</div>
      </div>

      <div className="login-input">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleEmailOnChange}
        ></input>
        {messageEmail ? (
          <span>*{messageEmail}</span>
        ) : (
          <span className="hide"></span>
        )}
      </div>

      <div className="login-input">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordOnChange}
        ></input>
        {messagePassword ? (
          <span>*{messagePassword}</span>
        ) : (
          <span className="hide"></span>
        )}
      </div>

      <button className="login-btn" onClick={handleOnClickLogin}>
        Login
      </button>

      <div className="alt-login">
        <div className="facebook"> Facebook </div>
        <div className="google"> Google </div>
      </div>
    </div>
  );
}
