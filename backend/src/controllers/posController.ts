import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { PaymentMethod, PaymentStatus, OrderStatus } from '@prisma/client';

export const splitPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId } = req.params;
    const { payments } = req.body; // array of { method, amount, transactionRef }

    if (!payments || !Array.isArray(payments) || payments.length === 0) {
      res.status(400).json({ success: false, message: 'Payments list is required.' });
      return;
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { payments: true },
    });

    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found.' });
      return;
    }

    const totalSplitAmount = payments.reduce((sum, p) => sum + Number(p.amount), 0);
    if (Math.abs(totalSplitAmount - order.totalAmount) > 0.05) {
      res.status(400).json({
        success: false,
        message: `Total payment amounts (${totalSplitAmount}) must match order total (${order.totalAmount}).`,
      });
      return;
    }

    // Remove existing pending payments and create split records
    await prisma.$transaction(async (tx) => {
      await tx.payment.deleteMany({
        where: { orderId, status: PaymentStatus.PENDING },
      });

      for (const p of payments) {
        await tx.payment.create({
          data: {
            orderId,
            method: p.method as PaymentMethod,
            amount: Number(p.amount),
            status: PaymentStatus.COMPLETED,
            transactionRef: p.transactionRef || `SPLIT-${Date.now()}`,
          },
        });
      }
    });

    res.json({
      success: true,
      message: 'Split payments recorded successfully.',
    });
  } catch (error) {
    console.error('Error processing split payments:', error);
    res.status(500).json({ success: false, message: 'Failed to process split payments.' });
  }
};

export const voidOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId } = req.params;
    const { reason } = req.body;

    if (!reason) {
      res.status(400).json({ success: false, message: 'A supervisor reason is required to void an order.' });
      return;
    }

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found.' });
      return;
    }

    await prisma.$transaction(async (tx) => {
      await tx.order.update({
        where: { id: orderId },
        data: { status: OrderStatus.CANCELLED, notes: `VOID REASON: ${reason}` },
      });

      if (order.tableId) {
        await tx.table.update({
          where: { id: order.tableId },
          data: { status: 'AVAILABLE' },
        });
      }

      await tx.auditLog.create({
        data: {
          userId: req.user?.userId || null,
          action: 'ORDER_VOID',
          module: 'POS',
          entityId: order.id,
          newValue: JSON.stringify({ reason, orderNumber: order.orderNumber, total: order.totalAmount }),
        },
      });
    });

    res.json({ success: true, message: `Order ${order.orderNumber} successfully voided.` });
  } catch (error) {
    console.error('Error voiding order:', error);
    res.status(500).json({ success: false, message: 'Failed to void order.' });
  }
};
