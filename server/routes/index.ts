import { Router, Request, Response } from 'express';
import userRoutes from './user';

const router: Router = Router();

router.get('/healthcheck', (_: Request, res: Response) => {
  return res.status(200).json({ status: 'api is up and running' });
});

router.use('/user', userRoutes);

export default router;
