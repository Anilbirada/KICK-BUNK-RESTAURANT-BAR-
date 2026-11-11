import { Router } from 'express';
import { createInquiry, getInquiries, updateInquiryStatus } from '../controllers/inquiryController';
import { authenticateJwt, requireRoles } from '../middleware/authMiddleware';
import { UserRoleType } from '@prisma/client';

const router = Router();

router.post('/', createInquiry);
router.get('/', authenticateJwt, requireRoles([UserRoleType.BUSINESS_OWNER, UserRoleType.BRANCH_MANAGER, UserRoleType.SUPER_ADMIN]), getInquiries);
router.patch('/:id/status', authenticateJwt, requireRoles([UserRoleType.BUSINESS_OWNER, UserRoleType.BRANCH_MANAGER]), updateInquiryStatus);

export default router;
