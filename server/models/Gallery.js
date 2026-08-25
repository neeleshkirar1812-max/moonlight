import mongoose from 'mongoose';

const gallerySectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  order: { type: Number, default: 0 },
});

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide gallery title'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
    },
    eventDate: {
      type: Date,
    },
    coverImage: {
      type: String,
      required: true,
    },
    coverPublicId: {
      type: String,
    },
    isPrivate: {
      type: Boolean,
      default: true,
    },
    accessPin: {
      type: String,
      default: '1234',
    },
    watermarked: {
      type: Boolean,
      default: false,
    },
    downloadAllowed: {
      type: Boolean,
      default: true,
    },
    expiryDate: {
      type: Date,
    },
    sections: [gallerySectionSchema],
    totalPhotos: {
      type: Number,
      default: 0,
    },
    totalVideos: {
      type: Number,
      default: 0,
    },
    favoriteCount: {
      type: Number,
      default: 0,
    },
    sharedWith: [{
      email: String,
      accessGrantedAt: { type: Date, default: Date.now },
    }],
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;
