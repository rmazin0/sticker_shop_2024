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
                // console.log(res.data);
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
            <div className='main'>
                <div className="container justify-evenly p-5 mx-auto">
                    <img className='w-[30%] md:w-1/3' src={product.imgUrl} alt={product.productName} />
                    <div className='h-full flex flex-col justify-evenly w-[30%] md:w-1/3'>
                        <h3 className='text-2xl lg:text-5xl'>{product.productName}</h3>
                        <p className='text-xl'>Price: ${product.productPrice}</p>
                        {
                            user.isAdmin ?
                                <div className='w-28 flex justify-between text-2xl w-[40%]'>
                                    <Link to={`/product/${product._id}/edit`}><button className='button px-3 py-2'>edit</button></Link>
                                    <button className='button text-white bg-red-500 border-red-500 px-3 py-2' onClick={deleteHandler}>delete</button>
                                </div> :
                                <Link to={`/checkout/${product._id}`}><button>buy</button></Link>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetails;