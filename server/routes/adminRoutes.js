import express from 'express';
import {
  getDashboardKPIs,
  getAdminCustomers,
  getAdminEmployees,
  createEmployee,
} from '../controllers/adminController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', protect, authorizeRoles('admin', 'superadmin'), getDashboardKPIs);
router.get('/customers', protect, authorizeRoles('admin', 'superadmin'), getAdminCustomers);
router.get('/employees', protect, authorizeRoles('admin', 'superadmin'), getAdminEmployees);
router.post('/employees', protect, authorizeRoles('admin', 'superadmin'), createEmployee);

export default router;
