import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRoleType } from '@prisma/client';

export interface AuthUser {
  userId: string;
  email?: string | null;
  roles: UserRoleType[];
  branchId?: string | null;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'kickbunk360_fallback_secret_key';

export const authenticateJwt = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Authentication required. No token provided.' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Invalid or expired authentication token.' });
  }
};

export const requireRoles = (allowedRoles: UserRoleType[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const hasRole = req.user.roles.some((r) => allowedRoles.includes(r) || r === UserRoleType.SUPER_ADMIN);
    if (!hasRole) {
      res.status(403).json({
        success: false,
        message: `Forbidden. Requires one of roles: ${allowedRoles.join(', ')}`,
      });
      return;
    }

    next();
  };
};
