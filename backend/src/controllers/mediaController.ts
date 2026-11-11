import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { MediaCategory } from '@prisma/client';

export const getMediaAssets = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, subCategory, search } = req.query;

    const where: any = { isApproved: true };

    if (category && category !== 'ALL') {
      where.category = category as MediaCategory;
    }

    if (subCategory && subCategory !== 'ALL') {
      where.subCategory = String(subCategory);
    }

    if (search) {
      const q = String(search).trim();
      where.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { altText: { contains: q, mode: 'insensitive' } },
        { sourceNotes: { contains: q, mode: 'insensitive' } },
      ];
    }

    const assets = await prisma.mediaAsset.findMany({
      where,
      orderBy: [{ featuredInHero: 'desc' }, { createdAt: 'desc' }],
    });

    res.json({ success: true, count: assets.length, data: assets });
  } catch (error) {
    console.error('Error fetching media assets:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve media assets.' });
  }
};

export const createMediaAsset = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, subCategory, title, url, thumbnailUrl, altText, sourceNotes, externalSourceUrl, featuredInHero } = req.body;

    if (!category || !title || !url) {
      res.status(400).json({ success: false, message: 'Category, title and media URL are required.' });
      return;
    }

    const asset = await prisma.mediaAsset.create({
      data: {
        category: category as MediaCategory,
        subCategory: subCategory || null,
        title,
        url,
        thumbnailUrl: thumbnailUrl || url,
        altText: altText || title,
        sourceNotes: sourceNotes || null,
        externalSourceUrl: externalSourceUrl || null,
        featuredInHero: Boolean(featuredInHero),
        isApproved: true,
      },
    });

    res.status(201).json({ success: true, message: 'Media asset uploaded successfully.', data: asset });
  } catch (error) {
    console.error('Error creating media asset:', error);
    res.status(500).json({ success: false, message: 'Failed to create media asset.' });
  }
};

export const updateMediaAsset = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { category, subCategory, title, url, thumbnailUrl, altText, sourceNotes, externalSourceUrl, featuredInHero, isApproved } = req.body;

    const existing = await prisma.mediaAsset.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'Media asset not found.' });
      return;
    }

    const updated = await prisma.mediaAsset.update({
      where: { id },
      data: {
        category: category !== undefined ? (category as MediaCategory) : undefined,
        subCategory: subCategory !== undefined ? subCategory : undefined,
        title: title !== undefined ? title : undefined,
        url: url !== undefined ? url : undefined,
        thumbnailUrl: thumbnailUrl !== undefined ? thumbnailUrl : undefined,
        altText: altText !== undefined ? altText : undefined,
        sourceNotes: sourceNotes !== undefined ? sourceNotes : undefined,
        externalSourceUrl: externalSourceUrl !== undefined ? externalSourceUrl : undefined,
        featuredInHero: featuredInHero !== undefined ? Boolean(featuredInHero) : undefined,
        isApproved: isApproved !== undefined ? Boolean(isApproved) : undefined,
      },
    });

    res.json({ success: true, message: 'Media asset updated successfully.', data: updated });
  } catch (error) {
    console.error('Error updating media asset:', error);
    res.status(500).json({ success: false, message: 'Failed to update media asset.' });
  }
};

export const deleteMediaAsset = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const existing = await prisma.mediaAsset.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'Media asset not found.' });
      return;
    }

    await prisma.mediaAsset.delete({ where: { id } });

    res.json({ success: true, message: 'Media asset deleted successfully.' });
  } catch (error) {
    console.error('Error deleting media asset:', error);
    res.status(500).json({ success: false, message: 'Failed to delete media asset.' });
  }
};
