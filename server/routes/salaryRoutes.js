import express from 'express';
import {
  getSalarySlips,
  createSalarySlip,
  bulkGenerateSalarySlips,
  markSalaryPaid,
} from '../controllers/salaryController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Employees can view their own slips, Admins can view all
router.get('/', protect, getSalarySlips);

// Admin-only management endpoints
router.post('/', protect, authorizeRoles('admin', 'superadmin'), createSalarySlip);
router.post('/bulk', protect, authorizeRoles('admin', 'superadmin'), bulkGenerateSalarySlips);
router.patch('/:id/pay', protect, authorizeRoles('admin', 'superadmin'), markSalaryPaid);

export default router;
