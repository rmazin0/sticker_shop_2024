import {Schema, model} from 'mongoose'

const ProductSchema = new Schema({
    img: {
        imgUrl:{
            type:String,
            required:true,
        },
        public_id:{
            type: String,
            requried:true,
        }
    },
    productName: {
        type: String,
        required: [true, "Product name is required!"]
    },
    productPrice: {
        type: Number,
        required: [true, 'Price is required!']
    },
    productStock: {
        type: Number,
        required: [true, 'Stock number required!']
    }
}, {timestamps: true})

const Product = model('Product', ProductSchema);
export default Product;