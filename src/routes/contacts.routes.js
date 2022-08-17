import { Router } from 'express';
import { check, param } from 'express-validator';
import * as contactsController from '../controller/contacts.controller.js';
import {
  isUniqueContactName,
  isUniqueContactPhoneNumber,
} from '../helpers/validationContact.helper.js';
import validateFields from '../middlewares/validateFields..middleware.js';

const router = new Router();

/**
 * Routes for Contacts
 */
router.get('/', contactsController.getContacts);
router.post(
  '/',
  [
    check('name', 'The contact name is required').exists(),
    check('name', 'The contact name must be unique').custom(isUniqueContactName('ERROR-VALIDATION')),
    check('phoneNumber', 'The contact phoneNumber is required').exists(),
    check('phoneNumber', 'The contact phoneNumber must be unique').custom(isUniqueContactPhoneNumber('ERROR-VALIDATION')),
    validateFields,
  ],
  contactsController.createContact
);

router.get(
  '/:id',
  [param('id', 'The id is not valid').isMongoId(), validateFields],
  contactsController.getContact
);

router.put(
  '/:id',
  [
    param('id', 'The id is not valid').isMongoId(),
    check('name', 'The contact name is required').exists(),
    check('name', 'The contact name must be unique').custom(isUniqueContactName('ERROR-VALIDATION')),
    check('phoneNumber', 'The phoneNumber is required').exists(),
    check('phoneNumber', 'The phoneNumber must be unique').custom(isUniqueContactPhoneNumber('ERROR-VALIDATION')),
    validateFields,
  ],
  contactsController.updateContact
);

router.patch(
  '/:id',
  [
    param('id', 'The id is not valid').isMongoId(),
    check('name', 'The contact name must be unique').optional().custom(isUniqueContactName('ERROR-VALIDATION')),
    check('phoneNumber', 'The phoneNumber must be unique').optional().custom(isUniqueContactPhoneNumber('ERROR-VALIDATION')),
    check('active', 'The active must be boolean').optional().isBoolean(),
    validateFields,
  ],
  contactsController.modifyContact
);

router.delete(
  '/:id',
  [param('id', 'The id is not valid').isMongoId(), validateFields],
  contactsController.removeContact
);

export default router;
