import mongoose from 'mongoose';

const invitationPurchaseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    customerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    customerName: {
      type: String,
      default: '',
      trim: true,
    },
    customerPhone: {
      type: String,
      default: '',
      trim: true,
    },
    templateId: {
      type: String,
      required: true,
    },
    templateName: {
      type: String,
      default: 'Royal Love',
    },
    purchaseType: {
      type: String,
      enum: ['PAID', 'FREE', 'ADMIN_ASSIGNED', 'COUPON', 'DISCOUNT'],
      default: 'PAID',
    },
    couponCode: {
      type: String,
      default: '',
    },
    razorpayOrderId: {
      type: String,
      required: false,
      default: '',
    },
    razorpayPaymentId: {
      type: String,
      default: '',
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    status: {
      type: String,
      enum: ['created', 'paid', 'active', 'failed', 'refunded'],
      default: 'created',
    },
    invitationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Invitation',
    },
  },
  {
    timestamps: true,
  }
);

const InvitationPurchase =
  mongoose.models.InvitationPurchase ||
  mongoose.model('InvitationPurchase', invitationPurchaseSchema);

export default InvitationPurchase;
