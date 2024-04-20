import { useState, useContext } from "react";
import axios from 'axios';
import { redirect, useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";

const LoginAndReg = (props) => {
    const { user, setUser, setIdInLocal } = useContext(userContext) //user context gives access to user state, setting id in local storage function
    const navigate = useNavigate()
    const [login, setLogin] = useState({
        username: '',
        password: ''
    })
    const [register, setRegister] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        isAdmin: false,
    })
    const [adminPass, setAdminPass] = useState('')
    const secretPass = 'zxcasdqwe'

    const loginHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', login, { withCredentials: true })
            .then((res) => {
                // console.log(res.data);
                setUser(res.data)
                setIdInLocal(res.data._id) //setting id in local storage
                // console.log(res.data._id);
                navigate('/home')
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const registerHandler = (e) => {
        e.preventDefault();
        //checks if user is trying to register as admin and if admin pass id correct
        if (register.isAdmin && adminPass !== secretPass) {
            navigate('/unauthorized')
        } else {
            axios.post('http://localhost:8000/api/register', register, { withCredentials: true })
                .then((res) => {
                    console.log(res.data);
                    setUser(res.data)
                    setIdInLocal(res.data._id) //setting id in local storage
                    navigate('/home')
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    const loginChangeHandler = (e) => {
        setLogin((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.value
        }))
    }
    const regChangeHandler = (e) => {
        setRegister((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <>
            <h2>Login</h2>
            <form onSubmit={loginHandler}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        onChange={(e) => loginChangeHandler(e)}
                        value={login.username}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        onChange={(e) => loginChangeHandler(e)}
                        value={login.password}
                    />
                </div>
                <input type="submit" value={"Login"} />
            </form>

            <h2>Register</h2>
            <form onSubmit={registerHandler}>
                <div>
                    <label htmlFor="isAdmin">User</label>
                    <input
                        type="radio"
                        name="isAdmin"
                        onChange={(e) => regChangeHandler(e)}
                        value={false}
                        defaultChecked={!register.isAdmin}
                    />
                    <label htmlFor="isAdmin">Admin</label>
                    <input
                        type="radio"
                        name="isAdmin"
                        onChange={(e) => regChangeHandler(e)}
                        value={true}
                    />
                </div>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        onChange={(e) => regChangeHandler(e)}
                        value={register.username}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        name="email"
                        onChange={(e) => regChangeHandler(e)}
                        value={register.email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        onChange={(e) => regChangeHandler(e)}
                        value={register.password}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        onChange={(e) => regChangeHandler(e)}
                        value={register.confirmPassword}
                    />
                </div>
                {
                    register.isAdmin === 'true' &&
                    <div>
                        <label htmlFor="adminPass">Admin Pass:</label>
                        <input
                            type="password"
                            name="adminPass"
                            onChange={(e) => setAdminPass(e.target.value)}
                        />
                    </div>
                }
                <input type="submit" value={"Register"} />
            </form>
        </>
    )
}

export default LoginAndReg;