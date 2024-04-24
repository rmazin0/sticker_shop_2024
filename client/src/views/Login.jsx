import { useState, useContext } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { userContext } from "../context/userContext";
import Nav from "../components/Nav";

const Login = (props) => {
    const { user, setUser, setIdInLocal } = useContext(userContext) //user context gives access to user state, setting id in local storage function
    const navigate = useNavigate()
    const [login, setLogin] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState([])

    const loginHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', login, { withCredentials: true })
            .then((res) => {
                // console.log(res.data);
                setUser(res.data)
                setIdInLocal(res.data._id) //setting id in local storage
                // console.log(res.data._id);
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response.data.message);
                setError(err.response.data.message);
            })
    }

    const loginChangeHandler = (e) => {
        setLogin((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <>
            <Nav />
            <div className="main">
                <div className="container flex-col p-5 mx-auto">
                    <h2>Login</h2>
                    {
                        error&&
                        <p>{error}</p>
                    }
                    <form onSubmit={loginHandler} className="w-4/5">
                        <div className="flex flex-col justify-start">
                            <label htmlFor="username">Username</label>
                            
                            <input className="input"
                                type="text"
                                name="username"
                                id="username"
                                onChange={(e) => loginChangeHandler(e)}
                                value={login.username}
                            />

                        </div>
                        <div className="flex flex-col justify-start">
                            <label htmlFor="password">Password</label>
                            <input className="input"
                                type="password"
                                name="password"
                                onChange={(e) => loginChangeHandler(e)}
                                value={login.password}
                            />
                        </div>
                        <input className="input rounded-full w-full mt-3" type="submit" value={"Sign in"} />
                    </form>
                    <p>Don't have an account? <Link to={'/register'}>Sign Up</Link></p>
                </div>
            </div>
        </>
    )
}

export default Login;