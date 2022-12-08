import { Router } from 'express';
import { check } from 'express-validator';
import userController from '../controllers/users.controller.js';

const router = new Router();

router.get('/', userController.getUsers);

router.post('/', [
  check('email').exists().isEmail()
], userController.createUser);

router.get('/:id', userController.getUser);

router.put('/:id', userController.updateUser);

router.patch('/:id', userController.modifyUser);

router.delete('/:id', userController.removeUser);

export const usersRoutes = router;
export default usersRoutes;