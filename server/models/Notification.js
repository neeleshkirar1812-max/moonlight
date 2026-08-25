import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        'NEW_ENQUIRY',
        'BOOKING_CONFIRMED',
        'PAYMENT_RECEIVED',
        'PAYMENT_FAILED',
        'NEW_MESSAGE',
        'GALLERY_UPLOADED',
        'EMPLOYEE_ASSIGNMENT',
        'CAREER_APPLICATION',
        'SYSTEM_NOTIFICATION',
      ],
      default: 'SYSTEM_NOTIFICATION',
      index: true,
    },
    link: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
    readAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
