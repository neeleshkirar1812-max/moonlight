import express from 'express';
import { getVideos, createVideo, updateVideo, deleteVideo } from '../controllers/videoController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getVideos);
router.post('/', protect, authorizeRoles('admin', 'superadmin'), createVideo);
router.put('/:id', protect, authorizeRoles('admin', 'superadmin'), updateVideo);
router.delete('/:id', protect, authorizeRoles('admin', 'superadmin'), deleteVideo);

export default router;
