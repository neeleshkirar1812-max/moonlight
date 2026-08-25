import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema(
  {
    gallery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gallery',
      required: true,
      index: true,
    },
    section: {
      type: String,
      default: 'Main Highlights',
    },
    mediaType: {
      type: String,
      enum: ['photo', 'video'],
      default: 'photo',
    },
    url: {
      type: String,
      required: true,
    },
    watermarkedUrl: {
      type: String,
    },
    thumbnailUrl: {
      type: String,
    },
    public_id: {
      type: String,
    },
    title: {
      type: String,
    },
    caption: {
      type: String,
    },
    dimensions: {
      width: Number,
      height: Number,
    },
    fileSize: {
      type: Number,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    favoritedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    downloadCount: {
      type: Number,
      default: 0,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

galleryItemSchema.index({ gallery: 1, section: 1, order: 1 });

const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);
export default GalleryItem;
