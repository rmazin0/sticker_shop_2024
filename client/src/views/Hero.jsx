import { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { userContext } from '../context/userContext';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import breathe from '../assets/images/BeeBreathe.JPG';
import ramen from '../assets/images/Ramen.JPG'
import dog from '../assets/images/SleepDog.JPG'


const Hero = (props) => {
    const { user, setUser } = useContext(userContext)
    const navigate = useNavigate();


    useEffect(() => {
        if (window.localStorage.getItem('uuid')) {
            axios.get('http://localhost:8000/api/user', { withCredentials: true })
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
        <>
            <div className='bg-amber-100 h-screen'>
                <Nav />
                <div className='flex justify-evenly align-middle p-20 bg-white/30 backdrop-blur-lg mx-auto rounded-md'>
                    <h1 className='w-1/2 text-6xl m-10 font-semibold'>Unleash your creativity with a sticker for every style</h1>
                    <div className='flex flex-col m-10'>
                        <p className='text-xl'>Start Decorating Today! Ready to add some personality to your world? </p>
                        <p className='text-xl'>Shop TheKneecaps today and let your creativity run wild!</p>
                        <Link to={'/products'} ><button className='button border-amber-500 text-2xl text-white font-semibold bg-amber-500 p-4'>BROWSE COLLECTION</button></Link>
                    </div>
                </div>
                <div className='flex w-full mx-auto bg-stone-700'>
                    <div className='bg-white m-2 -mt-10 border border-stone-500 rounded p-3 z-10'>
                        <img className='w-200' src={breathe} alt="breathe sticker" />
                    </div>
                    <div className='bg-white m-2 -mt-10 border border-stone-500 rounded p-3 z-10'>
                        <img className='w-200' src={dog} alt="dog sticker" />
                    </div>
                    <div className='bg-white m-2 -mt-10 border border-stone-500 rounded p-3 z-10'>
                        <img className='w-200' src={ramen} alt="ramen sticker" />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Hero;