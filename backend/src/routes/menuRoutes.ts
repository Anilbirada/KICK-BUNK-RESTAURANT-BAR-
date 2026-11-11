import { Router } from 'express';
import {
  getCategories,
  getMenuItems,
  getMenuItemBySlug,
  toggleBranchItemAvailability,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} from '../controllers/menuController';
import { authenticateJwt, requireRoles } from '../middleware/authMiddleware';
import { UserRoleType } from '@prisma/client';

const router = Router();

router.get('/categories', getCategories);
router.get('/items', getMenuItems);
router.get('/items/:slug', getMenuItemBySlug);

router.post(
  '/items',
  authenticateJwt,
  requireRoles([UserRoleType.BUSINESS_OWNER, UserRoleType.SUPER_ADMIN, UserRoleType.BRANCH_MANAGER]),
  createMenuItem
);

router.put(
  '/items/:id',
  authenticateJwt,
  requireRoles([UserRoleType.BUSINESS_OWNER, UserRoleType.SUPER_ADMIN, UserRoleType.BRANCH_MANAGER]),
  updateMenuItem
);

router.delete(
  '/items/:id',
  authenticateJwt,
  requireRoles([UserRoleType.BUSINESS_OWNER, UserRoleType.SUPER_ADMIN]),
  deleteMenuItem
);

router.patch(
  '/branch/:branchId/items/:menuItemId/availability',
  authenticateJwt,
  requireRoles([UserRoleType.BUSINESS_OWNER, UserRoleType.BRANCH_MANAGER]),
  toggleBranchItemAvailability
);

export default router;
