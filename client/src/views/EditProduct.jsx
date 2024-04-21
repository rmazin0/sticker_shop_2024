import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { userContext } from '../context/userContext'

const EditProduct= (props) => {
    const {id} = useParams()
    const {user, setUser} = useContext(userContext);
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        img: {
            imgUrl:'',
            public_id: '',
        },
        productName: '',
        productPrice: '',
        productStock: '',
    })
    const [preview, setPreview] = useState({
        imgUrl: '',
        public_id: '',
    });

    useEffect(() => {
        axios.get('http://localhost:8000/api/user', {withCredentials:true})
            .then((res) => {
                // console.log(res);
                setUser(res.data)
            })
            .catch((err) => {
                navigate('/unauthorized')
                console.log(err);
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then((res) => {
                setProduct(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    },[])


    const changeHandler = (e) => {
        if (e.target.name === 'img') {
            const formData = new FormData()
            formData.append('img', e.target.files[0])
            axios.post('http://localhost:8000/api/preview', formData)
                .then((res) => {
                    setPreview(res.data)
                })
                .catch((err) => {
                    console.log(err);
                })
            setProduct({
                ...product,
                img: e.target.files[0]
            })
            console.log(preview.imgUrl);
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
        if (preview) {
            formData.append('preview', preview.public_id)
        }
        axios.post(`http://localhost:8000/api/products/${id}`, formData)
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
            <h2>Edit Product</h2>
            {
                preview.imgUrl?
                <img style={{width:'200px'}} src={preview.imgUrl} alt={product.productName}/>:
                <img style={{width:'200px'}} src={product.img.imgUrl} alt={product.productName}/>
            }
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
                <input type="submit" value="update" />
            </form>
        </>
    )
}

export default EditProduct
;