import { Router } from 'express';
import userController from '../controllers/users.controller.js';

const router = new Router();

router.get('/', userController.getNotes);

router.post('/', userController.createNote);

router.get('/:id', userController.getNote);

router.put('/:id', userController.updateNote);

router.patch('/:id', userController.modifyNote);

router.delete('/:id', userController.removeNote);

export const usersRoutes = router;
export default usersRoutes;