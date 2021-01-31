import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';

const isAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.session.userId) return res.status(401).send('Unauthorized');
  return next();
};

export default isAuth;
