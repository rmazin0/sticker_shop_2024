import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateProduct = (props) => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        imgUrl: '',
        productName: '',
        productPrice: undefined,
        productStock: undefined,
    })

    const changeHandler = (e) => {
        if (e.target.name === 'imgUrl') {
            setProduct({
                ...product,
                imgUrl: e.target.files[0]
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
        formData.append('imgUrl', product.imgUrl);
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
                        name='imgUrl'
                        onChange={(e) => changeHandler(e)}
                    />
                </div>
                <input type="submit" value="submit" />
            </form>
        </>
    )
}

export default CreateProduct;