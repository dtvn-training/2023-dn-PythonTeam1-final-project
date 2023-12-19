import React, { useState } from "react";

import buildAPI from "../../const/buildAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../services/AuthService";
import "./Login.scss";
import { dispatchLogin } from "../../redux/actions/authAction";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageEmail, setMessageEmail] = useState("");
  const [messagePassword, setMessagePassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

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
      // eslint-disable-next-line no-useless-escape
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
      setButtonDisabled(true);
      buildAPI
        .post("/auth/login", {
          email: email,
          password: password,
        })
        .then(function (response) {
          if (response.data.access_token) {
            dispatch(dispatchLogin());

            toast.success("Login successfully.");
            setToken(response.data.access_token);
            navigate("/");
          }
        })
        .catch(function (error) {
          toast.error("Invalid username or password. Please try again.", {});
        })
        .finally(() => {
          setButtonDisabled(false);
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

      <button
        className="login-btn"
        onClick={handleOnClickLogin}
        disabled={buttonDisabled}
      >
        Login
      </button>

      <div className="alt-login">
        <div className="facebook"> Facebook </div>
        <div className="google"> Google </div>
      </div>
    </div>
  );
}
