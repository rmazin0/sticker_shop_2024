import {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ProductsDisplay = (props) => {
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
            <div>
                {
                    products.map((product) => (
                        <div key={product._id}>
                            <img style={{width:'200px'}} src={product.img.imgUrl} alt={product.productName} />
                            <Link to={`/product/${product._id}/details`}><h3>{product.productName}</h3></Link>
                            <p>Price: ${product.productPrice}</p>
                            <p>Stock: {product.productStock} left</p>
                        </div>
                    ))
                }
            </div>
        </>
)}

export default ProductsDisplay;