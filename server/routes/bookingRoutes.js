import express from 'express';
import {
  getBookings,
  getBookingById,
  updateBookingStatus,
  assignBookingTeam,
  exportBookingsExcel,
  updateBookingStage,
} from '../controllers/bookingController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getBookings);
router.get('/export/excel', protect, authorizeRoles('admin', 'superadmin'), exportBookingsExcel);
router.get('/:id', protect, getBookingById);

router.put('/:id/status', protect, authorizeRoles('admin', 'superadmin'), updateBookingStatus);
router.patch('/:id/stage', protect, authorizeRoles('admin', 'superadmin', 'employee'), updateBookingStage);
router.put('/:id/assign', protect, authorizeRoles('admin', 'superadmin'), assignBookingTeam);

export default router;
