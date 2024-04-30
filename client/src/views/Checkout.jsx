import { useContext, useEffect, useState } from 'react'
import { cartContext } from '../context/cartContext'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Checkout = (props) => {
    const { cartItems, setCartItems,getSubTotalAmount } = useContext(cartContext)
    const [products, setProducts] = useState([])
    const totalAmount = getSubTotalAmount()

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
            <h1 className='text-6xl text-center'>Your Cart Items</h1>
            <div className='text-black flex flex-col'>
                <div className="grid sm:grid-cols-2 2xl:grid-cols-4 p-5 gap-4 mx-auto">
                    {
                        products.map((product) => (
                            <>
                                {
                                    cartItems[product._id] > 0 &&
                                    <div key={product._id} className='bg-white shadow-xl rounded-xl flex flex-col justify-evenly items-center p-3'>
                                        <img style={{ width: '200px' }} loading='lazy' src={product.imgUrl} alt={product.productName} />
                                        <Link to={`/product/${product._id}/details`}><h3 className='text-3xl'>{product.productName}</h3></Link>
                                        <div className="flex justify-evenly items-baseline">
                                            <button className='button border-amber-500 text-white bg-amber-500 px-2'
                                                onClick={(e) => removeFromCartHandler(product._id)}>
                                                -
                                            </button>
                                            <p className='text-xl'>Amount: {cartItems[product._id]}</p>
                                            <button className='button border-amber-500 text-white bg-amber-500 px-2'
                                                onClick={(e) => addToCartHandler(product._id)}>
                                                +
                                            </button>
                                        </div>
                                        <p className='text-xl'>Price: ${product.productPrice * cartItems[product._id]}</p>
                                    </div>
                                }
                            </>
                        ))
                    }
                </div>
                <div className='container mx-auto p-5 gap-10'>
                    <p className='text-xl'>Subtotal: ${totalAmount}</p>
                    <div className="gap-6">
                        <Link to={'/products'}><button className="px-3 py-2 rounded-full w-full mt-3 hover:text-white text-xl hover:bg-amber-500 bg-white text-amber-500 border border-amber-500">Continue Shopping</button></Link>
                        <Link to={'/home'}><button className="px-3 py-2 rounded-full w-full mt-3 text-white text-xl bg-amber-500 hover:bg-white hover:text-amber-500 hover:border hover:border-amber-500">Checkout</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout;