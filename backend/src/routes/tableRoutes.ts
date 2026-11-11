import { Router } from 'express';
import { getBranchTables, updateTableStatus, createReservation, getReservations } from '../controllers/tableController';
import { authenticateJwt, requireRoles } from '../middleware/authMiddleware';
import { UserRoleType } from '@prisma/client';

const router = Router();

router.get('/branch/:branchId', getBranchTables);
router.patch('/:id/status', authenticateJwt, requireRoles([UserRoleType.WAITER, UserRoleType.CASHIER, UserRoleType.BRANCH_MANAGER]), updateTableStatus);
router.post('/reservations', createReservation);
router.get('/reservations', authenticateJwt, getReservations);

export default router;
