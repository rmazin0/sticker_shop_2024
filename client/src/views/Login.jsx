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
                <div className="container flex-col mx-auto h-1/2 lg:h-[80%] lg:p-20 shadow-xl">
                    <h2 className='text-4xl'>Login to your account</h2>
                    {
                        error &&
                        <p className='text-red-600'>{error}</p>
                    }
                    <form onSubmit={loginHandler} className="w-4/5 h-1/2 flex flex-col justify-evenly">
                        <div className="flex flex-col justify-start">
                            <label className='text-xl' htmlFor="username">Username</label>
                            <input className="input"
                                type="text"
                                name="username"
                                id="username"
                                onChange={(e) => loginChangeHandler(e)}
                                value={login.username}
                            />
                        </div>
                        <div className="flex flex-col justify-start">
                            <label className='text-xl' htmlFor="password">Password</label>
                            <input className="input"
                                type="password"
                                name="password"
                                onChange={(e) => loginChangeHandler(e)}
                                value={login.password}
                            />
                        </div>
                        <input className="px-2 py-1 rounded-full w-full mt-3 text-white text-xl bg-amber-500 hover:bg-white hover:text-amber-500 hover:border hover:border-amber-500" type="submit" value={"Sign in"} />
                    </form>
                    <p>Don't have an account? <Link to={'/register'}><span className="text-blue-600 underline">Sign up</span></Link></p>
                </div>

        </>
    )
}

export default Login;