import { useEffect, useContext } from 'react'
import { userContext } from '../context/userContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/images/Logo.PNG'
import { cartContext } from '../context/cartContext';

const Nav = (props) => {
    const navigate = useNavigate()
    const { user, setUser } = useContext(userContext);
    const { cartItems, cartQuantity } = useContext(cartContext);

    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true })
            .then((res) => {
                navigate('/')
                window.localStorage.removeItem('uuid') //removes user id when logging out
            })
            .catch((err) => {
                console.error(err);
            })
    }

    return (
        <>
            <div className='bg-neutral-900 w-full p-4'>
                <header className='flex justify-between items-center text-yellow-50 text-xl'>
                    <div className='w-1/2'>
                        <Link to={'/'} className='flex items-center'>
                            <img className='w-16 caret-transparent mx-10' src={logo} alt="Store Logo" />
                        </Link>
                    </div>
                    {
                        user.isAdmin && window.localStorage.getItem('uuid') &&
                        <Link to={'/product/create'} className=''>Add a product</Link>
                    }
                    <Link to={'/products'}><button>Products</button></Link>
                    {
                        cartQuantity > 0 &&
                        (
                            <Link to={'/checkout'}
                                className="border border-white rounded-full p-2 w-11 h-11 relative"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                    fill="currentColor"
                                >
                                    <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
                                </svg>

                                <div
                                    className="rounded-full bg-amber-500 flex justify-center items-center text-white w-6 h-6 absolute top-0 right-0 translate-x-2/4 -translate-y-1/3"
                                >
                                    {cartQuantity}
                                </div>
                            </Link>
                        )
                    }
                    {
                        window.localStorage.getItem('uuid') ?
                            <button className='button--nav mr-10' onClick={logout}>Sign out</button> :
                            <div className='mr-10'>
                                <Link className='mr-4' to={'/login'}><button>Sign in</button></Link>
                                <Link to={'/register'}><button className='button--nav'>Sign up</button></Link>
                            </div>
                    }
                </header>
            </div>
        </>
    )
}

export default Nav;