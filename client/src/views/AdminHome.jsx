import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../context/userContext';

const AdminHome = (props) => {
    const navigate = useNavigate();
    const {user, setUser} = useContext(userContext)


    useEffect(() => {
        axios.get('http://localhost:8000/api/user', {withCredentials:true})
            .then((res) => {
                // console.log(res);
                setUser(res.data)
            })
            .catch((err) => {
                navigate('/unauthorized')
                console.log(err);
            })
    }, [])

    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials:true})
            .then((res) => {
                navigate('/')
                window.localStorage.removeItem('uuid') //removes user id when logging out
            })
            .catch((err) => {
                console.error(err);
            })
    }
    return (
        <div>
            <h1>Hello Admin {user.username}!</h1>
            <button onClick={logout}>logout</button>
        </div>
)}

export default AdminHome;