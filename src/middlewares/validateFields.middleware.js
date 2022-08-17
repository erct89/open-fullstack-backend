import { validationResult } from 'express-validator';

export const validateFields = (req, resp, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    resp.status(400).json({ message: 'VALIDATION ERRORS', errors: errors.errors });
    return;
  }

  next();
};

export default validateFields;
