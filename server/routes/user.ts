import { Router } from 'express';
import { userController } from '../controllers';

const router: Router = Router();

router.get('/register', userController.register);

export default router;
