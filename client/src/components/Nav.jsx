import { useEffect, useContext } from 'react'
import { userContext } from '../context/userContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/images/Logo.PNG'

const Nav = (props) => {
    const navigate = useNavigate()
    const { user, setUser} = useContext(userContext)

    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
            .then((res) => {
                navigate('/')
                window.localStorage.removeItem('uuid') //removes user id when logging out
            })
            .catch((err) => {
                console.error(err);
            })
    }

    return (
        <div className='bg-neutral-900 w-full p-4'>
            <header className='flex justify-between items-center text-yellow-50'>
                <Link to={'/'} className='flex items-center'>
                    <img className='w-16 caret-transparent' src={logo} alt="Store Logo" />
                    <h1 className='text-4xl cursor-pointer caret-transparent'>thekneeecaps</h1>
                </Link>
                {
                    user.isAdmin && window.localStorage.getItem('uuid')&&
                    <Link to={'/product/create'}>Add a product</Link>
                }
                <Link to={'/home'}><button>Products</button></Link>
                {
                    window.localStorage.getItem('uuid')?
                        <button className='button--nav' onClick={logout}>Sign out</button> :
                        <div>
                            <Link className='mr-4' to={'/login'}><button>Sign in</button></Link>
                            <Link to={'/register'}><button className='button--nav'>Sign up</button></Link>
                        </div>
                }
            </header>
        </div>
    )
}

export default Nav;