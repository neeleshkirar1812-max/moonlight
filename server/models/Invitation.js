import mongoose from 'mongoose';

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
      default: 'We joyfully invite you to join us in celebrating our wedding day.',
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
    galleryUrls: [{
      type: String,
    }],
    slug: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
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

// Auto-generate slug helper
invitationSchema.pre('save', function (next) {
  if (!this.slug && this.names) {
    const cleanNames = this.names
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const rand = Math.random().toString(36).substring(2, 6);
    this.slug = `${cleanNames || 'event'}-${rand}`;
  }
  next();
});

const Invitation = mongoose.models.Invitation || mongoose.model('Invitation', invitationSchema);
export default Invitation;
