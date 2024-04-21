import Product from "../models/product.model.js";
import cloudinary from 'cloudinary';
import streamifier from 'streamifier';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
//uploading image to cloudinary
const uploadToCloud = (file) => {
    return new Promise((resolve, reject) => {
        //upload_stream({folder_name, file_id}, callback)
        let cld_upload_stream = cloudinary.v2.uploader.upload_stream({folder: 'danie_products', product_id:file.originalname}, (error, result) => {
            if (result) {
                resolve(result);
                // console.log(result);
            } else {
                reject(error);
                console.log(error);
            }
        });
        //converts data type of file (buffer) to (string)
        streamifier.createReadStream(file.buffer).pipe(cld_upload_stream);
    });
}
//create product
export const createProduct = async (req, res) => {
    try {
        const result = await uploadToCloud(req.file);
        console.log(result);
        const product = {
            img: {
                imgUrl: result.url,
                public_id: result.public_id
            },
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            productStock: req.body.productStock,
        }

        const newProduct = await Product.create(product)
        return res.status(201).json(newProduct);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
}

//get all products
export const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find();
        return res.status(201).json(allProducts);
    } catch (err) {
        return res.status(500).json(err)
    }
}

//get one product 
export const getOneProduct = async (req, res) => {
    try {
        const oneProduct = await Product.findById(req.params.id)
        return res.status(201).json(oneProduct);
    } catch (err) {
        return res.status(500).json(err);
    }
}

//update one
export const updateOneProduct = async (req, res) => {
    try {
        const oneProduct = await Product.findById(req.params.id)
        if (oneProduct.imgUrl !== ''){
            const img = oneProduct.img.public_id
            await cloudinary.v2.uploader.destroy(img)
            console.log('deleted!!!!!!!!!!!!!!!!!!')
        }
        if (req.body.preview) {
            await cloudinary.v2.uploader.destroy(req.body.preview)
            console.log('preview deleted!!!!!!');
        }
        const result = await uploadToCloud(req.file);
        const product = {
            img: {
                imgUrl: result.url,
                public_id: result.public_id
            },
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            productStock: req.body.productStock,
        }
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, product, {new:true, runValidators:true})
        return res.status(201).json(updatedProduct);
    } catch (err) {
        return res.status(500).json(err);
    }
}

//delete one
export const deleteOneProduct = async (req, res) => {
    try {
        await Product.deleteOne({_id:req.params.id})
        return res.status(201).json({message: 'delete successful'});
    } catch (err) {
        return res.status(500).json(err);
    }
}

//for preview
export const previewImage = async (req,res) => {
    try {
        const result = await uploadToCloud(req.file);
        const img = {
            imgUrl: result.url,
            public_id: result.public_id
        }
        return res.status(201).json(img)
    } catch (err) {
        
    }
}

