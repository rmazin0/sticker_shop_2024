import { useState, useContext, useEffect } from 'react'
import Nav from '../components/Nav';
import { userContext } from '../context/userContext';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ProductDetails = (props) => {
    const {id} = useParams();
    const { user, setUser} = useContext(userContext);
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        img: {
            imgUrl:'',
            public_id: '',
        },
        productName: '',
        productPrice: '',
        productStock: '',
    })

    useEffect(() => {
        axios.get('http://localhost:8000/api/user', {withCredentials:true})
            .then((res) => {
                // console.log(res);
                setUser(res.data)
            })
            .catch((err) => {
                navigate('/unauthorized')
                console.log(err);
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then((res) => {
                setProduct(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <>
            <Nav />
            <img style={{width:'200px'}} src={product.img.imgUrl} alt={product.productName} />
            <h3>{product.productName}</h3>
            <p>Price: {product.productPrice}</p>
            <p>Stock: {product.productStock}</p>
            {
                user.isAdmin&&
                <div>
                    <Link to={`/product/${product._id}/edit`}><button>edit</button></Link>
                    <button>delete</button>
                </div>
            }
        </>
    )
}

export default ProductDetails;