import { useEffect, useContext, useState } from 'react'
import { userContext } from '../context/userContext';
import axios from 'axios';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import logo from '../assets/images/Logo.PNG'
import { cartContext } from '../context/cartContext';
import { RxHamburgerMenu } from "react-icons/rx";
import { FaTimes } from "react-icons/fa";


const Nav = (props) => {
    const navigate = useNavigate()
    const { user, setUser } = useContext(userContext);
    const { cartQuantity } = useContext(cartContext);
    const [navBurger, setNavBurger] = useState(false)
    const [navBtn, setNavBtn] = useState(false)

    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true })
            .then((res) => {
                window.localStorage.removeItem('uuid') //removes user id when logging out
                navigate('/')
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const handleNavBurger = () => {
        setNavBurger(!navBurger)
    }

    const handleNavBtn = () => {
        setNavBtn(!navBtn)
    }

    return (
        <>
            <header className='flex justify-between items-center p-5 bg-black text-white text-xl'>
                <div className='w-1/2'>
                    <Link to={'/'}>
                        <img className='w-20 h029 caret-transparent mx-10' src={logo} alt="Store Logo" />
                    </Link>
                </div>
                <ul className='hidden lg:flex gap-6 items-center'>
                    {
                        user.isAdmin && window.localStorage.getItem('uuid') &&
                        <Link to={'/product/create'}><li className='hover:text-amber-500'>Add a product</li></Link>
                    }
                    <Link to={'/'}><li className='hover:text-amber-500' onClick={handleNavBtn}>Home</li></Link>
                    <NavLink to={'/products'}><li className='hover:text-amber-500'>Products</li></NavLink>
                    {
                        cartQuantity > 0 &&
                        (
                            <Link to={'/checkout'}>
                                <li className="border border-white rounded-full p-2 w-11 h-11 relative hover:border-amber-500 hover:text-amber-500">
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
                                </li>
                            </Link>
                        )
                    }
                    {
                        window.localStorage.getItem('uuid') ?
                            <li className='button--nav hover:text-amber-500 hover:border-amber-500 text-center ' onClick={logout}>Sign out</li> :
                            <>
                                <Link to={'/login'}><li className='hover:text-amber-500'>Sign in</li></Link>
                                <Link to={'/register'}><li className='button--nav hover:text-amber-500 hover:border-amber-500 text-center'>Sign up</li></Link>
                            </>
                    }
                </ul>
                <div className='lg:hidden cursor-pointer z-30' onClick={handleNavBurger}>
                    {
                        navBurger ?
                            <FaTimes size={25} /> :
                            <RxHamburgerMenu size={25} />
                    }
                </div>
            </header>
            <ul className={`${navBurger? 
            'text-white opacity-100 transform translate-x-0'
            : 'opacity-0 transform -translate-y-full'
                } transition-transform absolute top-0 left-0 w-full h-screen bg-stone-800/90 flex flex-col justify-center items-center text-2xl z-20 caret-transparent`}
                onClick={() => setNavBurger(false)}>
                {
                    user.isAdmin && window.localStorage.getItem('uuid') &&
                    <Link to={'/product/create'}><li className='p-5 hover:text-amber-500'>Add a product</li></Link>
                }
                <Link to={'/'}><li className='hover:text-amber-500'>Home</li></Link>
                <Link to={'/products'}><li className='p-5 hover:text-amber-500'>Products</li></Link>
                {
                    cartQuantity > 0 &&
                    (
                        <Link to={'/checkout'}
                        >
                            <li className='hover:text-amber-500'>
                                Cart ({cartQuantity})
                            </li>
                        </Link>
                    )
                }
                {
                    window.localStorage.getItem('uuid') ?
                        <li className='button--nav text-center hover:text-amber-500 hover:border-amber-500 mt-5' onClick={logout}>Sign out</li> :
                        <div>
                            <Link className='mr-4' to={'/login'}><li className='p-5 hover:text-amber-500'>Sign in</li></Link>
                            <Link to={'/register'}><li className='button--nav text-center hover:text-amber-500 hover:border-amber-500'>Sign up</li></Link>
                        </div>
                }
            </ul>
        </>
    )
}

export default Nav;