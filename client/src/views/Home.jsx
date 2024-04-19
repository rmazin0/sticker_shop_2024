import {useContext} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext';

const Home = (props) => {
    const {user, setUser} = useContext(userContext)
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
            <h2>Hello {user.username}</h2>
            <button onClick={logout}>Logout</button>
        </div>
)}

export default Home;