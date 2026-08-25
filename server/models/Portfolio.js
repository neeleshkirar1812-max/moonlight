import mongoose from 'mongoose';

const portfolioImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
  },
  caption: {
    type: String,
  },
  orientation: {
    type: String,
    enum: ['landscape', 'portrait', 'square'],
    default: 'landscape',
  },
  order: {
    type: Number,
    default: 0,
  }
});

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide portfolio title'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'wedding',
        'pre-wedding',
        'destination-wedding',
        'films',
        'couple-shoot',
        'bridal',
        'groom',
        'events',
        'drone',
        'other',
      ],
      index: true,
    },
    categoryRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PortfolioCategory',
    },
    coupleName: {
      type: String,
      trim: true,
    },
    eventDate: {
      type: Date,
    },
    location: {
      city: String,
      state: String,
      country: String,
      venue: String,
    },
    coverImage: {
      type: String,
      required: true,
    },
    coverPublicId: {
      type: String,
    },
    images: [portfolioImageSchema],
    videoUrl: {
      type: String,
    },
    description: {
      type: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    tags: [{
      type: String,
    }],
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

portfolioSchema.index({ category: 1, isFeatured: 1, order: 1 });

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
export default Portfolio;
