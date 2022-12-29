import { Router } from 'express';
import * as noteController from '../controllers/notes.controller.js';
import validateAuthorization from '../middlewares/validateAuthorization.middleware.js';
import validateFields from '../middlewares/validateFields.middleware.js';

export const router = new Router();

const commonValidations = [validateAuthorization, validateFields];


router.get('/', commonValidations, noteController.getNotes);

router.post('/', commonValidations, noteController.createNote);

router.get('/:id', commonValidations, noteController.getNote);

router.put('/:id', commonValidations, noteController.updateNote);

router.patch('/:id', commonValidations, noteController.modifyNote);

router.delete('/:id', commonValidations, noteController.removeNote);

export default router;