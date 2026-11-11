import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const getAllBranches = async (req: Request, res: Response): Promise<void> => {
  try {
    const branches = await prisma.branch.findMany({
      where: { isActive: true },
      include: {
        hours: { orderBy: { dayOfWeek: 'asc' } },
        _count: { select: { tables: true, branchMenuItems: true } },
      },
      orderBy: { name: 'asc' },
    });

    res.json({ success: true, count: branches.length, data: branches });
  } catch (error) {
    console.error('Error fetching branches:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve branches.' });
  }
};

export const getBranchById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const branch = await prisma.branch.findUnique({
      where: { id },
      include: {
        hours: { orderBy: { dayOfWeek: 'asc' } },
        tables: { orderBy: { tableNumber: 'asc' } },
        kitchenStations: { orderBy: { sortOrder: 'asc' } },
      },
    });

    if (!branch) {
      res.status(404).json({ success: false, message: 'Branch not found.' });
      return;
    }

    res.json({ success: true, data: branch });
  } catch (error) {
    console.error('Error fetching branch:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve branch details.' });
  }
};

export const updateBranch = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, phone, email, address, city, state, postalCode, latitude, longitude, googleMapsUrl, supportsDineIn, supportsTakeaway, supportsDelivery } = req.body;

    const updated = await prisma.branch.update({
      where: { id },
      data: {
        name: name !== undefined ? name : undefined,
        phone: phone !== undefined ? phone : undefined,
        email: email !== undefined ? email : undefined,
        address: address !== undefined ? address : undefined,
        city: city !== undefined ? city : undefined,
        state: state !== undefined ? state : undefined,
        postalCode: postalCode !== undefined ? postalCode : undefined,
        latitude: latitude !== undefined ? Number(latitude) : undefined,
        longitude: longitude !== undefined ? Number(longitude) : undefined,
        googleMapsUrl: googleMapsUrl !== undefined ? googleMapsUrl : undefined,
        supportsDineIn: supportsDineIn !== undefined ? Boolean(supportsDineIn) : undefined,
        supportsTakeaway: supportsTakeaway !== undefined ? Boolean(supportsTakeaway) : undefined,
        supportsDelivery: supportsDelivery !== undefined ? Boolean(supportsDelivery) : undefined,
      },
    });

    res.json({ success: true, message: 'Branch updated successfully.', data: updated });
  } catch (error) {
    console.error('Error updating branch:', error);
    res.status(500).json({ success: false, message: 'Failed to update branch.' });
  }
};
