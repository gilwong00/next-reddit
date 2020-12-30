import express, { Router } from 'express';
import { userController } from '../controllers';

const router: Router = express.Router();

router.get('/register', userController.register);

export default router;