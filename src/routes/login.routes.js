import { Router } from 'express';
import { login } from '../controllers/login.controller.js';

export const router = new Router();

router.post('/', login);

export default router;