import mongoose from 'mongoose';

const subEventSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  eventType: { type: String, default: 'Ceremony' },
  date: { type: String, default: '' },
  time: { type: String, default: '' },
  venue: { type: String, default: '' },
  address: { type: String, default: '' },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  mapUrl: { type: String, default: '' },
  calendarEnabled: { type: Boolean, default: true },
});

const invitationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    userEmail: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    templateId: {
      type: String,
      required: true,
      default: 'royal-love',
    },
    purchaseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InvitationPurchase',
      required: false,
    },
    title: {
      type: String,
      required: true,
      default: 'A Royal Celebration',
      trim: true,
    },
    names: {
      type: String,
      required: true,
      default: 'Aarav & Kiara',
      trim: true,
    },
    brideName: {
      type: String,
      default: 'Kiara Advani',
      trim: true,
    },
    groomName: {
      type: String,
      default: 'Aarav Singhania',
      trim: true,
    },
    hostNames: {
      type: String,
      default: 'Singhania & Advani Families',
      trim: true,
    },
    eventType: {
      type: String,
      default: 'Wedding',
    },
    date: {
      type: String,
      default: '2026-11-20',
    },
    time: {
      type: String,
      default: '18:00',
    },
    venue: {
      type: String,
      default: 'Jehan Numa Palace',
      trim: true,
    },
    venueAddress: {
      type: String,
      default: '152 Shamla Hills, Bhopal, Madhya Pradesh',
      trim: true,
    },
    message: {
      type: String,
      default: 'We joyfully invite you to join us in celebrating our special day.',
    },
    quote: {
      type: String,
      default: 'Two souls, one sacred path. A lifetime of laughter, honor, and love begins under the stars.',
    },
    story: {
      type: String,
      default: 'What began as a chance meeting under the golden sunset of the lakes turned into a lifetime promise of love, laughter, and endless conversations.',
    },
    hashtag: {
      type: String,
      default: '#AaravWedsKiara',
    },
    scratchMessage: {
      type: String,
      default: 'YOU’RE INVITED ♡',
    },
    musicUrl: {
      type: String,
      default: '',
    },
    coverPhoto: {
      type: String,
      default: '',
    },
    galleryUrls: [
      {
        type: String,
      },
    ],
    events: [subEventSchema],
    dressCode: {
      enabled: { type: Boolean, default: true },
      title: { type: String, default: 'Royal Indian Formal' },
      description: { type: String, default: 'We would love to see our guests adorned in traditional royal palettes.' },
      palettes: [
        { ceremony: { type: String, default: 'Haldi' }, color: { type: String, default: 'Mustard Gold & Turmeric' }, hex: { type: String, default: '#E5A93C' } },
        { ceremony: { type: String, default: 'Mehendi' }, color: { type: String, default: 'Emerald & Sage Green' }, hex: { type: String, default: '#2D5A27' } },
        { ceremony: { type: String, default: 'Wedding' }, color: { type: String, default: 'Crimson, Ivory & Champagne' }, hex: { type: String, default: '#8B1E2D' } },
      ],
    },
    accommodation: {
      enabled: { type: Boolean, default: true },
      hotelName: { type: String, default: 'Jehan Numa Palace & Heritage Suites' },
      address: { type: String, default: 'Shamla Hills, Bhopal' },
      checkIn: { type: String, default: 'Nov 20, 2026 at 12:00 PM' },
      checkOut: { type: String, default: 'Nov 22, 2026 at 11:00 AM' },
      conciergeContact: { type: String, default: '+91 755 266 1100' },
    },
    parking: {
      enabled: { type: Boolean, default: true },
      valetAvailable: { type: Boolean, default: true },
      instructions: { type: String, default: 'Complimentary valet parking available at Gate 1 (Royal Portico).' },
    },
    weatherGuide: {
      enabled: { type: Boolean, default: true },
      forecast: { type: String, default: 'Pleasant evening with light breeze (21°C - 24°C). Light pashmina recommended for open-air lawn ceremonies.' },
    },
    giftBlessing: {
      enabled: { type: Boolean, default: true },
      note: { type: String, default: 'Your warm presence and blessings are our greatest gift.' },
    },
    themeConfig: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    componentVariants: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['DRAFT', 'PUBLISHED', 'SUSPENDED', 'ARCHIVED'],
      default: 'DRAFT',
    },
    published: {
      type: Boolean,
      default: false,
    },
    rsvpEnabled: {
      type: Boolean,
      default: true,
    },
    scratchEnabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate slug helper if not present
invitationSchema.pre('save', function (next) {
  if (!this.slug && this.names) {
    const cleanNames = this.names
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const rand = Math.random().toString(36).substring(2, 6);
    this.slug = `${cleanNames || 'event'}-${rand}`;
  }
  if (this.status === 'PUBLISHED') {
    this.published = true;
  } else if (this.status === 'DRAFT' || this.status === 'SUSPENDED' || this.status === 'ARCHIVED') {
    this.published = false;
  }
  next();
});

const Invitation = mongoose.models.Invitation || mongoose.model('Invitation', invitationSchema);
export default Invitation;
