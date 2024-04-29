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
            <div className='main'>
                <h2 className='text-5xl text-center'>Products</h2>
                <div className="container flex-col p-5 mx-auto">
                    {
                        products.map((product) => (
                            <div key={product._id} className='border border-stone-500 rounded flex flex-col justify-evenly items-center '>
                                <img style={{ width: '200px' }} loading='lazy' src={product.imgUrl} alt={product.productName} />
                                <Link to={`/product/${product._id}/details`}><h3 className='text-3xl'>{product.productName}</h3></Link>
                                <p className='text-xl'>Price: ${product.productPrice}</p>
                                <p className='text-xl'>Stock: {product.productStock} left</p>
                                {
                                    !user.isAdmin &&
                                    <button className='button border-amber-500 text-xl text-white bg-amber-500 px-4'
                                        onClick={(e) => addToCartHandler(product._id)}>
                                        Add To Cart
                                        {
                                            cartItems[product._id] > 0 &&
                                            <span> ({cartItems[product._id]})</span>
                                        }
                                    </button>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default ProductsDisplay;