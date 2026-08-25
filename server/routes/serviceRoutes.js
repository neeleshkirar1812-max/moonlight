import express from 'express';
import {
  getServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getServices);
router.get('/:slug', getServiceBySlug);

router.post('/', protect, authorizeRoles('admin', 'superadmin'), createService);
router.put('/:id', protect, authorizeRoles('admin', 'superadmin'), updateService);
router.delete('/:id', protect, authorizeRoles('admin', 'superadmin'), deleteService);

export default router;
