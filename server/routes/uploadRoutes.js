import express from 'express';
import { upload } from '../middleware/upload.js';
import { uploadMediaBuffer } from '../services/cloudinaryService.js';
import { protect, authorizeRoles } from '../middleware/auth.js';
import { AppError } from '../middleware/error.js';

const router = express.Router();

// @desc    Upload media to Cloudinary
// @route   POST /api/upload
// @access  Private (Admin / Employee / Customer for resume/avatar)
router.post('/', protect, upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new AppError('No file provided for upload', 400));
    }

    const { folder = 'lumiere/general', resourceType = 'auto' } = req.body;

    const result = await uploadMediaBuffer(req.file.buffer, {
      folder,
      resource_type: resourceType,
    });

    res.status(200).json({
      success: true,
      message: 'File uploaded to Cloudinary successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Multi-upload media to Cloudinary (e.g. for batch gallery upload)
// @route   POST /api/upload/batch
// @access  Private (Admin / Employee)
router.post('/batch', protect, authorizeRoles('admin', 'superadmin', 'employee'), upload.array('files', 20), async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return next(new AppError('No files uploaded', 400));
    }

    const { folder = 'lumiere/customer-galleries' } = req.body;

    const uploadPromises = req.files.map(file =>
      uploadMediaBuffer(file.buffer, { folder })
    );

    const results = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
