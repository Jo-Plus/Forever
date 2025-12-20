import { Router } from 'express';
import { adminLogin, loginUser, registerUser } from '../controllers/userController.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/admin', adminLogin);

export default router;
