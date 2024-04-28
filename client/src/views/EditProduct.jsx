import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { userContext } from '../context/userContext'
import Nav from '../components/Nav'

const EditProduct = (props) => {
    const { id } = useParams()
    const { user, setUser } = useContext(userContext);
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        imgUrl: '',
        public_id: '',
        productName: '',
        productPrice: '',
        productStock: '',
    })
    const [preview, setPreview] = useState({
        imgUrl: '',
        public_id: '',
    });
    const [errors, setErrors] = useState([])


    useEffect(() => {
        axios.get('http://localhost:8000/api/user', { withCredentials: true })
            .then((res) => {
                // console.log(res);
                setUser(res.data)
                if (!res.data.isAdmin) {
                    navigate('/unauthorized')
                }
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
    }, [])


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
            formData.append('preview', preview.publicId)
        }
        axios.post(`http://localhost:8000/api/products/${id}`, formData)
            .then(res => {
                navigate('/products');
                console.log(res);
            })
            .catch(err => {
                console.log(err);
                if (err.response.data.errors){
                    setErrors(err.response.data.errors)
                }
            })
    }

    return (
        <>
            <Nav />
            <div className='main'> 
                <div className="container flex-col p-5 mx-auto">
                    <h2 className='text-4xl'>Edit Product</h2>
                    {
                        preview.imgUrl ?
                            <img style={{ width: '200px' }} loading='lazy' src={preview.imgUrl} alt={product.productName} /> :
                            <img style={{ width: '200px' }} loading='lazy' src={product.imgUrl} alt={product.productName} />
                    }
                    <form encType='multipart/form-data' onSubmit={submitHandler}>
                        <div className="flex flex-col justify-start">
                            <label className='text-xl' htmlFor="productName">Product Name</label>
                            <input className="input"
                                type="text"
                                name='productName'
                                onChange={(e) => changeHandler(e)}
                                value={product.productName}
                                />
                                {
                                errors.productName?
                                    <p className='text-red-600'>{errors.productName.message}</p>:null
                                }
                        </div>
                        <div className="flex flex-col justify-start">
                            <label className='text-xl' htmlFor="productPrice">Price ($)</label>
                            <input className="input"
                                type='number'
                                name='productPrice'
                                onChange={(e) => changeHandler(e)}
                                value={product.productPrice}
                            />
                            {
                                errors.productPrice?
                                <p className='text-red-600'>{errors.productPrice.message}</p>:null
                            }
                        </div>
                        <div className="flex flex-col justify-start">
                            <label className='text-xl' htmlFor="productStock">Amount</label>
                            <input className="input"
                                type="number"
                                name='productStock'
                                onChange={(e) => changeHandler(e)}
                                value={product.productStock}
                            />
                            {
                                errors.productStock?
                                <p className='text-red-600'>{errors.productStock.message}</p>:null
                            }
                        </div>
                        <div className="flex flex-col justify-start">
                            <label className='text-xl' htmlFor="img">Product Image</label>
                            <input className="input"
                                type="file"
                                name='img'
                                onChange={(e) => changeHandler(e)}
                            />
                        </div>
                        <input className="input rounded-full w-full mt-3" type="submit" value="update" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditProduct
    ;