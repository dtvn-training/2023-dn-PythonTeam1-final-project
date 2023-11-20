import React, { useState } from 'react'
import '../styles/Login.scss'

import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { setToken } from '../services/AuthService'

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        if (username.length === 0) {
            alert("Username cannot be Blank!");
        }
        else if (password.length === 0) {
            alert("Password cannot be Blank!");
        }
        else {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            axios.post('http://127.0.0.1:8000/login', formData)
                .then(function (response) {
                    console.log(response);
                    if (response.data.access_token) {
                        setToken(response.data.access_token)
                        navigate("/dashboard");
                    }
                })
                .catch(function (error) {
                    console.log(error, 'error');
                    if (error.response && error.response.status === 404) {
                        alert("Invalid username or password. Please try again.");
                    } else {
                        alert("Login failed. Please try again.");
                    }
                });
        }
    }

    return (
        <div className='container'>
            <div className="header">
                <div className="text">Welcome</div>
            </div>

            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="inputs">
                    <div className="input">
                        <input type="text" placeholder='Email' name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className="input">
                        <input type="password" placeholder='Password' name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>

                <input type="button" className="submit-container" name="submit" id="submit" value="Login" onClick={handleSubmit} />
            </form>

            <div className="login-options">
                <div className="facebook-option">
                    Facebook
                </div>

                <div className="google-option">
                    Google
                </div>
            </div>
        </div>
    )
}
