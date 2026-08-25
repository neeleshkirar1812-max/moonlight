import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    fullDescription: {
      type: String,
    },
    iconName: {
      type: String,
      default: 'Camera',
    },
    coverImage: {
      type: String,
      required: true,
    },
    startingPrice: {
      type: Number,
      required: true,
    },
    priceUnit: {
      type: String,
      default: 'per day',
    },
    features: [{
      type: String,
    }],
    deliverables: [{
      type: String,
    }],
    crewDetails: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isPopular: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model('Service', serviceSchema);
export default Service;
