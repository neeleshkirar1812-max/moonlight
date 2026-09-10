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
    },
    customerName: {
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
    razorpayOrderId: {
      type: String,
      unique: true,
      required: true,
    },
    razorpayPaymentId: {
      type: String,
      default: '',
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    status: {
      type: String,
      enum: ['created', 'paid', 'failed'],
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

const InvitationPurchase = mongoose.models.InvitationPurchase || mongoose.model('InvitationPurchase', invitationPurchaseSchema);
export default InvitationPurchase;
