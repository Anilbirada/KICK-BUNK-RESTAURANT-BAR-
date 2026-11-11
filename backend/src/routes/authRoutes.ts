import { Router } from 'express';
import { login, registerCustomer, getCurrentUser } from '../controllers/authController';
import { authenticateJwt } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', login);
router.post('/register', registerCustomer);
router.get('/me', authenticateJwt, getCurrentUser);

export default router;
