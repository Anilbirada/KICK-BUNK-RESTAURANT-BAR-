import { Router } from 'express';
import { getInventoryItems, adjustStock, getRecipes } from '../controllers/inventoryController';
import { authenticateJwt, requireRoles } from '../middleware/authMiddleware';
import { UserRoleType } from '@prisma/client';

const router = Router();

router.get('/items', authenticateJwt, requireRoles([UserRoleType.INVENTORY_MANAGER, UserRoleType.BUSINESS_OWNER, UserRoleType.BRANCH_MANAGER]), getInventoryItems);
router.post('/items/:inventoryItemId/adjust', authenticateJwt, requireRoles([UserRoleType.INVENTORY_MANAGER, UserRoleType.BRANCH_MANAGER]), adjustStock);
router.get('/recipes', authenticateJwt, requireRoles([UserRoleType.INVENTORY_MANAGER, UserRoleType.BUSINESS_OWNER, UserRoleType.BRANCH_MANAGER, UserRoleType.KITCHEN_STAFF]), getRecipes);

export default router;
