import express from 'express';
import {
  getAdmins,
  createAdminUser,
  deleteAdminUser,
  getAuditLogs,
  getSystemConfig,
} from '../controllers/superAdminController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Strictly Super Admin only
router.use(protect);
router.use(authorizeRoles('superadmin'));

router.get('/admins', getAdmins);
router.post('/admins', createAdminUser);
router.delete('/admins/:id', deleteAdminUser);

router.get('/audit-logs', getAuditLogs);
router.get('/system-config', getSystemConfig);

export default router;
