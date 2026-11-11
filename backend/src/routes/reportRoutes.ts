import { Router } from 'express';
import { getOwnerDashboardMetrics } from '../controllers/reportController';
import { authenticateJwt, requireRoles } from '../middleware/authMiddleware';
import { UserRoleType } from '@prisma/client';

const router = Router();

router.get(
  '/dashboard',
  authenticateJwt,
  requireRoles([UserRoleType.BUSINESS_OWNER, UserRoleType.BRANCH_MANAGER, UserRoleType.ACCOUNTANT, UserRoleType.REPORTS_VIEWER]),
  getOwnerDashboardMetrics
);

export default router;
