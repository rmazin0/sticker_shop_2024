import { useContext, useEffect, useState } from 'react'
import { cartContext } from '../context/cartContext'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Checkout = (props) => {
    const { cartItems, setCartItems } = useContext(cartContext)
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/products')
            .then((res) => {
                // console.log(res.data);
                setProducts(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const addToCartHandler = (id) => {
        setCartItems((prevValue) => ({
            ...prevValue,
            [id]: prevValue[id] + 1
        }))
    }

    const removeFromCartHandler = (id) => {
        setCartItems((prevValue) => ({
            ...prevValue,
            [id]: prevValue[id] - 1
        }))
    }

    return (
        <>
            <div className="main">
                <h1 className='text-5xl text-center'>Your Cart Items</h1>
                <div>
                    {
                        products.map((product) => (
                            <div key={product._id} className='rounded-xl bg-white grid grid-cols-3'>
                                {
                                    cartItems[product._id] > 0 &&
                                    <div className='border border-stone-500 rounded flex flex-col justify-evenly items-center '>
                                        <img style={{ width: '200px' }} loading='lazy' src={product.imgUrl} alt={product.productName} />
                                        <Link to={`/product/${product._id}/details`}><h3 className='text-3xl'>{product.productName}</h3></Link>
                                        <div className="flex justify-evenly items-baseline">
                                            <button className='button border-amber-500 text-white bg-amber-500 px-2'
                                                onClick={(e) => addToCartHandler(product._id)}>
                                                +
                                            </button>
                                            <p className='text-xl'>Amount: {cartItems[product._id]}</p>
                                            <button className='button border-amber-500 text-white bg-amber-500 px-2'
                                                onClick={(e) => removeFromCartHandler(product._id)}>
                                                -
                                            </button>
                                        </div>
                                        <p className='text-xl'>Price: ${product.productPrice * cartItems[product._id]}</p>
                                    </div>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Checkout;