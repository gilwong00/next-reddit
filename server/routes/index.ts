import { Router, Request, Response } from 'express';
import userRoutes from './user';
import postRoutes from './post';

const router: Router = Router();

router.get('/healthcheck', (_: Request, res: Response) =>
  res.status(200).json({ status: 'api is up and running' })
);

router.use('/user', userRoutes);
router.use('/post', postRoutes);

export default router;
