import express from 'express';
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);

router.post('/', protect, authorizeRoles('admin', 'superadmin'), createBlog);
router.put('/:id', protect, authorizeRoles('admin', 'superadmin'), updateBlog);
router.delete('/:id', protect, authorizeRoles('admin', 'superadmin'), deleteBlog);

export default router;
