import express from 'express';
import {
  getGalleries,
  getGalleryById,
  createGallery,
  addGalleryItems,
  toggleFavorite,
  updateGallery,
  deleteGalleryItem,
} from '../controllers/galleryController.js';
import { protect, authorizeRoles, verifyGalleryAccess } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getGalleries);
router.get('/:id', protect, verifyGalleryAccess, getGalleryById);

router.post('/', protect, authorizeRoles('admin', 'superadmin'), createGallery);
router.put('/:id', protect, authorizeRoles('admin', 'superadmin'), updateGallery);
router.post('/:id/items', protect, authorizeRoles('admin', 'superadmin'), addGalleryItems);
router.delete('/items/:itemId', protect, authorizeRoles('admin', 'superadmin'), deleteGalleryItem);

router.post('/items/:itemId/favorite', protect, toggleFavorite);

export default router;
