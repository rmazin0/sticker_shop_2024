import { Router } from "express";
import * as productController from '../controllers/product.controller.js'
import multer, {memoryStorage} from 'multer';
import authenticate from '../config/jwt.config.js'

const storage = memoryStorage();
const upload = multer({storage});

const router = Router();

router.route('/products')
    .post(upload.single('img'), productController.createProduct)
    .get(productController.getAllProducts)
router.route('/products/:id')
    .get(productController.getOneProduct)
    .post(upload.single('img'), productController.updateOneProduct)
    .delete(productController.deleteOneProduct)
router.post('/preview', upload.single('img'), productController.previewImage)
export default router;