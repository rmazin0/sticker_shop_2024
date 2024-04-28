import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../context/userContext'
import Nav from './Nav'


const ProductsDisplay = (props) => {
    const navigate = useNavigate()
    const { user, setUser } = useContext(userContext);
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/products')
            .then((res) => {
                setProducts(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <>
            <div className='main'>
                <h2 className='text-5xl text-center'>Products</h2>
                <div className="container flex-col p-5 mx-auto">
                    <div className='w-full flex justify-evenly'>
                        {
                            products.map((product) => (
                                <div key={product._id} className='border border-stone-500 rounded flex flex-col justify-evenly items-center w-56 p-3'>
                                    <img style={{ width: '200px' }} loading='lazy' src={product.imgUrl} alt={product.productName} />
                                    <Link to={`/product/${product._id}/details`}><h3 className='text-3xl'>{product.productName}</h3></Link>
                                    <p className='text-xl'>Price: ${product.productPrice}</p>
                                    <p className='text-xl'>Stock: {product.productStock} left</p>
                                    {
                                        !user.isAdmin &&
                                        <Link to={`/checkout/${product._id}`}><button className='button border-amber-500 text-xl text-white bg-amber-500 px-4'>Buy</button></Link>
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductsDisplay;