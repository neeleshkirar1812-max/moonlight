import Portfolio from '../models/Portfolio.js';
import PortfolioCategory from '../models/PortfolioCategory.js';
import { uploadMediaBuffer, deleteCloudinaryMedia } from '../services/cloudinaryService.js';
import { AppError } from '../middleware/error.js';

// @desc    Get all portfolio items with filtering, search, and pagination
// @route   GET /api/portfolio
// @access  Public
export const getPortfolios = async (req, res, next) => {
  try {
    const { category, isFeatured, search, page = 1, limit = 12 } = req.query;
    const query = {};

    if (category && category !== 'all') {
      query.category = category.toLowerCase();
    }

    if (isFeatured !== undefined) {
      query.isFeatured = isFeatured === 'true';
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { coupleName: { $regex: search, $options: 'i' } },
        { 'location.city': { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Portfolio.countDocuments(query);
    const portfolios = await Portfolio.find(query)
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: portfolios.length,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      data: portfolios,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single portfolio item by slug
// @route   GET /api/portfolio/:slug
// @access  Public
export const getPortfolioBySlug = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findOne({ slug: req.params.slug });
    if (!portfolio) {
      return next(new AppError('Portfolio story not found.', 404));
    }

    // Increment view count
    portfolio.viewCount += 1;
    await portfolio.save();

    res.status(200).json({
      success: true,
      data: portfolio,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all portfolio categories
// @route   GET /api/portfolio/categories
// @access  Public
export const getPortfolioCategories = async (req, res, next) => {
  try {
    const categories = await PortfolioCategory.find({ isActive: true }).sort({ order: 1 });
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new portfolio entry (Admin)
// @route   POST /api/portfolio
// @access  Private/Admin
export const createPortfolio = async (req, res, next) => {
  try {
    const {
      title,
      category,
      coupleName,
      eventDate,
      location,
      coverImage,
      coverPublicId,
      images,
      videoUrl,
      description,
      isFeatured,
      tags,
    } = req.body;

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + `-${Date.now().toString().slice(-4)}`;

    const portfolio = await Portfolio.create({
      title,
      slug,
      category,
      coupleName,
      eventDate,
      location,
      coverImage,
      coverPublicId,
      images: images || [],
      videoUrl,
      description,
      isFeatured: Boolean(isFeatured),
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
    });

    res.status(201).json({
      success: true,
      message: 'Portfolio item published successfully',
      data: portfolio,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update portfolio entry (Admin)
// @route   PUT /api/portfolio/:id
// @access  Private/Admin
export const updatePortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!portfolio) {
      return next(new AppError('Portfolio item not found', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Portfolio updated successfully',
      data: portfolio,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete portfolio entry (Admin)
// @route   DELETE /api/portfolio/:id
// @access  Private/Admin
export const deletePortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return next(new AppError('Portfolio item not found', 404));
    }

    if (portfolio.coverPublicId) {
      await deleteCloudinaryMedia(portfolio.coverPublicId);
    }

    await portfolio.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Portfolio entry deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
