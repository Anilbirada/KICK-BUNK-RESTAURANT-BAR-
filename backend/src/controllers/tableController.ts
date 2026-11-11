import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { TableStatus, ReservationStatus } from '@prisma/client';
import { emitTableStatusChanged } from '../sockets/socketHandler';

export const getBranchTables = async (req: Request, res: Response): Promise<void> => {
  try {
    const { branchId } = req.params;

    const tables = await prisma.table.findMany({
      where: { branchId },
      include: {
        orders: {
          where: { status: { in: ['CONFIRMED', 'PREPARING', 'READY', 'SERVED'] } },
          select: { id: true, orderNumber: true, totalAmount: true, createdAt: true },
        },
      },
      orderBy: [{ zone: 'asc' }, { tableNumber: 'asc' }],
    });

    res.json({ success: true, count: tables.length, data: tables });
  } catch (error) {
    console.error('Error fetching tables:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve tables.' });
  }
};

export const updateTableStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !Object.values(TableStatus).includes(status)) {
      res.status(400).json({ success: false, message: 'Invalid table status.' });
      return;
    }

    const table = await prisma.table.update({
      where: { id },
      data: { status: status as TableStatus },
    });

    emitTableStatusChanged(table.id, table.status, table.branchId);

    res.json({ success: true, message: 'Table status updated.', data: table });
  } catch (error) {
    console.error('Error updating table:', error);
    res.status(500).json({ success: false, message: 'Failed to update table.' });
  }
};

export const createReservation = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      branchId,
      customerId,
      customerName,
      customerPhone,
      customerEmail,
      reservationDate,
      reservationTime,
      guestCount,
      specialRequests,
      tableId,
    } = req.body;

    if (!branchId || !customerName || !customerPhone || !reservationDate || !reservationTime || !guestCount) {
      res.status(400).json({ success: false, message: 'Branch, customer name, phone, date, time and guest count are required.' });
      return;
    }

    const targetDate = new Date(reservationDate);

    // Double-booking prevention check
    if (tableId) {
      const existing = await prisma.tableReservation.findFirst({
        where: {
          tableId,
          reservationDate: targetDate,
          reservationTime,
          status: { in: [ReservationStatus.PENDING, ReservationStatus.CONFIRMED, ReservationStatus.SEATED] },
        },
      });

      if (existing) {
        res.status(409).json({ success: false, message: 'This table is already reserved for the chosen time slot.' });
        return;
      }
    }

    const reservation = await prisma.tableReservation.create({
      data: {
        branchId,
        customerId: customerId || null,
        tableId: tableId || null,
        customerName,
        customerPhone,
        customerEmail: customerEmail || null,
        reservationDate: targetDate,
        reservationTime,
        guestCount: Number(guestCount),
        specialRequests: specialRequests || null,
        status: ReservationStatus.CONFIRMED,
      },
      include: {
        branch: { select: { name: true, phone: true } },
        table: true,
      },
    });

    // Mark table as RESERVED if table assigned
    if (tableId) {
      await prisma.table.update({
        where: { id: tableId },
        data: { status: TableStatus.RESERVED },
      });
      emitTableStatusChanged(tableId, TableStatus.RESERVED, branchId);
    }

    res.status(201).json({
      success: true,
      message: 'Table reservation confirmed successfully.',
      data: reservation,
    });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ success: false, message: 'Failed to process reservation.' });
  }
};

export const getReservations = async (req: Request, res: Response): Promise<void> => {
  try {
    const { branchId, date, status } = req.query;

    const where: any = {};
    if (branchId) where.branchId = String(branchId);
    if (status) where.status = status as ReservationStatus;
    if (date) {
      const d = new Date(String(date));
      where.reservationDate = {
        gte: new Date(d.setHours(0, 0, 0, 0)),
        lte: new Date(d.setHours(23, 59, 59, 999)),
      };
    }

    const reservations = await prisma.tableReservation.findMany({
      where,
      include: {
        table: true,
        branch: { select: { id: true, name: true } },
      },
      orderBy: [{ reservationDate: 'asc' }, { reservationTime: 'asc' }],
    });

    res.json({ success: true, count: reservations.length, data: reservations });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve reservations.' });
  }
};
