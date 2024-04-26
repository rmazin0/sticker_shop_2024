import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../context/userContext'


const ProductsDisplay = (props) => {
    const navigate = useNavigate()
    const {user, setUser} = useContext(userContext);
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/products')
            .then((res) => {
                setProducts(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    },[])

    return (
        <>
            <h2>Products</h2>
            <div className='w-full flex justify-evenly'>
                {
                    products.map((product) => (
                        <div key={product._id} className='border border-black flex flex-col justify-evenly items-center w-56'>
                            <img style={{width:'200px'}} loading='lazy' src={product.imgUrl} alt={product.productName} />
                            <Link to={`/product/${product._id}/details`}><h3>{product.productName}</h3></Link>
                            <p>Price: ${product.productPrice}</p>
                            <p>Stock: {product.productStock} left</p>
                            {
                                !user.isAdmin&&
                                <Link to={`/checkout`}><button className='button'>buy</button></Link>
                            }
                        </div>
                        
                    ))
                }
            </div>
        </>
)}

export default ProductsDisplay;