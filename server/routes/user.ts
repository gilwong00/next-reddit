import { Router } from 'express';
import { userController } from '../controllers';

const router: Router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/whoami', userController.whoami);

export default router;
