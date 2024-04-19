import { Router } from "express";
import * as userController from '../controllers/user.controller.js';

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/user/:id', userController.getLoggedUser);

export default router;