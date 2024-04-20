import {useState, useContext} from 'react'
import { userContext } from '../context/userContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Nav = (props) => {
    const navigate = useNavigate()
    const { user, setUser } = useContext(userContext)

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
            <header>
                <h1>Store Name</h1>
                <button onClick={logout}>Logout</button>
            </header>
        </div>
)}

export default Nav;