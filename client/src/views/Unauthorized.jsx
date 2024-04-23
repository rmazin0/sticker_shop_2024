import { useNavigate, Link } from "react-router-dom";

const Unauthorized = (props) => {
    const navigate = useNavigate()


    return (
        <div>
            <h1>Unauthorized</h1>
            <Link to={'/register'}><button>Sign up</button></Link>
            <Link to={'/login'}><button>Sign in</button></Link>
        </div>
    )
}

export default Unauthorized;