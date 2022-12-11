import { Router } from 'express';
import { body } from 'express-validator';
import { validateUniqueUser } from '../helpers/validationDBUsers.helper.js';
import validateFields from '../middlewares/validateFields.middleware.js';
import userController from '../controllers/users.controller.js';

const router = new Router();

router.get('/', userController.getUsers);

router.post('/', [
  body('email', 'Invalid date from user').exists().withMessage('Email is required').normalizeEmail().isEmail().withMessage('Not is Email').custom(validateUniqueUser('email')),
  body('name', 'Invalid date from user').exists().withMessage('Name is required').isLength({ min: 3 }).isString().custom(validateUniqueUser('name')),
  body('password', 'Invalid date from user').exists().withMessage('Password is required').isLength({ min: 8 }).withMessage('Password minimum length is 8 chars').isString(),
  validateFields
], userController.createUser);

router.get('/:id', userController.getUser);

router.put('/:id', userController.updateUser);

router.patch('/:id', userController.modifyUser);

router.delete('/:id', userController.removeUser);

export const usersRoutes = router;
export default usersRoutes;