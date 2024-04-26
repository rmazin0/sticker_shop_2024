import Product from "../models/product.model.js";
import cloudinary from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
//uploading image to cloudinary
const uploadToCloud = (file) => {
    return new Promise((resolve, reject) => {
        //upload_stream({folder_name, file_id}, callback)
        let cld_upload_stream = cloudinary.v2.uploader.upload_stream(
            { folder: "danie_products", product_id: file.originalname },
            (error, result) => {
                if (result) {
                    resolve(result);
                    // console.log(result);
                } else {
                    // console.log('---------upload error---------',error);
                    reject(error);
                }
            }
        );
        //converts data type of file (buffer) to (string)
        streamifier.createReadStream(file.buffer).pipe(cld_upload_stream);
    });
};
//create product
export const createProduct = async (req, res) => {
    try {
        // console.log(result);
        if (req.file) {
            //remove preview image
            if (req.body.preview) {
                await cloudinary.v2.uploader.destroy(req.body.preview);
                console.log("preview deleted!!!!!!");
            }
            const result = await uploadToCloud(req.file);
            // console.log("----result----",result);
            const product = {
                imgUrl: result.url,
                publicId: result.public_id,
                productName: req.body.productName,
                productPrice: req.body.productPrice,
                productStock: req.body.productStock,
            };
            const newProduct = await Product.create(product);
            return res.status(201).json(newProduct);
        } else {
            // console.log('-------------no file-------------',req.file);
            const product = {
                imgUrl: "",
                publicId: "",
                productName: req.body.productName,
                productPrice: req.body.productPrice,
                productStock: req.body.productStock,
            };
            const newProduct = await Product.create(product);
            return res.status(201).json(newProduct);
        }
    } catch (err) {
        // console.log("-----------------create error----------------", err);
        return res.status(500).json(err);
    }
};

//get all products
export const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find();
        return res.status(201).json(allProducts);
    } catch (err) {
        return res.status(500).json(err);
    }
};

//get one product
export const getOneProduct = async (req, res) => {
    try {
        const oneProduct = await Product.findById(req.params.id);
        return res.status(201).json(oneProduct);
    } catch (err) {
        return res.status(500).json(err);
    }
};

//update one
export const updateOneProduct = async (req, res) => {
    // ADD CONDITION TO SAVE USING FILE OR USING STATE
    try {
        if (req.file) {
            const oneProduct = await Product.findById(req.params.id); // GETS ONE PRODUCT BY ID...USED TO FETCH IMAGE PUBLIC_ID
            //DESTROYS PREVIEW PICTURE IN CLOUD AFTER SAVING
            // console.log('-------body---------',req.body);
            if (req.body.preview) {
                //DESTROYS OLD PICTURE, NEEDS TO BE MODIFIED SO IT DOESNT AUTOMATICALLY DELETES WHEN NOT REPLACED WITH A PREVIEW....PUT IN ```IF (PREVIEW EXISTS)``` CONDITION???
                if (oneProduct.imgUrl !== "") {
                    const img = oneProduct.publicId;
                    await cloudinary.v2.uploader.destroy(img);
                    console.log("deleted!!!!!!!!!!!!!!!!!!");
                }
                await cloudinary.v2.uploader.destroy(req.body.preview);
                console.log("preview deleted!!!!!!");
            }
            const result = await uploadToCloud(req.file);
            const product = {
                imgUrl: result.url,
                publicId: result.public_id,
                productName: req.body.productName,
                productPrice: req.body.productPrice,
                productStock: req.body.productStock,
            };
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                product,
                { new: true, runValidators: true }
            );
            return res.status(201).json(updatedProduct);
        } else {
            const product = {
                imgUrl: req.body.imgUrl,
                publicId: req.body.publicId,
                productName: req.body.productName,
                productPrice: req.body.productPrice,
                productStock: req.body.productStock,
            };
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                product,
                { new: true, runValidators: true }
            );
            return res.status(201).json(updatedProduct);
        }
    } catch (err) {
        return res.status(500).json(err);
    }
};

//delete one
export const deleteOneProduct = async (req, res) => {
    try {
        const oneProduct = await Product.findById(req.params.id);
        console.log(oneProduct);
        if (oneProduct.imgUrl !== "") {
            const img = oneProduct.publicId;
            await cloudinary.v2.uploader.destroy(img);
            console.log("deleted!!!!!!!!!!!!!!!!!!");
        }
        await Product.deleteOne({ _id: req.params.id });
        return res.status(201).json({ message: "delete successful" });
    } catch (err) {
        return res.status(500).json(err);
    }
};

//for preview
export const previewImage = async (req, res) => {
    try {
        const result = await uploadToCloud(req.file);
        const img = {
            imgUrl: result.url,
            publicId: result.public_id,
        };
        return res.status(201).json(img);
    } catch (err) { }
};
