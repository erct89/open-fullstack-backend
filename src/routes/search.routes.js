import { Router } from 'express';
import { search } from '../controller/search.controller.js';

export const router = new Router();

/**
 * Get /:collection/:match
 */
router.get('/:collection/:match', search);

export default router;