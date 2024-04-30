import { useNavigate, Link } from "react-router-dom";

const Unauthorized = (props) => {
    const navigate = useNavigate()


    return (
        <div className="container flex-col justify-evenly mx-auto h-3/4 lg:p-20 shadow-xl">
            <h1 className='text-6xl' >Unauthorized</h1>
            <div className="flex gap-6">
            <Link to={'/login'}><button className="px-3 py-2 rounded-full w-full mt-3 hover:text-white text-xl hover:bg-amber-500 bg-white text-amber-500 border border-amber-500">Sign in</button></Link>
            <Link to={'/register'}><button className="px-3 py-2 rounded-full w-full mt-3 text-white text-xl bg-amber-500 hover:bg-white hover:text-amber-500 hover:border hover:border-amber-500">Sign up</button></Link>
            </div>
        </div>
    )
}

export default Unauthorized;