import { Router } from 'express';
import { getKitchenTickets, updateTicketStatus } from '../controllers/kdsController';
import { authenticateJwt, requireRoles } from '../middleware/authMiddleware';
import { UserRoleType } from '@prisma/client';

const router = Router();

router.get('/tickets', authenticateJwt, requireRoles([UserRoleType.KITCHEN_STAFF, UserRoleType.BRANCH_MANAGER, UserRoleType.BUSINESS_OWNER, UserRoleType.CASHIER]), getKitchenTickets);
router.patch('/tickets/:id/status', authenticateJwt, requireRoles([UserRoleType.KITCHEN_STAFF, UserRoleType.BRANCH_MANAGER, UserRoleType.BUSINESS_OWNER, UserRoleType.SUPER_ADMIN]), updateTicketStatus);

export default router;
