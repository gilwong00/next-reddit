import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
  session: Express.Session;
  userId?: number;
}

const isAuth = (req: AuthRequest, _: Response, next: NextFunction) => {
  if (!req.session.userId) throw new Error('Unauthenticated');
  return next();
};

export default isAuth;
