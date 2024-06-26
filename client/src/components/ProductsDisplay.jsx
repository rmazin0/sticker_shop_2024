import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { userContext } from '../context/userContext'
import { cartContext } from '../context/cartContext'


const ProductsDisplay = (props) => {
    // const navigate = useNavigate()
    const { cartItems, setCartItems } = useContext(cartContext);
    const { user, setUser } = useContext(userContext);
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
    return (
        <>
            <h2 className='text-6xl text-center'>Products</h2>
            <div className="grid sm:grid-cols-2 2xl:grid-cols-4 p-5 gap-4 mx-auto text-black text-center">
                {
                    products.map((product) => (
                        <div key={product._id} className='shadow-xl rounded-xl flex flex-col justify-evenly items-center p-3'>
                            <Link to={`/product/${product._id}/details`}><img style={{ width: '200px' }} className='bg-white rounded-3xl shadow-2xl relative' loading='lazy' src={product.imgUrl} alt={product.productName} /></Link>
                            <div className='bg-neutral-200 w-full rounded-lg pt-20 -mt-20 pb-5' >
                                <Link to={`/product/${product._id}/details`}><h3 className='text-3xl hover:text-amber-500'>{product.productName}</h3></Link>
                                <p className='text-xl'>Price: ${product.productPrice}</p>
                                {
                                    window.localStorage.getItem('uuid') && user.isAdmin ?
                                        <p>{user.isAdmin}</p> :
                                        <button className='button border-amber-500 text-xl text-white bg-amber-500 px-4 hover:bg-white hover:text-amber-500 hover:border hover:border-amber-500'
                                            onClick={(e) => addToCartHandler(product._id)}>
                                            Add To Cart
                                            {
                                                cartItems[product._id] > 0 &&
                                                <span> ({cartItems[product._id]})</span>
                                            }
                                        </button>
                                }
                            </div>
                        </div>
                    ))
                }
            </div >
        </>
    )
}

export default ProductsDisplay;