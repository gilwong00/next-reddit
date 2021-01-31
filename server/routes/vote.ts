import { Router } from 'express';
import { voteController } from '../controllers';
import { isAuth } from '../middleware';

const router: Router = Router();

router.post('/', isAuth, voteController.vote);

export default router;
