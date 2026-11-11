import { Router } from 'express';
import authRoutes from './authRoutes';
import branchRoutes from './branchRoutes';
import menuRoutes from './menuRoutes';
import orderRoutes from './orderRoutes';
import posRoutes from './posRoutes';
import kdsRoutes from './kdsRoutes';
import tableRoutes from './tableRoutes';
import inventoryRoutes from './inventoryRoutes';
import loyaltyRoutes from './loyaltyRoutes';
import reportRoutes from './reportRoutes';
import inquiryRoutes from './inquiryRoutes';
import favoriteRoutes from './favoriteRoutes';
import mediaRoutes from './mediaRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/branches', branchRoutes);
router.use('/menu', menuRoutes);
router.use('/orders', orderRoutes);
router.use('/pos', posRoutes);
router.use('/kitchen', kdsRoutes);
router.use('/tables', tableRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/loyalty', loyaltyRoutes);
router.use('/reports', reportRoutes);
router.use('/inquiries', inquiryRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/media', mediaRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    product: 'KICK BUNK 360',
    version: '1.0.0-enterprise',
    timestamp: new Date().toISOString(),
  });
});

export default router;
