import {useContext, useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext';
import Nav from '../components/Nav';

const Hero = (props) => {
    const {user, setUser} = useContext(userContext)
    const navigate = useNavigate();


    useEffect(() => {
        if (window.localStorage.getItem('uuid')) {
            axios.get('http://localhost:8000/api/user', {withCredentials:true})
                .then((res) => {
                    // console.log(res);
                    setUser(res.data)
                })
                .catch((err) => {
                    navigate('/unauthorized')
                    console.log(err);
                })
            }
        }, [])
        
    return (
        <div>
            <Nav/>
            Hero page
        </div>
)}

export default Hero;