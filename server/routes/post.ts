import { Router } from 'express';
import { postController } from '../controllers';
import { isAuth } from '../middleware';

const router: Router = Router();

router.get('/', postController.getPosts);
router.post('/', isAuth, postController.getPosts);

export default router;
