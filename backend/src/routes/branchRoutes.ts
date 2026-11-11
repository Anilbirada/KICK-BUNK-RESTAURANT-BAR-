import { Router } from 'express';
import { getAllBranches, getBranchById, updateBranch } from '../controllers/branchController';
import { authenticateJwt, requireRoles } from '../middleware/authMiddleware';
import { UserRoleType } from '@prisma/client';

const router = Router();

router.get('/', getAllBranches);
router.get('/:id', getBranchById);
router.put('/:id', authenticateJwt, requireRoles([UserRoleType.BUSINESS_OWNER, UserRoleType.SUPER_ADMIN, UserRoleType.BRANCH_MANAGER]), updateBranch);

export default router;
