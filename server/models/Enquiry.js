import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    enquiryId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    eventType: {
      type: String,
      required: [true, 'Please select event type'],
      default: 'Wedding',
    },
    eventDate: {
      type: Date,
      required: [true, 'Please select event date'],
    },
    eventEndDate: {
      type: Date,
    },
    location: {
      city: { type: String, required: true },
      state: { type: String },
      country: { type: String, default: 'India' },
      venue: { type: String },
    },
    guestCount: {
      type: Number,
      default: 200,
    },
    requiredServices: [{
      type: String,
    }],
    budgetRange: {
      type: String,
      default: '₹15,00,000 – ₹25,00,000',
    },
    leadSource: {
      type: String,
      default: 'Website',
      index: true,
    },
    storyDetails: {
      type: String,
      default: '',
    },
    customerDetails: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      whatsappNumber: { type: String },
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: [
        'NEW',
        'CONTACTED',
        'DISCUSSION',
        'QUOTATION_SENT',
        'ADVANCE_PENDING',
        'CONFIRMED',
        'COMPLETED',
        'CANCELLED',
      ],
      default: 'NEW',
      index: true,
    },
    assignedEmployees: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    quotation: {
      quotationNumber: String,
      totalAmount: Number,
      advanceRequired: Number,
      lineItems: [{
        service: String,
        amount: Number,
      }],
      notes: String,
      sentAt: Date,
      validUntil: Date,
    },
    internalNotes: [{
      note: String,
      authorName: String,
      authorRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      createdAt: { type: Date, default: Date.now },
    }],
    timelineHistory: [{
      status: String,
      updatedBy: String,
      timestamp: { type: Date, default: Date.now },
      comment: String,
    }],
  },
  {
    timestamps: true,
  }
);

const Enquiry = mongoose.model('Enquiry', enquirySchema);
export default Enquiry;
