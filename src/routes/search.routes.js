import { Router } from 'express';
import { search } from '../controllers/search.controller.js';

export const router = new Router();

/**
 * Get /:collection/:match
 */
router.get('/:collection/:match', search);

export default router;