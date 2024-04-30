import { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { userContext } from '../context/userContext';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import breathe from '../assets/images/BeeBreathe.JPG';
import ramen from '../assets/images/Ramen.JPG'
import dog from '../assets/images/SleepDog.JPG'
import danie from '../assets/images/danie.jpg'


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
            <div className='flex lg:flex-row lg:justify-evenly lg:align-middle flex-col justify-center items-center py-40 -mt-20  w-full lg:h-4/6 xl:h-[100%] mb-[9.7rem]'>
                <h1 className='w-1/2 text-5xl md:text-6xl lg:text-7xl m-10 font-semibold'>Unleash your creativity with a sticker for every style</h1>
                <div className='flex flex-col text-center lg:text-start m-10'>
                    <p className='text-xl xl:text-2xl lg:m-2'>Ready to add some personality to your world? Start Decorating Today!</p>
                    <p className='text-xl xl:text-2xl lg:m-2'>Shop TheKneecaps today and let your creativity run wild!</p>
                    <Link to={'/products'} ><button className='button border-amber-500 text-2xl text-white font-semibold bg-amber-500 p-4'>BROWSE COLLECTION</button></Link>
                </div>
            </div>
            <div className='flex justify-center w-full gap-4 mx-auto px-5 bg-stone-800'>
                <div className='bg-white -my-16 max-w-sm 2xl:max-w-lg border border-stone-800 rounded p-3 z-10'>
                    <img src={breathe} alt="breathe sticker" />
                </div>
                <div className='bg-white -my-16 max-w-sm 2xl:max-w-lg border border-stone-800 rounded p-3 z-10'>
                    <img src={dog} alt="dog sticker" />
                </div>
                <div className='bg-white -my-16 max-w-sm 2xl:max-w-lg border border-stone-800 rounded p-3 z-10'>
                    <img src={ramen} alt="ramen sticker" />
                </div>
            </div>
            <div className='p-10 pt-40 xl:pt-36 w-full flex items-center gap-4 mx-auto px-5 bg-white/30 backdrop-blur-lg'>
                <div className='shadow-xl'>
                    <p className='text-xl xl:text-3xl bg-white rounded-xl py-20 pl-20 pr-28'>
                    Welcome to TheKneecaps! I'm Danie, the founder and creative force behind this space. From a young age, I've been captivated by the power of art to transport us beyond the everyday. As a self-taught artist, I've honed my craft through passion and perseverance, using creativity as a sanctuary from life's pressures. Join me on this journey as we explore the boundless possibilities of artistic expression together.
                    </p>
                </div>
                <div className='bg-stone-800 max-w-sm 2xl:max-w-lg border border-stone-800 rounded-full p-3 z-10 -ml-20 shadow-2xl'>
                    <img src={danie} className='rounded-full w-[90rem] h-[8rem] sm:h-[12rem] md:h-[18rem] lg:w-[120rem] xl:w-[150rem] xl:h-[30rem]' alt="artist's pic" />
                </div>
            </div>
        </>
    )
}

export default Hero;