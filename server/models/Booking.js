import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    bookingNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    enquiryRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Enquiry',
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    eventType: {
      type: String,
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    location: {
      city: String,
      state: String,
      venue: String,
    },
    packageSelected: {
      type: String,
      default: 'Royal Heritage Wedding Package',
    },
    services: [{
      type: String,
    }],
    totalAmount: {
      type: Number,
      required: true,
    },
    advanceAmount: {
      type: Number,
      required: true,
    },
    remainingAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['UNPAID', 'PARTIAL', 'PAID', 'REFUNDED'],
      default: 'UNPAID',
      index: true,
    },
    bookingStatus: {
      type: String,
      enum: [
        'ENQUIRY',
        'QUOTATION',
        'ADVANCE_PENDING',
        'CONFIRMED',
        'IN_PROGRESS',
        'COMPLETED',
        'CANCELLED',
      ],
      default: 'CONFIRMED',
      index: true,
    },
    orderStage: {
      type: String,
      enum: [
        'ENQUIRY_RECEIVED',
        'QUOTATION_SENT',
        'ADVANCE_PAID',
        'CONFIRMED',
        'SHOOT_SCHEDULED',
        'SHOOT_COMPLETED',
        'EDITING',
        'DELIVERED',
        'CLOSED',
      ],
      default: 'CONFIRMED',
      index: true,
    },
    stageHistory: [
      {
        stage: { type: String, required: true },
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        updaterName: { type: String, default: 'System' },
        timestamp: { type: Date, default: Date.now },
        note: { type: String, default: '' },
      },
    ],
    assignedEmployees: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    scheduleTimeline: [{
      time: String,
      event: String,
      notes: String,
    }],
    deliverablesStatus: [{
      item: String,
      status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Ready', 'Delivered'],
        default: 'Pending',
      },
      deliveredAt: Date,
    }],
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
