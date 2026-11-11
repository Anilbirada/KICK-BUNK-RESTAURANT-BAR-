import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const createInquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { branchId, name, email, phone, subject, message } = req.body;

    if (!name || !phone || !message) {
      res.status(400).json({ success: false, message: 'Name, phone number and message are required.' });
      return;
    }

    const inquiry = await prisma.contactInquiry.create({
      data: {
        branchId: branchId || null,
        name,
        email: email || null,
        phone,
        subject: subject || 'General Inquiry',
        message,
        status: 'NEW',
      },
    });

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted successfully! Our team will contact you shortly.',
      data: inquiry,
    });
  } catch (error) {
    console.error('Error creating contact inquiry:', error);
    res.status(500).json({ success: false, message: 'Failed to submit inquiry.' });
  }
};

export const getInquiries = async (req: Request, res: Response): Promise<void> => {
  try {
    const { branchId, status } = req.query;

    const where: any = {};
    if (branchId) where.branchId = String(branchId);
    if (status) where.status = String(status);

    const inquiries = await prisma.contactInquiry.findMany({
      where,
      include: {
        branch: { select: { id: true, name: true, city: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve inquiries.' });
  }
};

export const updateInquiryStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, response } = req.body;

    const inquiry = await prisma.contactInquiry.update({
      where: { id },
      data: {
        status: status || undefined,
        response: response || undefined,
      },
    });

    res.json({ success: true, message: 'Inquiry updated successfully.', data: inquiry });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    res.status(500).json({ success: false, message: 'Failed to update inquiry.' });
  }
};
