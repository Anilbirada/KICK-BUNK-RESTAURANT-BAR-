import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.menuCategory.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' },
      include: {
        _count: { select: { items: true } },
      },
    });
    res.json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve menu categories.' });
  }
};

export const getMenuItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoryId, categorySlug, isVeg, search, branchId, isBestSeller } = req.query;

    const where: any = { isActive: true };

    if (categoryId) {
      where.categoryId = String(categoryId);
    } else if (categorySlug) {
      where.category = { slug: String(categorySlug) };
    }

    if (isVeg !== undefined) {
      where.isVeg = isVeg === 'true';
    }

    if (isBestSeller === 'true') {
      where.isBestSeller = true;
    }

    if (search) {
      const q = String(search).trim();
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
      ];
    }

    const items = await prisma.menuItem.findMany({
      where,
      include: {
        category: true,
        images: { orderBy: { sortOrder: 'asc' } },
        variants: { orderBy: { price: 'asc' } },
        addons: { orderBy: { price: 'asc' } },
        branchItems: branchId ? { where: { branchId: String(branchId) } } : true,
      },
      orderBy: [{ isBestSeller: 'desc' }, { name: 'asc' }],
    });

    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve menu items.' });
  }
};

export const getMenuItemBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const item = await prisma.menuItem.findUnique({
      where: { slug },
      include: {
        category: true,
        images: { orderBy: { sortOrder: 'asc' } },
        variants: { orderBy: { price: 'asc' } },
        addons: { orderBy: { price: 'asc' } },
        recipe: {
          include: {
            ingredients: { include: { inventoryItem: true } },
          },
        },
      },
    });

    if (!item) {
      res.status(404).json({ success: false, message: 'Menu item not found.' });
      return;
    }

    res.json({ success: true, data: item });
  } catch (error) {
    console.error('Error fetching menu item:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve menu item.' });
  }
};

export const toggleBranchItemAvailability = async (req: Request, res: Response): Promise<void> => {
  try {
    const { branchId, menuItemId } = req.params;
    const { isAvailable, customPrice } = req.body;

    const record = await prisma.branchMenuItem.upsert({
      where: {
        branchId_menuItemId: {
          branchId,
          menuItemId,
        },
      },
      update: {
        isAvailable: isAvailable !== undefined ? isAvailable : undefined,
        customPrice: customPrice !== undefined ? customPrice : undefined,
      },
      create: {
        branchId,
        menuItemId,
        isAvailable: isAvailable !== undefined ? isAvailable : true,
        customPrice: customPrice || null,
      },
    });

    res.json({ success: true, message: 'Branch menu item availability updated.', data: record });
  } catch (error) {
    console.error('Error updating branch menu item:', error);
    res.status(500).json({ success: false, message: 'Failed to update branch menu item.' });
  }
};

export const createMenuItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoryId, name, description, basePrice, isVeg, spiceLevel, prepTimeMin, isBestSeller, imageUrl } = req.body;

    if (!categoryId || !name || basePrice === undefined) {
      res.status(400).json({ success: false, message: 'Category, name, and base price are required.' });
      return;
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString().slice(-4);

    const item = await prisma.menuItem.create({
      data: {
        categoryId,
        name,
        slug,
        description: description || null,
        basePrice: Number(basePrice),
        isVeg: Boolean(isVeg),
        spiceLevel: spiceLevel ? Number(spiceLevel) : 1,
        prepTimeMin: prepTimeMin ? Number(prepTimeMin) : 15,
        isBestSeller: Boolean(isBestSeller),
        isActive: true,
        images: imageUrl ? { create: [{ imageUrl, isPrimary: true }] } : undefined,
      },
      include: {
        category: true,
        images: true,
      },
    });

    res.status(201).json({ success: true, message: 'Menu item created successfully.', data: item });
  } catch (error) {
    console.error('Error creating menu item:', error);
    res.status(500).json({ success: false, message: 'Failed to create menu item.' });
  }
};

export const updateMenuItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { categoryId, name, description, basePrice, isVeg, spiceLevel, prepTimeMin, isBestSeller, isActive, imageUrl } = req.body;

    const existing = await prisma.menuItem.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'Menu item not found.' });
      return;
    }

    const updated = await prisma.menuItem.update({
      where: { id },
      data: {
        categoryId: categoryId !== undefined ? categoryId : undefined,
        name: name !== undefined ? name : undefined,
        description: description !== undefined ? description : undefined,
        basePrice: basePrice !== undefined ? Number(basePrice) : undefined,
        isVeg: isVeg !== undefined ? Boolean(isVeg) : undefined,
        spiceLevel: spiceLevel !== undefined ? Number(spiceLevel) : undefined,
        prepTimeMin: prepTimeMin !== undefined ? Number(prepTimeMin) : undefined,
        isBestSeller: isBestSeller !== undefined ? Boolean(isBestSeller) : undefined,
        isActive: isActive !== undefined ? Boolean(isActive) : undefined,
      },
      include: {
        category: true,
        images: true,
      },
    });

    if (imageUrl) {
      await prisma.menuItemImage.deleteMany({ where: { menuItemId: id } });
      await prisma.menuItemImage.create({ data: { menuItemId: id, imageUrl, isPrimary: true } });
    }

    res.json({ success: true, message: 'Menu item updated successfully.', data: updated });
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ success: false, message: 'Failed to update menu item.' });
  }
};

export const deleteMenuItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const existing = await prisma.menuItem.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'Menu item not found.' });
      return;
    }

    await prisma.menuItem.delete({ where: { id } });

    res.json({ success: true, message: 'Menu item deleted successfully.' });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ success: false, message: 'Failed to delete menu item.' });
  }
};
