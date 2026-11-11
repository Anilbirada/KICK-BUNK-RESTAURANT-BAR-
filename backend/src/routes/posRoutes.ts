import { Router } from 'express';
import { splitPayment, voidOrder } from '../controllers/posController';
import { authenticateJwt, requireRoles } from '../middleware/authMiddleware';
import { UserRoleType } from '@prisma/client';

const router = Router();

router.post('/:orderId/split-payment', authenticateJwt, requireRoles([UserRoleType.CASHIER, UserRoleType.BRANCH_MANAGER]), splitPayment);
router.post('/:orderId/void', authenticateJwt, requireRoles([UserRoleType.BRANCH_MANAGER, UserRoleType.BUSINESS_OWNER]), voidOrder);

export default router;
