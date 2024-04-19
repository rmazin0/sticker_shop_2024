import {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
    const navigate = useNavigate();

    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials:true})
            .then((res) => {
                navigate('/')
            })
            .catch((err) => {
                console.error(err);
            })
    }

    return (
        <div>
            <h2>Home</h2>
            <button onClick={logout}>Logout</button>
        </div>
)}

export default Home;