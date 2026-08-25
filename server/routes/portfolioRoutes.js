import express from 'express';
import {
  getPortfolios,
  getPortfolioBySlug,
  getPortfolioCategories,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} from '../controllers/portfolioController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPortfolios);
router.get('/categories', getPortfolioCategories);
router.get('/:slug', getPortfolioBySlug);

router.post('/', protect, authorizeRoles('admin', 'superadmin'), createPortfolio);
router.put('/:id', protect, authorizeRoles('admin', 'superadmin'), updatePortfolio);
router.delete('/:id', protect, authorizeRoles('admin', 'superadmin'), deletePortfolio);

export default router;
