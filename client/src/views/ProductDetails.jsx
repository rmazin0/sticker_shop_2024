import { useState, useContext, useEffect } from 'react'
import Nav from '../components/Nav';
import { userContext } from '../context/userContext';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ProductDetails = (props) => {
    const { id } = useParams();
    const { user, setUser } = useContext(userContext);
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        imgUrl: '',
        public_id: '',
        productName: '',
        productPrice: '',
        productStock: '',
    })


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


    const deleteHandler = () => {
        axios.delete(`http://localhost:8000/api/products/${id}`)
            .then((res) => {
                navigate('/products')
            })
            .catch((err) => {
                console.log(err);
            })

    }
    return (
        <>
            <Nav />
            <div className='main'>
                <div className="container flex-col p-5 mx-auto">
                <img style={{ width: '200px' }} src={product.imgUrl} alt={product.productName} />
                <h3 className='text-3xl'>{product.productName}</h3>
                <p className='text-xl'>Price: ${product.productPrice}</p>
                <p className='text-xl'>Stock: {product.productStock}</p>
                {
                    user.isAdmin ?
                        <div className='w-28 flex justify-between'>
                            <Link to={`/product/${product._id}/edit`}><button className='button'>edit</button></Link>
                            <button className='button text-white bg-red-500 border-red-500' onClick={deleteHandler}>delete</button>
                        </div> :
                        <Link to={`/checkout/${product._id}`}><button>buy</button></Link>
                }
                </div>
            </div>
        </>
    )
}

export default ProductDetails;