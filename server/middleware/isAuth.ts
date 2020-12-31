import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';

const isAuth = (req: AuthRequest, _: Response, next: NextFunction) => {
  if (!req.session.userId) throw new Error('Unauthenticated');
  return next();
};

export default isAuth;
