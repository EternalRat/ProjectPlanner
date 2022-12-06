import { useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import apiClass from "../../utils/api.class";

export function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [cookies, setCookie] = useCookies(['token']);
    const [connected, setConnected] = useState<boolean>(false);
    require("./index.css");

    const login = async () => {
        apiClass.login({email, password}).then(({data}) => {
            Store.addNotification({
                title: "Successfully connected",
                message: "You will be redirected in 5 seconds",
                type: "success",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
            });
            setTimeout(() => {
                setCookie("token", data.token, {
                    expires: new Date(Date.now() + 21600000)
                });
                setConnected(true);
            }, 5000);
        }).catch((err) => {
            let msg;
            if (err.response) {
                switch (err.response.status) {
                    case 400:
                        switch (err.response.data.code) {
                            case 0x1:
                                msg = "You need to specify your email.";
                                break;
                            case 0x2:
                                msg = "You need to specify your password.";
                                break;
                            case 0x3:
                                msg = "You need to specify your email and password.";
                                break;
                            case 0x4:
                                msg = "Incorrect password."
                                break;
                            default:
                                break;
                        }
                        break;
                    case 401:
                        msg = "Please verify your account, you need to check your email.";
                        break;
                    case 403:
                        switch (err.response.data.code) {
                            case 0x1:
                                msg = "An error occured, please contact the administrator.";
                                break;
                            case 0x2:
                                msg = "Please verify your account, you need to check your email.";
                                break;
                            default:
                                break;
                        }
                        break;
                    case 404:
                        msg = "No user matches those credentials in our record.";
                        break;
                    default:
                        break;
                }
            }
            Store.addNotification({
                title: "Error",
                message: msg,
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
            });
        });
    }

    if (cookies.token || connected === true) {
        return <Navigate to="/dashboard" replace={true}></Navigate>
    }
    return <div className="app">
        <div className="body">
            <ReactNotifications />
            <div className="login-card">
                <div className="login">
                    <div className="login-field">
                        <div className="login-field-email">
                            <span>Your Email</span>
                            <input type="text" className="login-text" placeholder="Email" onChange={(e) => {
                                setEmail(e.target.value);
                            }}></input>
                        </div>
                        <div className="login-field-pwd">
                            <span>Your Password</span>
                            <input type="password" className="login-text" placeholder="Password" onChange={(e) => {
                                setPassword(e.target.value);
                            }}></input>
                        </div>
                        <div className="login-field-button">
                            <button className="login-button" onClick={login}>Login</button>
                            <button className="login-button" onClick={() => window.location.href = "/register"}>Register</button>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="login-lost-pwd">
                        <p>Forgot your email ? <a href="/forgot?type=email">Click here!</a></p>
                        <p>Forgot your password ? <a href="/forgot?type=password">Click here!</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export function Register() {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [confirmEmail, setConfirmEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);
    require("./index.css");

    const register = () => {
        if (email !== confirmEmail) {
            Store.addNotification({
                title: "Error",
                message: "Please check your email.",
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
            });
            return;
        }
        apiClass.register({username, email, password}).then(({data}) => {
            Store.addNotification({
                title: "Successfully registered",
                message: "You will be redirected in 5 seconds",
                type: "success",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
            });
            setTimeout(() => {
                setSuccess(true);
            }, 5000);
        }).catch((err) => {
            let msg;
            if (err.response) {
                switch (err.response.status) {
                    case 400:
                        switch (err.response.data.code) {
                            case 0x1:
                                msg = "You need to specify your email.";
                                break;
                            case 0x2:
                                msg = "You need to specify your password.";
                                break;
                            case 0x3:
                                msg = "You need to specify your username.";
                                break;
                            case 0x4:
                                msg = "You need to specify your username, email and password."
                                break;
                            default:
                                break;
                        }
                        break;
                    case 403:
                        switch (err.response.data.code) {
                            case 0x1:
                                msg = "Username already exists.";
                                break;
                            case 0x2:
                                msg = "Email already exists.";
                                break;
                            default:
                                break;
                        }
                        break;
                    default:
                        break;
                }
            }
            Store.addNotification({
                title: "Error",
                message: msg,
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
            });
        });
    }
    if (success === true)
        return <Navigate to="/login"></Navigate>;
    return <div className="app">
        <div className="body">
            <ReactNotifications />
            <div className="register-card">
                <div className="register">
                    <div className="register-field">
                        <div className="register-field-username">
                            <span>Your Username</span>
                            <input type="text" className="register-text" placeholder="Username" onChange={(e) => {
                                setUsername(e.target.value);
                            }}></input>
                        </div>
                        <div className="register-field-email">
                            <span>Your Email</span>
                            <input type="text" className="register-text" placeholder="Email" onChange={(e) => {
                                setEmail(e.target.value);
                            }}></input>
                        </div>
                        <div className="register-field-email">
                            <span>Confirm Your Email</span>
                            <input type="text" className="register-text" placeholder="Email" onChange={(e) => {
                                setConfirmEmail(e.target.value);
                            }}></input>
                        </div>
                        <div className="register-field-pwd">
                            <span>Your Password</span>
                            <input type="password" className="register-text" placeholder="Password" onChange={(e) => {
                                setPassword(e.target.value);
                            }}></input>
                        </div>
                        <div className="register-field-button">
                            <button className="register-button" onClick={register}>Register</button>
                            <button className="register-button" onClick={() => window.location.href = "/login"}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}