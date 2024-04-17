import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = (props) => {
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
    })

    const loginHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', login, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                navigate('/home')
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const registerHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', register, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                navigate('/home')
            })
            .catch((err) => {
                console.log(err);
            })
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
                <input type="submit" value={"Register"} />
            </form>
        </>
    )
}

export default Login;