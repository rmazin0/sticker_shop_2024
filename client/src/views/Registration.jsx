import { useState, useContext } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";
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
        adminPass: '',
    })
    const [errors, setErrors] = useState([])


    const registerHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', register, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setUser(res.data)
                setIdInLocal(res.data._id) //setting id in local storage
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
                    setErrors(err.response.data.errors);
            })
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
                    <h2 className='text-4xl' >Create an Account!</h2>
                    <form onSubmit={registerHandler} className="w-4/5">
                        <div className="flex justify-start">
                            <h2 className='text-xl'>Register as:</h2>
                            <div className="mx-5">
                                <label className="mx-5 text-xl" htmlFor="isAdmin">User</label>
                                <input
                                    type="radio"
                                    name="isAdmin"
                                    onChange={(e) => regChangeHandler(e)}
                                    value={false}
                                    defaultChecked={!register.isAdmin}
                                />
                                <label className='mx-5 text-xl' htmlFor="isAdmin">Admin</label>
                                <input
                                    type="radio"
                                    name="isAdmin"
                                    onChange={(e) => regChangeHandler(e)}
                                    value={true}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col justify-start">
                            <label className='text-xl' htmlFor="username">Username</label>
                            <input className="input"
                                type="text"
                                name="username"
                                onChange={(e) => regChangeHandler(e)}
                                value={register.username}
                            />
                            {
                                errors.username ?
                                    <p className='text-red-600'>{errors.username.message}</p> : null
                            }
                        </div>
                        <div className="flex flex-col justify-start">
                            <label className='text-xl' htmlFor="email">Email</label>
                            <input className="input"
                                type="text"
                                name="email"
                                onChange={(e) => regChangeHandler(e)}
                                value={register.email}
                            />
                            {
                                errors.email ?
                                    <p className='text-red-600'>{errors.email.message}</p> : null
                            }
                        </div>
                        <div className="flex flex-col justify-start">
                            <label className='text-xl' htmlFor="password">Password</label>
                            <input className="input"
                                type="password"
                                name="password"
                                onChange={(e) => regChangeHandler(e)}
                                value={register.password}
                            />
                            {
                                errors.password ?
                                    <p className='text-red-600'>{errors.password.message}</p> : null
                            }
                        </div>
                        <div className="flex flex-col justify-start">
                            <label className='text-xl' htmlFor="confirmPassword">Confirm Password</label>
                            <input className="input"
                                type="password"
                                name="confirmPassword"
                                onChange={(e) => regChangeHandler(e)}
                                value={register.confirmPassword}
                            />
                            {
                                errors.confirmPassword ?
                                    <p className='text-red-600'>{errors.confirmPassword.message}</p> : null
                            }
                        </div>
                        {
                            register.isAdmin === 'true' &&
                            <div className="flex flex-col justify-start">
                                <label className='text-xl' htmlFor="adminPass">Admin Pass</label>
                                <input className="input"
                                    type="password"
                                    name="adminPass"
                                    onChange={(e) => regChangeHandler(e)}
                                />
                                {
                                    errors.adminPass ?
                                        <p className='text-red-600'>{errors.adminPass.message}</p> : null
                                }
                            </div>
                        }
                        <input className="input rounded-full w-full mt-3" type="submit" value={"Sign up"} />
                    </form>
                    <p>Already have an account? <Link to={'/login'}><span className="text-blue-600 underline">Sign In</span></Link></p>
                </div>
            </div>
        </>
    )
}

export default Registration;