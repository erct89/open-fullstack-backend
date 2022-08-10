import { Router } from 'express';
import * as contactsController from '../controller/contacts.controller.js';

const router = new Router();

/** */
router.get('/', contactsController.getContacts);
router.post('/', contactsController.createContact);
router.get('/:id', contactsController.getContact);
router.put('/:id', contactsController.updateContact);
router.patch('/:id', contactsController.modifyContact);
router.delete('/:id', contactsController.removeContact);

export default router;