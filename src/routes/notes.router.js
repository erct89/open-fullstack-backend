import { Router } from 'express';
import * as noteController from '../controller/notes.controller.js';

export const router = new Router();

/**
 * GET /notes
 */
router.get('/', noteController.getNotes);

router.post('/', noteController.createNote);

router.get('/:id', noteController.getNote);

router.put('/:id', noteController.updateNote);

router.patch('/:id', noteController.modifyNote);

router.delete('/:id', noteController.removeNote);

export default router;