import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function Role(...Roles: string[]) {
  return (req: Request, res: Response, next: NextFunction):void => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const token = authHeader.split(' ')[1];
      const secret = process.env.JWT_SECRET || 'yashwanth';
      const decoded = jwt.verify(token, secret) as { role: string };

      if (!Roles.includes(decoded.role)) {
        res.status(403).json({ message: 'error' });
        return ;
      }

      (req as any).user = decoded;

      next();
    } catch (err) {
       res.status(403).json({ message: 'Invalid' });
    }
  };
}
