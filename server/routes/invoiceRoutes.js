import express from 'express';
import {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  resendInvoice,
  deleteInvoice,
} from '../controllers/invoiceController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getInvoices);
router.get('/:id', protect, getInvoiceById);

// Admin-only creation and management
router.post('/', protect, authorizeRoles('admin', 'superadmin'), createInvoice);
router.put('/:id', protect, authorizeRoles('admin', 'superadmin'), updateInvoice);
router.post('/:id/send', protect, authorizeRoles('admin', 'superadmin'), resendInvoice);
router.delete('/:id', protect, authorizeRoles('admin', 'superadmin'), deleteInvoice);

export default router;
