import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AdminHome = (props) => {
    const navigate = useNavigate();

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
            <h1>Hello Admin!</h1>
            <button onClick={logout}>logout</button>
        </div>
)}

export default AdminHome;