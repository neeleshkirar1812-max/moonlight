import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: true,
      default: 'Wedding',
    },
    price: {
      type: Number,
      required: true,
      default: 699,
    },
    previewImage: {
      type: String,
      required: true,
      default: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    },
    description: {
      type: String,
      default: '',
    },
    theme: {
      primary: { type: String, default: '#B88935' },
      secondary: { type: String, default: '#2C1A1D' },
      background: { type: String, default: '#FAF8F5' },
      accent: { type: String, default: '#D4AF37' },
      text: { type: String, default: '#2C1A1D' },
    },
    fonts: {
      heading: { type: String, default: 'Cinzel, serif' },
      body: { type: String, default: 'Montserrat, sans-serif' },
      script: { type: String, default: 'Great Vibes, cursive' },
    },
    variants: {
      hero: { type: String, default: 'cinematic' },
      gallery: { type: String, default: 'carousel' },
      event: { type: String, default: 'timeline' },
      rsvp: { type: String, default: 'classic' },
      scratch: { type: String, default: 'gold' },
      animation: { type: String, default: 'smooth' },
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'archived'],
      default: 'active',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Template = mongoose.models.Template || mongoose.model('Template', templateSchema);
export default Template;
