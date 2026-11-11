import { Router } from 'express';
import { createOrder, getOrders, getOrderById, updateOrderStatus } from '../controllers/orderController';
import { authenticateJwt, requireRoles } from '../middleware/authMiddleware';
import { UserRoleType } from '@prisma/client';

const router = Router();

router.post('/', createOrder);
router.get('/', authenticateJwt, getOrders);
router.get('/:id', getOrderById);
router.patch(
  '/:id/status',
  authenticateJwt,
  requireRoles([UserRoleType.BUSINESS_OWNER, UserRoleType.BRANCH_MANAGER, UserRoleType.CASHIER, UserRoleType.KITCHEN_STAFF, UserRoleType.WAITER]),
  updateOrderStatus
);

export default router;
