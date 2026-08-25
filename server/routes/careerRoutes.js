import express from 'express';
import {
  getCareers,
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer,
  applyForJob,
  getApplications,
  updateApplicationStatus,
} from '../controllers/careerController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getCareers);
router.get('/:id', getCareerById);
router.post('/apply', applyForJob);

router.post('/', protect, authorizeRoles('admin', 'superadmin'), createCareer);
router.put('/:id', protect, authorizeRoles('admin', 'superadmin'), updateCareer);
router.delete('/:id', protect, authorizeRoles('admin', 'superadmin'), deleteCareer);

router.get('/admin/applications', protect, authorizeRoles('admin', 'superadmin'), getApplications);
router.put('/admin/applications/:id', protect, authorizeRoles('admin', 'superadmin'), updateApplicationStatus);

export default router;
