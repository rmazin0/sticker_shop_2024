import {useContext, useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext';
import Nav from '../components/Nav';
import ProductsDisplay from '../components/ProductsDisplay';

const Home = (props) => {
    // const id = window.localStorage.getItem('uuid') //passes user id that is stored in localStorage of website
    const {user, setUser} = useContext(userContext)
    const navigate = useNavigate();

    //getting a user from db with id from local storage
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
    return (
        <div>
            <Nav/>
            {
                user.isAdmin?
                <h2>Hello Admin {user.username}</h2>:
                <h2>Hello {user.username}</h2>
            }
            <ProductsDisplay/>
        </div>
)}

export default Home;