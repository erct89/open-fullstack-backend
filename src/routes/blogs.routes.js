import { Router } from 'express';
import { check } from 'express-validator';
import Validations from '../helpers/validationDBBlogs.helper.js';
import validateFields from '../middlewares/validateFields.middleware.js';
import Controller from '../controllers/blogs.controller.js';

export const router = new Router();

// Validations
const checkErrorsFields = [validateFields];
const validationsID = [check('id', 'The id is not correct').isMongoId()];

const validateCreateBlog = [
  check('title').exists().isString(),
  check('author').exists().isString(),
  check('url').exists().isURL().custom(Validations.validateUniqueURL),
  ...checkErrorsFields
];
const validateGetBlog = [...validationsID, ...checkErrorsFields];
const validateUpdateBlog = [
  ...validationsID,
  check('title').exists().isString(),
  check('author').exists().isString(),
  check('url').exists().isURL().custom(Validations.validateUniqueURL),
  check('likes').exists().isNumeric(),
  ...checkErrorsFields
];
const validateMofidfyBlog = [
  ...validationsID,
  check('title').optional().isString(),
  check('author').optional().isString(),
  check('url').optional().isURL().custom(Validations.validateUniqueURL),
  check('likes').optional().isNumeric(),
  ...checkErrorsFields
];

// Routers
router.get('/', checkErrorsFields, Controller.getBlogs);
router.post('/', validateCreateBlog, Controller.createBlog);
router.get('/:id', validateGetBlog, Controller.getBlog);
router.put('/:id', validateUpdateBlog, Controller.updateBlog);
router.patch('/:id', validateMofidfyBlog, Controller.modifyBlog);
router.delete('/:id', [...validationsID, ...checkErrorsFields], Controller.removeBlog);

export default router;
