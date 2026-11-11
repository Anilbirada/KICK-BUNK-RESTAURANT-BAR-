import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const validateCoupon = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code, orderAmount } = req.body;

    if (!code || orderAmount === undefined) {
      res.status(400).json({ success: false, message: 'Coupon code and order amount are required.' });
      return;
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: String(code).toUpperCase().trim() },
    });

    if (!coupon || !coupon.isActive) {
      res.status(404).json({ success: false, message: 'Invalid or expired coupon code.' });
      return;
    }

    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validUntil) {
      res.status(400).json({ success: false, message: 'This coupon has expired or is not yet active.' });
      return;
    }

    if (Number(orderAmount) < coupon.minOrderAmount) {
      res.status(400).json({
        success: false,
        message: `Minimum order amount of ₹${coupon.minOrderAmount} required for coupon ${coupon.code}.`,
      });
      return;
    }

    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      res.status(400).json({ success: false, message: 'Coupon usage limit has been reached.' });
      return;
    }

    let discount = 0;
    if (coupon.discountType === 'FLAT') {
      discount = coupon.discountValue;
    } else if (coupon.discountType === 'PERCENTAGE') {
      discount = (Number(orderAmount) * coupon.discountValue) / 100;
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    }

    res.json({
      success: true,
      message: 'Coupon is valid!',
      data: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        calculatedDiscount: Math.round(discount * 100) / 100,
      },
    });
  } catch (error) {
    console.error('Error validating coupon:', error);
    res.status(500).json({ success: false, message: 'Failed to validate coupon.' });
  }
};

export const getCustomerLoyalty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { customerId } = req.params;

    const account = await prisma.loyaltyAccount.findUnique({
      where: { customerId },
      include: {
        transactions: { orderBy: { createdAt: 'desc' }, take: 20 },
      },
    });

    if (!account) {
      res.status(404).json({ success: false, message: 'Loyalty account not found.' });
      return;
    }

    res.json({ success: true, data: account });
  } catch (error) {
    console.error('Error fetching loyalty account:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve loyalty account.' });
  }
};

export const submitCustomerFeedback = async (req: Request, res: Response): Promise<void> => {
  try {
    const { customerName, customerId, rating, foodQuality, ambienceRating, serviceRating, comments } = req.body;

    if (!customerName || !rating) {
      res.status(400).json({ success: false, message: 'Customer name and star rating are required.' });
      return;
    }

    const feedback = await prisma.customerFeedback.create({
      data: {
        customerId: customerId || null,
        customerName,
        rating: Number(rating),
        foodQuality: foodQuality ? Number(foodQuality) : null,
        ambienceRating: ambienceRating ? Number(ambienceRating) : null,
        serviceRating: serviceRating ? Number(serviceRating) : null,
        comments: comments || null,
        isPublic: true,
      },
    });

    res.status(201).json({ success: true, message: 'Feedback submitted! Thank you.', data: feedback });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ success: false, message: 'Failed to submit feedback.' });
  }
};

export const getPublicFeedbacks = async (req: Request, res: Response): Promise<void> => {
  try {
    const feedbacks = await prisma.customerFeedback.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    res.json({ success: true, data: feedbacks });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve feedback.' });
  }
};
