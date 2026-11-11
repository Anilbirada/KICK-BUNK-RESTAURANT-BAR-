import { Router } from 'express';
import { getCustomerFavorites, addFavorite, removeFavorite } from '../controllers/favoriteController';

const router = Router();

router.get('/:customerId', getCustomerFavorites);
router.post('/', addFavorite);
router.delete('/:customerId/:menuItemId', removeFavorite);

export default router;
