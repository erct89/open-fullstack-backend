import { Router } from 'express';
import { check, body } from 'express-validator';
import { validateUniqueUser } from '../helpers/validationDBUsers.helper.js';
import validateFields from '../middlewares/validateFields.middleware.js';
import userController from '../controllers/users.controller.js';

const router = new Router();

router.get('/', userController.getUsers);

router.post('/', [
  body('email', 'Invalid date from user').normalizeEmail().isEmail().withMessage('Not is Email').custom(validateUniqueUser('email')),
  body('name', 'Invalid date from user').exists().isLength({ min: 3 }).isString().custom(validateUniqueUser('name')),
  check('password', 'Invalid date from user').exists().isLength({ min: 8 }).withMessage('Password minimum length is 8 chars').isString(),
  validateFields
], userController.createUser);

router.get('/:id', userController.getUser);

router.put('/:id', userController.updateUser);

router.patch('/:id', userController.modifyUser);

router.delete('/:id', userController.removeUser);

export const usersRoutes = router;
export default usersRoutes;