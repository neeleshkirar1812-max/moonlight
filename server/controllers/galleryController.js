import Gallery from '../models/Gallery.js';
import GalleryItem from '../models/GalleryItem.js';
import Notification from '../models/Notification.js';
import { getWatermarkedUrl } from '../services/cloudinaryService.js';
import { AppError } from '../middleware/error.js';
import { logAuditEvent } from '../middleware/audit.js';

// @desc    Get galleries for customer or all (Admin)
// @route   GET /api/galleries
// @access  Private
export const getGalleries = async (req, res, next) => {
  try {
    const query = {};
    if (req.user.role === 'customer') {
      query.customer = req.user._id;
    }

    const galleries = await Gallery.find(query)
      .populate('customer', 'name email avatar')
      .populate('booking', 'bookingNumber eventType eventDate')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: galleries.length,
      data: galleries,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single private gallery by ID or Slug with PIN protection
// @route   GET /api/galleries/:id
// @access  Private
export const getGalleryById = async (req, res, next) => {
  try {
    const { pin } = req.query;
    const gallery = await Gallery.findOne({
      $or: [{ _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }, { slug: req.params.id }],
    }).populate('customer', 'name email partnerName');

    if (!gallery) return next(new AppError('Gallery not found', 404));

    // Cross-customer security
    if (req.user.role === 'customer' && gallery.customer._id.toString() !== req.user._id.toString()) {
      return next(new AppError('Forbidden: Access denied to this private gallery.', 403));
    }

    // Check PIN if requested by customer
    if (req.user.role === 'customer' && gallery.accessPin && pin && gallery.accessPin !== pin) {
      return next(new AppError('Invalid Gallery Security PIN', 401));
    }

    // Fetch items grouped by section
    const items = await GalleryItem.find({ gallery: gallery._id }).sort({ section: 1, order: 1 });

    // Update watermark URLs if gallery watermarking is enabled
    const processedItems = items.map((item) => {
      const itemObj = item.toObject();
      if (gallery.watermarked && item.public_id) {
        itemObj.displayUrl = getWatermarkedUrl(item.public_id);
      } else {
        itemObj.displayUrl = item.url;
      }
      return itemObj;
    });

    res.status(200).json({
      success: true,
      gallery,
      items: processedItems,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new private customer gallery (Admin)
// @route   POST /api/galleries
// @access  Private/Admin
export const createGallery = async (req, res, next) => {
  try {
    const { title, customer, booking, eventDate, coverImage, accessPin, watermarked, downloadAllowed, expiryDate, sections } = req.body;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + `-${Date.now().toString().slice(-4)}`;

    const gallery = await Gallery.create({
      title,
      slug,
      customer,
      booking,
      eventDate: eventDate ? new Date(eventDate) : undefined,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      accessPin: accessPin || '1234',
      watermarked: Boolean(watermarked),
      downloadAllowed: downloadAllowed !== undefined ? Boolean(downloadAllowed) : true,
      expiryDate: expiryDate ? new Date(expiryDate) : undefined,
      sections: sections || [
        { name: 'Highlights', description: 'Best curated moments', order: 0 },
        { name: 'Ceremony', description: 'Sacred wedding rituals', order: 1 },
        { name: 'Portraits', description: 'Couple & Family portraits', order: 2 },
        { name: 'Reception', description: 'Evening celebrations', order: 3 },
      ],
    });

    // Notify customer
    await Notification.create({
      recipient: customer,
      title: 'Private Wedding Gallery Ready',
      message: `Your wedding album "${title}" is ready to view. PIN: ${gallery.accessPin}`,
      type: 'GALLERY_UPLOADED',
      link: `/customer/gallery/${gallery.slug}`,
    });

    res.status(201).json({
      success: true,
      message: 'Private gallery created',
      data: gallery,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add items to private gallery (Admin)
// @route   POST /api/galleries/:id/items
// @access  Private/Admin
export const addGalleryItems = async (req, res, next) => {
  try {
    const { items } = req.body; // Array of { url, public_id, section, mediaType, title, dimensions, fileSize }
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) return next(new AppError('Gallery not found', 404));

    const createdItems = await GalleryItem.insertMany(
      items.map((it, idx) => ({
        gallery: gallery._id,
        section: it.section || 'Highlights',
        mediaType: it.mediaType || 'photo',
        url: it.url,
        public_id: it.public_id,
        title: it.title || `Photo ${idx + 1}`,
        dimensions: it.dimensions,
        fileSize: it.fileSize,
        order: idx,
      }))
    );

    gallery.totalPhotos += createdItems.filter(i => i.mediaType === 'photo').length;
    gallery.totalVideos += createdItems.filter(i => i.mediaType === 'video').length;
    await gallery.save();

    res.status(201).json({
      success: true,
      message: `Added ${createdItems.length} items to gallery`,
      count: createdItems.length,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle item as favorite (Customer)
// @route   POST /api/galleries/items/:itemId/favorite
// @access  Private
export const toggleFavorite = async (req, res, next) => {
  try {
    const item = await GalleryItem.findById(req.params.itemId);
    if (!item) return next(new AppError('Gallery item not found', 404));

    const userId = req.user._id;
    const isFavorited = item.favoritedBy.includes(userId);

    if (isFavorited) {
      item.favoritedBy = item.favoritedBy.filter(id => id.toString() !== userId.toString());
      item.isFavorite = item.favoritedBy.length > 0;
    } else {
      item.favoritedBy.push(userId);
      item.isFavorite = true;
    }

    await item.save();

    res.status(200).json({
      success: true,
      isFavorite: !isFavorited,
      totalFavorites: item.favoritedBy.length,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update gallery settings (Admin)
// @route   PUT /api/galleries/:id
// @access  Private/Admin
export const updateGallery = async (req, res, next) => {
  try {
    const gallery = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!gallery) return next(new AppError('Gallery not found', 404));
    res.status(200).json({ success: true, data: gallery });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete gallery item (Admin)
// @route   DELETE /api/galleries/items/:itemId
// @access  Private/Admin
export const deleteGalleryItem = async (req, res, next) => {
  try {
    const item = await GalleryItem.findByIdAndDelete(req.params.itemId);
    if (!item) return next(new AppError('Item not found', 404));
    res.status(200).json({ success: true, message: 'Item removed from gallery' });
  } catch (error) {
    next(error);
  }
};
