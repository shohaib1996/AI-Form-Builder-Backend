import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

const JWT_SECRET = config.JWT_SECRET || 'your_jwt_secret';

interface AuthRequest extends Request {
  user?: any;
}

export const auth = (roles: string[] = []) => {
  // console.log("roles", roles);
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    // console.log("authHeader", authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      req.user = decoded.user;
      if (roles.length && (!req.user.role || !roles.includes(req.user.role))) {
        res.status(403).json({ message: 'Forbidden: Insufficient role' });
        return;
      }
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }
  };
};
