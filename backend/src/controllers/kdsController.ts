import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { KitchenTicketStatus } from '@prisma/client';
import { emitOrderStatusChanged } from '../sockets/socketHandler';

export const getKitchenTickets = async (req: Request, res: Response): Promise<void> => {
  try {
    const { branchId, stationId, status } = req.query;

    const where: any = {};
    if (branchId) {
      where.order = { branchId: String(branchId) };
    }
    if (stationId) {
      where.stationId = String(stationId);
    }
    if (status) {
      where.status = status as KitchenTicketStatus;
    } else {
      // By default show all non-completed tickets
      where.status = { not: KitchenTicketStatus.COMPLETED };
    }

    const tickets = await prisma.kitchenOrder.findMany({
      where,
      include: {
        station: true,
        order: {
          include: {
            table: true,
            items: {
              include: {
                menuItem: { select: { id: true, name: true, isVeg: true, spiceLevel: true } },
                variant: { select: { name: true } },
                modifiers: { include: { addon: true } },
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    res.json({ success: true, count: tickets.length, data: tickets });
  } catch (error) {
    console.error('Error fetching kitchen tickets:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve kitchen tickets.' });
  }
};

export const updateTicketStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !Object.values(KitchenTicketStatus).includes(status)) {
      res.status(400).json({ success: false, message: 'Invalid kitchen ticket status.' });
      return;
    }

    const updateData: any = { status: status as KitchenTicketStatus };
    if (status === KitchenTicketStatus.PREPARING) {
      updateData.startedAt = new Date();
    } else if (status === KitchenTicketStatus.READY) {
      updateData.readyAt = new Date();
    } else if (status === KitchenTicketStatus.COMPLETED) {
      updateData.completedAt = new Date();
    }

    const ticket = await prisma.kitchenOrder.update({
      where: { id },
      data: updateData,
      include: { order: true },
    });

    // If all kitchen tickets for this order are READY, notify POS
    emitOrderStatusChanged(ticket.orderId, status, ticket.order.branchId);

    res.json({
      success: true,
      message: `Kitchen ticket updated to ${status}`,
      data: ticket,
    });
  } catch (error) {
    console.error('Error updating kitchen ticket:', error);
    res.status(500).json({ success: false, message: 'Failed to update kitchen ticket.' });
  }
};
