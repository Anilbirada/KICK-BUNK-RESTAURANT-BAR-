import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const getCustomerFavorites = async (req: Request, res: Response): Promise<void> => {
  try {
    const { customerId } = req.params;

    const favorites = await prisma.favorite.findMany({
      where: { customerId },
      include: {
        menuItem: {
          include: {
            category: true,
            images: { orderBy: { sortOrder: 'asc' } },
            variants: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ success: true, count: favorites.length, data: favorites.map((f) => f.menuItem) });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve favorites.' });
  }
};

export const addFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { customerId, menuItemId } = req.body;

    if (!customerId || !menuItemId) {
      res.status(400).json({ success: false, message: 'Customer ID and Menu Item ID are required.' });
      return;
    }

    const favorite = await prisma.favorite.upsert({
      where: {
        customerId_menuItemId: { customerId, menuItemId },
      },
      update: {},
      create: { customerId, menuItemId },
    });

    res.status(201).json({ success: true, message: 'Dish added to favorites.', data: favorite });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ success: false, message: 'Failed to add favorite.' });
  }
};

export const removeFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { customerId, menuItemId } = req.params;

    await prisma.favorite.deleteMany({
      where: { customerId, menuItemId },
    });

    res.json({ success: true, message: 'Removed from favorites.' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ success: false, message: 'Failed to remove favorite.' });
  }
};
