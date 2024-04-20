import {useContext, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext';

const Home = (props) => {
    const id = window.localStorage.getItem('uuid') //passes user id that is stored in localStorage of website
    const {user, setUser} = useContext(userContext)
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

    //getting a user from db with id from local storage
    useEffect(() => {
        axios.get('http://localhost:8000/api/user', {withCredentials:true})
            .then((res) => {
                // console.log(res);
                setUser(res.data)
                //if condition checks, redirect to admin page
                if (user.isAdmin) {
                    navigate('/admin/home')
                }
            })
            .catch((err) => {
                navigate('/unauthorized')
                console.log(err);
            })
    }, [])

    return (
        <div>
            <h2>Hello {user.username}</h2>
            <button onClick={logout}>Logout</button>
        </div>
)}

export default Home;