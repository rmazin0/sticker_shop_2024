import { useNavigate } from "react-router-dom";

const Unauthorized = (props) => {
    const navigate = useNavigate()

    const btnHandler = () => {
        navigate('/')
    }

    return (
        <div>
            <h1>Unauthorized</h1>
            <button onClick={btnHandler}>login/register</button>
        </div>
    )
}

export default Unauthorized;