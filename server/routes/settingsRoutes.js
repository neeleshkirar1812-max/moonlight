import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getSettings);
router.put('/', protect, authorizeRoles('admin', 'superadmin'), updateSettings);

export default router;
