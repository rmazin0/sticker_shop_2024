import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../context/userContext'
import Nav from '../components/Nav'

const CreateProduct = (props) => {
    const { user, setUser } = useContext(userContext);
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        img: '',
        productName: '',
        productPrice: '',
        productStock: '',
    })

    useEffect(() => {
        axios.get('http://localhost:8000/api/user', { withCredentials: true })
            .then((res) => {
                // console.log(res);
                setUser(res.data)
                if (!user.isAdmin) {
                    navigate('/unauthorized')
                }
            })
            .catch((err) => {
                navigate('/unauthorized')
                console.log(err);
            })
    }, [])

    const changeHandler = (e) => {
        if (e.target.name === 'img') {
            setProduct({
                ...product,
                img: e.target.files[0]
            })
        } else {
            setProduct({
                ...product,
                [e.target.name]: e.target.value
            })
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('productName', product.productName);
        formData.append('productPrice', product.productPrice);
        formData.append('productStock', product.productStock);
        formData.append('img', product.img);
        axios.post('http://localhost:8000/api/products', formData)
            .then(res => {
                navigate('/home');
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <Nav />
            <div className="main">
                <div>
                    <h2>Add a Product</h2>
                    <form encType='multipart/form-data' onSubmit={submitHandler}>
                        <div>
                            <label htmlFor="productName">Product Name</label>
                            <input
                                type="text"
                                name='productName'
                                onChange={(e) => changeHandler(e)}
                                value={product.productName}
                            />
                        </div>
                        <div>
                            <label htmlFor="productPrice">Price</label>
                            <input
                                type='number'
                                name='productPrice'
                                onChange={(e) => changeHandler(e)}
                                value={product.productPrice}
                            />
                        </div>
                        <div>
                            <label htmlFor="productStock">Amount</label>
                            <input
                                type="number"
                                name='productStock'
                                onChange={(e) => changeHandler(e)}
                                value={product.productStock}
                            />
                        </div>
                        <div>
                            <label htmlFor="imgUrl">Product Image</label>
                            <input
                                type="file"
                                name='img'
                                onChange={(e) => changeHandler(e)}
                            />
                        </div>
                        <input type="submit" value="submit" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateProduct;