import { useState, useContext } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";
import logo from "../assets/images/store-logo.jpg";
import Nav from "../components/Nav";

const Registration = (props) => {
    const { user, setUser, setIdInLocal } = useContext(userContext) //user context gives access to user state, setting id in local storage function
    const navigate = useNavigate()
    const [register, setRegister] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        isAdmin: false,
    })
    const [adminPass, setAdminPass] = useState('')
    const secretPass = 'zxcasdqwe'


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
                    navigate('/')
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    const regChangeHandler = (e) => {
        setRegister((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <>
            <Nav />
            <div className="flex flex-col bg-stone-50 h-screen py-40">
                <div className="container flex-col p-5 mx-auto">
                    <h2>Create an Account!</h2>
                    <form onSubmit={registerHandler} className="w-4/5">
                        <div className="flex justify-start">
                            <h2>Register as:</h2>
                            <div className="mx-5">
                                <label className="mx-5" htmlFor="isAdmin">User</label>
                                <input
                                    type="radio"
                                    name="isAdmin"
                                    onChange={(e) => regChangeHandler(e)}
                                    value={false}
                                    defaultChecked={!register.isAdmin}
                                />
                                <label className="mx-5" htmlFor="isAdmin">Admin</label>
                                <input
                                    type="radio"
                                    name="isAdmin"
                                    onChange={(e) => regChangeHandler(e)}
                                    value={true}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col justify-start">
                            <label htmlFor="username">Username</label>
                            <input className="input"
                                type="text"
                                name="username"
                                onChange={(e) => regChangeHandler(e)}
                                value={register.username}
                            />
                        </div>
                        <div className="flex flex-col justify-start">
                            <label htmlFor="email">Email</label>
                            <input className="input"
                                type="text"
                                name="email"
                                onChange={(e) => regChangeHandler(e)}
                                value={register.email}
                            />
                        </div>
                        <div className="flex flex-col justify-start">
                            <label htmlFor="password">Password</label>
                            <input className="input"
                                type="password"
                                name="password"
                                onChange={(e) => regChangeHandler(e)}
                                value={register.password}
                            />
                        </div>
                        <div className="flex flex-col justify-start">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input className="input"
                                type="password"
                                name="confirmPassword"
                                onChange={(e) => regChangeHandler(e)}
                                value={register.confirmPassword}
                            />
                        </div>
                        {
                            register.isAdmin === 'true' &&
                            <div className="flex flex-col justify-start">
                                <label htmlFor="adminPass">Admin Pass</label>
                                <input className="input"
                                    type="password"
                                    name="adminPass"
                                    onChange={(e) => setAdminPass(e.target.value)}
                                />
                            </div>
                        }
                        <input className="input rounded-full w-full mt-3" type="submit" value={"Sign up"} />
                    </form>
                    <p>Already have an account? <Link to={'/login'}>Sign In</Link></p>
                </div>
            </div>
        </>
    )
}

export default Registration;