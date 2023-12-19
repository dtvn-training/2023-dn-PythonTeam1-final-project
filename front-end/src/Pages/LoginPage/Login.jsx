import React, { useState } from "react";

import buildAPI from "../../const/buildAPI";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../services/AuthService";
import "./Login.scss";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageEmail, setMessageEmail] = useState("");
  const [messagePassword, setMessagePassword] = useState("");

  const handleEmailOnChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordOnChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOnClickLogin = (e) => {
    let flag = true;
    const regex = new RegExp(
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
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
      buildAPI
        .post("/auth/login", {
          email: email,
          password: password,
        })
        .then(function (response) {
          if (response.data.access_token) {
            setToken(response.data.access_token);
            navigate("/campaign");
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
