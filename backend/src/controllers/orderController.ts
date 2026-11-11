import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { OrderChannel, OrderStatus, PaymentMethod, PaymentStatus, TableStatus, KitchenTicketStatus, InventoryTransactionType } from '@prisma/client';
import { emitOrderCreated, emitOrderStatusChanged, emitTableStatusChanged } from '../sockets/socketHandler';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      branchId,
      customerId,
      tableId,
      channel = OrderChannel.DINE_IN,
      items, // array of { menuItemId, variantId, quantity, addonIds, specialNotes }
      notes,
      paymentMethod = PaymentMethod.CASH,
      couponCode,
    } = req.body;

    if (!branchId || !items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ success: false, message: 'Branch ID and items list are required.' });
      return;
    }

    // Generate unique order number: KB-[BRANCH_CODE]-[TIMESTAMP]
    const branch = await prisma.branch.findUnique({ where: { id: branchId } });
    if (!branch) {
      res.status(404).json({ success: false, message: 'Invalid branch ID.' });
      return;
    }

    const orderCountToday = await prisma.order.count({
      where: {
        branchId,
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    });

    const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const orderNumber = `${branch.code}-${dateStr}-${String(orderCountToday + 1).padStart(3, '0')}-${Math.floor(100 + Math.random() * 900)}`;

    // Calculate item pricing on backend (Never trust client prices!)
    let subTotal = 0;
    const validatedItemsData: any[] = [];

    for (const item of items) {
      const menuItem = await prisma.menuItem.findUnique({
        where: { id: item.menuItemId },
        include: { variants: true, addons: true },
      });

      if (!menuItem) {
        res.status(400).json({ success: false, message: `Menu item with id ${item.menuItemId} does not exist.` });
        return;
      }

      let unitPrice = menuItem.basePrice;
      if (item.variantId) {
        const variant = menuItem.variants.find((v) => v.id === item.variantId);
        if (variant) unitPrice = variant.price;
      }

      let addonsPrice = 0;
      const selectedAddons: any[] = [];
      if (item.addonIds && Array.isArray(item.addonIds)) {
        for (const addonId of item.addonIds) {
          const addon = menuItem.addons.find((a) => a.id === addonId);
          if (addon) {
            addonsPrice += addon.price;
            selectedAddons.push({ addonId: addon.id, price: addon.price });
          }
        }
      }

      const itemTotalPrice = (unitPrice + addonsPrice) * (item.quantity || 1);
      subTotal += itemTotalPrice;

      validatedItemsData.push({
        menuItemId: menuItem.id,
        variantId: item.variantId || null,
        quantity: item.quantity || 1,
        unitPrice: unitPrice + addonsPrice,
        totalPrice: itemTotalPrice,
        specialNotes: item.specialNotes || null,
        modifiers: selectedAddons.length > 0 ? { create: selectedAddons } : undefined,
      });
    }

    // Apply coupon if provided
    let discountAmount = 0;
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.toUpperCase().trim() },
      });

      if (coupon && coupon.isActive && new Date() <= coupon.validUntil && subTotal >= coupon.minOrderAmount) {
        if (coupon.discountType === 'FLAT') {
          discountAmount = coupon.discountValue;
        } else if (coupon.discountType === 'PERCENTAGE') {
          discountAmount = (subTotal * coupon.discountValue) / 100;
          if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
            discountAmount = coupon.maxDiscount;
          }
        }
        await prisma.coupon.update({
          where: { id: coupon.id },
          data: { usedCount: { increment: 1 } },
        });
      }
    }

    // 5% GST (Standard restaurant rate in India: 2.5% CGST + 2.5% SGST)
    const taxableAmount = Math.max(0, subTotal - discountAmount);
    const taxAmount = Math.round(taxableAmount * 0.05 * 100) / 100;
    const totalAmount = Math.round((taxableAmount + taxAmount) * 100) / 100;

    // Execute atomic transaction for Order, Items, Payments, Invoice, and Table status
    const createdOrder = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          branchId,
          customerId: customerId || null,
          tableId: tableId || null,
          orderNumber,
          channel,
          status: OrderStatus.CONFIRMED,
          subTotal,
          taxAmount,
          discountAmount,
          totalAmount,
          notes,
          items: {
            create: validatedItemsData,
          },
          payments: {
            create: {
              method: paymentMethod,
              amount: totalAmount,
              status: PaymentStatus.COMPLETED,
              transactionRef: `TXN-${Date.now()}`,
            },
          },
          invoice: {
            create: {
              invoiceNumber: `INV-${orderNumber}`,
              subTotal,
              cgstAmount: Math.round((taxAmount / 2) * 100) / 100,
              sgstAmount: Math.round((taxAmount / 2) * 100) / 100,
              discountAmount,
              totalAmount,
            },
          },
          kitchenOrders: {
            create: {
              ticketNumber: `TKT-${orderNumber.split('-').pop()}`,
              status: KitchenTicketStatus.RECEIVED,
            },
          },
        },
        include: {
          items: { include: { menuItem: true, modifiers: { include: { addon: true } } } },
          payments: true,
          table: true,
          invoice: true,
          customer: true,
        },
      });

      // Update table status if Dine-in
      if (tableId && channel === OrderChannel.DINE_IN) {
        await tx.table.update({
          where: { id: tableId },
          data: { status: TableStatus.OCCUPIED },
        });
      }

      // If customer is registered, award loyalty points (1 point per ₹20 spent)
      if (customerId) {
        const earnedPoints = Math.floor(totalAmount / 20);
        if (earnedPoints > 0) {
          const loyaltyAcc = await tx.loyaltyAccount.findUnique({ where: { customerId } });
          if (loyaltyAcc) {
            await tx.loyaltyAccount.update({
              where: { id: loyaltyAcc.id },
              data: {
                pointsBalance: { increment: earnedPoints },
                lifetimePoints: { increment: earnedPoints },
              },
            });
            await tx.loyaltyTransaction.create({
              data: {
                loyaltyAccountId: loyaltyAcc.id,
                orderId: newOrder.id,
                points: earnedPoints,
                description: `Earned on Order ${newOrder.orderNumber}`,
              },
            });
          }
          await tx.customer.update({
            where: { id: customerId },
            data: {
              totalVisits: { increment: 1 },
              totalSpend: { increment: totalAmount },
              loyaltyBalance: { increment: earnedPoints },
            },
          });
        }
      }

      return newOrder;
    });

    // Real-time broadcast
    emitOrderCreated(createdOrder);
    if (tableId) emitTableStatusChanged(tableId, TableStatus.OCCUPIED, branchId);

    res.status(201).json({
      success: true,
      message: 'Order created successfully and routed to kitchen.',
      data: createdOrder,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, message: 'Failed to process order.' });
  }
};

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const { branchId, status, channel, date, page = 1, limit = 20 } = req.query;

    const where: any = {};
    if (branchId) where.branchId = String(branchId);
    if (status) where.status = status as OrderStatus;
    if (channel) where.channel = channel as OrderChannel;

    if (date) {
      const d = new Date(String(date));
      const startOfDay = new Date(d.setHours(0, 0, 0, 0));
      const endOfDay = new Date(d.setHours(23, 59, 59, 999));
      where.createdAt = { gte: startOfDay, lte: endOfDay };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          items: { include: { menuItem: true, modifiers: { include: { addon: true } } } },
          payments: true,
          table: true,
          customer: true,
          kitchenOrders: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: Number(limit),
      }),
      prisma.order.count({ where }),
    ]);

    res.json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      data: orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve orders.' });
  }
};

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findFirst({
      where: {
        OR: [{ id }, { orderNumber: id }],
      },
      include: {
        items: { include: { menuItem: { include: { images: true } }, modifiers: { include: { addon: true } } } },
        payments: true,
        table: true,
        customer: true,
        invoice: true,
        kitchenOrders: true,
      },
    });

    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found.' });
      return;
    }

    res.json({ success: true, data: order });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve order details.' });
  }
};

export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !Object.values(OrderStatus).includes(status)) {
      res.status(400).json({ success: false, message: 'Invalid order status.' });
      return;
    }

    const order = await prisma.order.findUnique({
      where: { id },
      include: { table: true, items: { include: { menuItem: { include: { recipe: { include: { ingredients: true } } } } } } },
    });

    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found.' });
      return;
    }

    const updated = await prisma.$transaction(async (tx) => {
      const ord = await tx.order.update({
        where: { id },
        data: { status: status as OrderStatus },
      });

      // Free up table if order is completed or cancelled
      if (order.tableId && (status === OrderStatus.COMPLETED || status === OrderStatus.CANCELLED)) {
        await tx.table.update({
          where: { id: order.tableId },
          data: { status: TableStatus.AVAILABLE },
        });
        emitTableStatusChanged(order.tableId, TableStatus.AVAILABLE, order.branchId);
      }

      // If order is COMPLETED, deduct recipe ingredients from inventory
      if (status === OrderStatus.COMPLETED && order.status !== OrderStatus.COMPLETED) {
        for (const item of order.items) {
          const recipe = item.menuItem.recipe;
          if (recipe && recipe.ingredients.length > 0) {
            for (const ing of recipe.ingredients) {
              const deductionQty = ing.quantity * item.quantity;
              await tx.inventoryItem.update({
                where: { id: ing.inventoryItemId },
                data: { currentStock: { decrement: deductionQty } },
              });
              await tx.inventoryTransaction.create({
                data: {
                  inventoryItemId: ing.inventoryItemId,
                  type: InventoryTransactionType.RECIPE_CONSUMPTION,
                  quantity: -deductionQty,
                  costPerUnit: 0,
                  totalCost: 0,
                  notes: `Auto-deducted for Order ${order.orderNumber} (${item.menuItem.name})`,
                  referenceId: order.id,
                },
              });
            }
          }
        }
      }

      return ord;
    });

    emitOrderStatusChanged(order.id, status, order.branchId);

    res.json({
      success: true,
      message: `Order status updated to ${status}`,
      data: updated,
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ success: false, message: 'Failed to update order status.' });
  }
};
