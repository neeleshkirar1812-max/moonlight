import express from 'express';
import {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  assignEmployees,
  addInternalNote,
  sendQuotation,
  convertToBooking,
  exportEnquiriesExcel,
} from '../controllers/enquiryController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';
import { enquiryLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public luxury 8-step submission
router.post('/', enquiryLimiter, createEnquiry);

// Protected Admin / Employee management
router.get('/', protect, authorizeRoles('admin', 'superadmin', 'employee'), getEnquiries);
router.get('/export/excel', protect, authorizeRoles('admin', 'superadmin'), exportEnquiriesExcel);
router.get('/:id', protect, getEnquiryById);

router.put('/:id/status', protect, authorizeRoles('admin', 'superadmin'), updateEnquiryStatus);
router.put('/:id/assign', protect, authorizeRoles('admin', 'superadmin'), assignEmployees);
router.post('/:id/notes', protect, authorizeRoles('admin', 'superadmin', 'employee'), addInternalNote);
router.post('/:id/quotation', protect, authorizeRoles('admin', 'superadmin'), sendQuotation);
router.post('/:id/convert-to-booking', protect, authorizeRoles('admin', 'superadmin'), convertToBooking);

export default router;
