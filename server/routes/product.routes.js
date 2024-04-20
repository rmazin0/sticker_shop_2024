import { Router } from "express";
import * as productController from '../controllers/product.controller.js'
import multer, {memoryStorage} from 'multer';

const storage = memoryStorage();
const upload = multer({storage});

const router = Router();

router.route('/products')
    .post(upload.single('imgUrl'), productController.createProduct)
    .get(productController.getAllProducts)
router.route('/products/:id')
    .get(productController.getOneProduct)
    .post(productController.updateOneProduct)
    .delete(productController.deleteOneProduct)
export default router;