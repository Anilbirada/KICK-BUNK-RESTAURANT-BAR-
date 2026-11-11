import { Router } from 'express';
import { getMediaAssets, createMediaAsset, updateMediaAsset, deleteMediaAsset } from '../controllers/mediaController';
import { authenticateJwt, requireRoles } from '../middleware/authMiddleware';
import { UserRoleType } from '@prisma/client';

const router = Router();

router.get('/', getMediaAssets);
router.post('/', authenticateJwt, requireRoles([UserRoleType.BUSINESS_OWNER, UserRoleType.SUPER_ADMIN, UserRoleType.MARKETING_MANAGER]), createMediaAsset);
router.put('/:id', authenticateJwt, requireRoles([UserRoleType.BUSINESS_OWNER, UserRoleType.SUPER_ADMIN, UserRoleType.MARKETING_MANAGER]), updateMediaAsset);
router.delete('/:id', authenticateJwt, requireRoles([UserRoleType.BUSINESS_OWNER, UserRoleType.SUPER_ADMIN, UserRoleType.MARKETING_MANAGER]), deleteMediaAsset);

export default router;
