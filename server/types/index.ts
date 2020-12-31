import { Request } from 'express';

export interface AuthRequest extends Request {
  session: Express.Session;
  userId?: number;
}
