import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { InventoryTransactionType } from '@prisma/client';

export const getInventoryItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const { branchId, lowStockOnly } = req.query;

    const where: any = {};
    if (branchId) where.branchId = String(branchId);

    const items = await prisma.inventoryItem.findMany({
      where,
      orderBy: { name: 'asc' },
    });

    const result = items.map((item) => ({
      ...item,
      isLowStock: item.currentStock <= item.minStockLevel,
    }));

    const filtered = lowStockOnly === 'true' ? result.filter((i) => i.isLowStock) : result;

    res.json({ success: true, count: filtered.length, data: filtered });
  } catch (error) {
    console.error('Error fetching inventory items:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve inventory items.' });
  }
};

export const adjustStock = async (req: Request, res: Response): Promise<void> => {
  try {
    const { inventoryItemId } = req.params;
    const { type, quantity, notes } = req.body; // type: MANUAL_ADJUSTMENT, WASTAGE, PURCHASE_RECEIPT

    if (!quantity || !type || !Object.values(InventoryTransactionType).includes(type)) {
      res.status(400).json({ success: false, message: 'Valid transaction type and quantity are required.' });
      return;
    }

    const item = await prisma.inventoryItem.findUnique({ where: { id: inventoryItemId } });
    if (!item) {
      res.status(404).json({ success: false, message: 'Inventory item not found.' });
      return;
    }

    const qtyNumber = Number(quantity);
    const newStock = Math.max(0, item.currentStock + qtyNumber);

    const updated = await prisma.$transaction(async (tx) => {
      const inv = await tx.inventoryItem.update({
        where: { id: inventoryItemId },
        data: { currentStock: newStock },
      });

      await tx.inventoryTransaction.create({
        data: {
          inventoryItemId,
          type: type as InventoryTransactionType,
          quantity: qtyNumber,
          costPerUnit: item.costPerUnit,
          totalCost: Math.abs(qtyNumber * item.costPerUnit),
          notes,
        },
      });

      return inv;
    });

    res.json({ success: true, message: 'Stock adjusted successfully.', data: updated });
  } catch (error) {
    console.error('Error adjusting stock:', error);
    res.status(500).json({ success: false, message: 'Failed to adjust stock.' });
  }
};

export const getRecipes = async (req: Request, res: Response): Promise<void> => {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        menuItem: { select: { id: true, name: true, basePrice: true, category: { select: { name: true } } } },
        ingredients: {
          include: {
            inventoryItem: { select: { name: true, unit: true, costPerUnit: true } },
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    const calculatedRecipes = recipes.map((rec) => {
      const estimatedCost = rec.ingredients.reduce((sum, ing) => {
        return sum + ing.quantity * ing.inventoryItem.costPerUnit;
      }, 0);

      const sellingPrice = rec.menuItem.basePrice;
      const foodCostPercentage = sellingPrice > 0 ? Math.round((estimatedCost / sellingPrice) * 100 * 10) / 10 : 0;
      const estimatedMargin = Math.max(0, sellingPrice - estimatedCost);

      return {
        ...rec,
        estimatedCost: Math.round(estimatedCost * 100) / 100,
        foodCostPercentage,
        estimatedMargin: Math.round(estimatedMargin * 100) / 100,
      };
    });

    res.json({ success: true, count: calculatedRecipes.length, data: calculatedRecipes });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve recipes.' });
  }
};
