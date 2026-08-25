import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: 'Lumière Studios',
    },
    tagline: {
      type: String,
      default: 'Your Story. Our Vision. Forever.',
    },
    heroHeadline: {
      type: String,
      default: 'Your Story. Our Vision. Forever.',
    },
    heroSubheading: {
      type: String,
      default: 'Mastering the art of timeless, luxury wedding photography and cinematic films across the globe.',
    },
    heroVideoUrl: {
      type: String,
      default: 'https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-kissing-under-a-veil-48301-large.mp4',
    },
    heroImageUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=85',
    },
    aboutStory: {
      type: String,
      default: 'Founded by master visual artists, Lumière Studios crafts unforgettable visual heirlooms for royal, high-profile, and romantic couples worldwide.',
    },
    email: {
      type: String,
      default: 'concierge@lumierestudios.com',
    },
    phone: {
      type: String,
      default: '+91 98200 12345',
    },
    whatsappNumber: {
      type: String,
      default: '+919820012345',
    },
    address: {
      street: { type: String, default: 'Lumière Penthouse, Bandra West' },
      city: { type: String, default: 'Mumbai' },
      state: { type: String, default: 'Maharashtra' },
      country: { type: String, default: 'India' },
      postalCode: { type: String, default: '400050' },
    },
    socialLinks: {
      instagram: { type: String, default: 'https://instagram.com/lumierestudios' },
      youtube: { type: String, default: 'https://youtube.com/@lumierestudios' },
      facebook: { type: String, default: 'https://facebook.com/lumierestudios' },
      linkedin: { type: String, default: 'https://linkedin.com/company/lumierestudios' },
      pinterest: { type: String, default: 'https://pinterest.com/lumierestudios' },
      whatsapp: { type: String, default: 'https://wa.me/919820012345' },
    },
    businessHours: {
      weekdays: { type: String, default: '10:00 AM – 08:00 PM IST' },
      weekends: { type: String, default: '10:00 AM – 06:00 PM IST (Shoots 24/7)' },
    },
    googleMapsEmbedUrl: {
      type: String,
      default: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.441113271701!2d72.825833!3d19.055833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAzJzIxLjAiTiA3MsKwNDknMzMuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin',
    },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;
