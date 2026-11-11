import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/db';
import { UserRoleType } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'kickbunk360_fallback_secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { emailOrPhone, password } = req.body;
    if (!emailOrPhone || !password) {
      res.status(400).json({ success: false, message: 'Please provide email/phone and password.' });
      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: emailOrPhone.toLowerCase().trim() },
          { phone: emailOrPhone.trim() },
        ],
      },
      include: {
        userRoles: { include: { role: true } },
        employee: { select: { branchId: true, employeeCode: true, designation: true } },
        customer: { select: { id: true, loyaltyBalance: true } },
      },
    });

    if (!user || !user.isActive) {
      res.status(401).json({ success: false, message: 'Invalid credentials or account inactive.' });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      res.status(401).json({ success: false, message: 'Invalid credentials or account inactive.' });
      return;
    }

    const roleCodes = user.userRoles.map((ur) => ur.role.code as UserRoleType);
    const branchId = user.employee?.branchId || null;

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        roles: roleCodes,
        branchId,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN as any }
    );

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          roles: roleCodes,
          branchId,
          employee: user.employee,
          customer: user.customer,
        },
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Internal server error during login.' });
  }
};

export const registerCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, phone, password } = req.body;
    if (!fullName || !phone || !password) {
      res.status(400).json({ success: false, message: 'Name, phone number and password are required.' });
      return;
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          email ? { email: email.toLowerCase().trim() } : {},
          { phone: phone.trim() },
        ],
      },
    });

    if (existingUser) {
      res.status(409).json({ success: false, message: 'An account with this email or phone number already exists.' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const customerRole = await prisma.role.findUniqueOrThrow({ where: { code: UserRoleType.CUSTOMER } });

    const newUser = await prisma.user.create({
      data: {
        fullName,
        email: email ? email.toLowerCase().trim() : null,
        phone: phone.trim(),
        passwordHash,
        userRoles: { create: { roleId: customerRole.id } },
        customer: {
          create: {
            name: fullName,
            phone: phone.trim(),
            email: email ? email.toLowerCase().trim() : null,
            loyaltyAccount: {
              create: {
                pointsBalance: 100, // Welcome loyalty reward
                lifetimePoints: 100,
              },
            },
          },
        },
      },
      include: {
        userRoles: { include: { role: true } },
        customer: true,
      },
    });

    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        roles: [UserRoleType.CUSTOMER],
        branchId: null,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN as any }
    );

    res.status(201).json({
      success: true,
      message: 'Account registered successfully. 100 Kick Bunk loyalty points credited!',
      data: {
        token,
        user: {
          id: newUser.id,
          fullName: newUser.fullName,
          email: newUser.email,
          phone: newUser.phone,
          roles: [UserRoleType.CUSTOMER],
          customer: newUser.customer,
        },
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Internal server error during registration.' });
  }
};

export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: {
        userRoles: { include: { role: true } },
        employee: { include: { branch: true } },
        customer: { include: { addresses: true, loyaltyAccount: true } },
      },
    });

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found.' });
      return;
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        roles: user.userRoles.map((ur) => ur.role.code),
        employee: user.employee,
        customer: user.customer,
      },
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};
