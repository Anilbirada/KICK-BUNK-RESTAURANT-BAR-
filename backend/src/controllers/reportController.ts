import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { OrderStatus, PaymentStatus, TableStatus } from '@prisma/client';

export const getOwnerDashboardMetrics = async (req: Request, res: Response): Promise<void> => {
  try {
    const { branchId, startDate, endDate } = req.query;

    const orderWhere: any = {
      status: { in: [OrderStatus.COMPLETED, OrderStatus.CONFIRMED, OrderStatus.PREPARING, OrderStatus.READY, OrderStatus.SERVED] },
    };

    if (branchId) {
      orderWhere.branchId = String(branchId);
    }

    if (startDate || endDate) {
      orderWhere.createdAt = {};
      if (startDate) orderWhere.createdAt.gte = new Date(String(startDate));
      if (endDate) orderWhere.createdAt.lte = new Date(String(endDate));
    }

    // 1. Transactional sales aggregations
    const orders = await prisma.order.findMany({
      where: orderWhere,
      include: {
        items: { include: { menuItem: true } },
        payments: true,
        branch: { select: { id: true, name: true, code: true } },
      },
    });

    const totalOrders = orders.length;
    let grossSales = 0;
    let totalTax = 0;
    let totalDiscount = 0;
    let totalRevenue = 0;

    const channelCounts: Record<string, number> = { DINE_IN: 0, TAKEAWAY: 0, DELIVERY: 0, ONLINE: 0 };
    const statusCounts: Record<string, number> = {};
    const branchSales: Record<string, { branchName: string; revenue: number; orderCount: number }> = {};
    const dishSales: Record<string, { name: string; quantity: number; revenue: number }> = {};

    for (const ord of orders) {
      grossSales += ord.subTotal;
      totalTax += ord.taxAmount;
      totalDiscount += ord.discountAmount;
      totalRevenue += ord.totalAmount;

      channelCounts[ord.channel] = (channelCounts[ord.channel] || 0) + 1;
      statusCounts[ord.status] = (statusCounts[ord.status] || 0) + 1;

      // Branch breakdown
      const bKey = ord.branch.name;
      if (!branchSales[bKey]) {
        branchSales[bKey] = { branchName: bKey, revenue: 0, orderCount: 0 };
      }
      branchSales[bKey].revenue += ord.totalAmount;
      branchSales[bKey].orderCount += 1;

      // Item breakdown
      for (const item of ord.items) {
        const dKey = item.menuItem.name;
        if (!dishSales[dKey]) {
          dishSales[dKey] = { name: dKey, quantity: 0, revenue: 0 };
        }
        dishSales[dKey].quantity += item.quantity;
        dishSales[dKey].revenue += item.totalPrice;
      }
    }

    const averageOrderValue = totalOrders > 0 ? Math.round((totalRevenue / totalOrders) * 100) / 100 : 0;

    // 2. Payments collected vs refunds
    const paymentsCollected = await prisma.payment.aggregate({
      where: {
        status: PaymentStatus.COMPLETED,
        order: branchId ? { branchId: String(branchId) } : undefined,
      },
      _sum: { amount: true },
    });

    const refundsTotal = await prisma.refund.aggregate({
      where: {
        payment: {
          order: branchId ? { branchId: String(branchId) } : undefined,
        },
      },
      _sum: { amount: true },
    });

    // 3. Operational counters
    const [totalCustomers, activeBranches, occupiedTables, lowStockCount, todayReservations] = await Promise.all([
      prisma.customer.count(),
      prisma.branch.count({ where: { isActive: true } }),
      prisma.table.count({
        where: {
          status: TableStatus.OCCUPIED,
          branchId: branchId ? String(branchId) : undefined,
        },
      }),
      prisma.inventoryItem.count({
        where: {
          currentStock: { lte: prisma.inventoryItem.fields.minStockLevel as any },
          branchId: branchId ? String(branchId) : undefined,
        },
      }),
      prisma.tableReservation.count({
        where: {
          branchId: branchId ? String(branchId) : undefined,
          reservationDate: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
            lte: new Date(new Date().setHours(23, 59, 59, 999)),
          },
        },
      }),
    ]);

    // Top 5 dishes sorted by revenue
    const topDishes = Object.values(dishSales)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    res.json({
      success: true,
      data: {
        summary: {
          totalRevenue: Math.round(totalRevenue * 100) / 100,
          grossSales: Math.round(grossSales * 100) / 100,
          totalTax: Math.round(totalTax * 100) / 100,
          totalDiscount: Math.round(totalDiscount * 100) / 100,
          netCollected: Math.round((paymentsCollected._sum.amount || 0) * 100) / 100,
          refunds: Math.round((refundsTotal._sum.amount || 0) * 100) / 100,
          totalOrders,
          averageOrderValue,
          totalCustomers,
          activeBranches,
          occupiedTables,
          lowStockAlerts: lowStockCount,
          todayReservations,
        },
        channelBreakdown: channelCounts,
        branchComparison: Object.values(branchSales),
        topPerformingDishes: topDishes,
      },
    });
  } catch (error) {
    console.error('Error calculating owner dashboard metrics:', error);
    res.status(500).json({ success: false, message: 'Failed to compute dashboard analytics.' });
  }
};
