import { useState, useContext, useEffect } from 'react'
import Nav from '../components/Nav';
import { userContext } from '../context/userContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = (props) => {
    const {id} = useParams();
    const { user } = useContext(userContext);
    const [product, setProduct] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <>
            <Nav />
            <img src={product.imgUrl} alt={product.productName} />
            <h3>{product.productName}</h3>
            <p>Price: {product.productPrice}</p>
            <p>Stock: {product.productStock}</p>
            {
                user.isAdmin&&
                <div>
                    <button>edit</button>
                    <button>delete</button>
                </div>
            }
        </>
    )
}

export default ProductDetails;