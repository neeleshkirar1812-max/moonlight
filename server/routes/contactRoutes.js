import express from 'express';
import { submitContactMessage, getContactMessages, markMessageRead } from '../controllers/contactController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.post('/', submitContactMessage);
router.get('/', protect, authorizeRoles('admin', 'superadmin'), getContactMessages);
router.put('/:id/read', protect, authorizeRoles('admin', 'superadmin'), markMessageRead);

export default router;
