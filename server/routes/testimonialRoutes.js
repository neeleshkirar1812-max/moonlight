import express from 'express';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTestimonials);
router.post('/', protect, authorizeRoles('admin', 'superadmin'), createTestimonial);
router.put('/:id', protect, authorizeRoles('admin', 'superadmin'), updateTestimonial);
router.delete('/:id', protect, authorizeRoles('admin', 'superadmin'), deleteTestimonial);

export default router;
