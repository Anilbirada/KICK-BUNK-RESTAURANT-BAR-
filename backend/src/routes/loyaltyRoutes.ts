import { Router } from 'express';
import { validateCoupon, getCustomerLoyalty, submitCustomerFeedback, getPublicFeedbacks } from '../controllers/loyaltyController';
import { authenticateJwt } from '../middleware/authMiddleware';

const router = Router();

router.post('/coupons/validate', validateCoupon);
router.get('/customer/:customerId', authenticateJwt, getCustomerLoyalty);
router.post('/feedback', submitCustomerFeedback);
router.get('/feedback', getPublicFeedbacks);

export default router;
