import { Request, Response, NextFunction } from 'express';
import JWT from '../utils/JWT';

export default function isAuthenticated(req: Request, res: Response, next: NextFunction)
  : Response | void {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const data = authorization.split(' ');

  if (!data[1] || !JWT.revalidateToken(data[1])) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  next();
}
