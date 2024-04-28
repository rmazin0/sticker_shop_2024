import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { userContext } from '../context/userContext'
import { Link, useParams } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const Checkout = (props) => {
    const { id } = useParams();
    const { user, setUser } = useContext(userContext)
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

    return (
        <>
            <Nav />
            <div className='main'>
                <div className="container flex-col p-5 mx-auto">
                    <div>
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
                                <Link to={`/checkout`}><button>buy</button></Link>
                        }
                    </div>
                    <form>
                        <div className="flex flex-col justify-start">
                            <label className='text-xl' htmlFor="username">Username</label>
                            <input className="input"
                                type="text"
                                name="username"
                                id="username"
                                onChange={(e) => loginChangeHandler(e)}
                            />
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Checkout;