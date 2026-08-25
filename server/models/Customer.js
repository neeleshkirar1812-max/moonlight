import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    partnerName: {
      type: String,
      trim: true,
    },
    weddingDate: {
      type: Date,
    },
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: { type: String, default: 'India' },
    },
    preferredContactMethod: {
      type: String,
      enum: ['email', 'phone', 'whatsapp'],
      default: 'whatsapp',
    },
    anniversaryDate: {
      type: Date,
    },
    notes: {
      type: String,
    },
    loyaltyTier: {
      type: String,
      enum: ['Standard', 'Silver', 'Gold', 'Platinum'],
      default: 'Standard',
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;
