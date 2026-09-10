import mongoose from 'mongoose';

const adminActivityLogSchema = new mongoose.Schema(
  {
    adminUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    adminEmail: {
      type: String,
      required: true,
      default: 'admin@moonlight.com',
    },
    action: {
      type: String,
      required: true,
      enum: [
        'customer_created',
        'customer_updated',
        'purchase_created',
        'invitation_created',
        'invitation_updated',
        'invitation_published',
        'invitation_unpublished',
        'invitation_suspended',
        'invitation_archived',
        'invitation_deleted',
        'template_created',
        'template_updated',
        'template_duplicated',
        'template_status_changed',
        'coupon_created',
        'coupon_updated',
      ],
    },
    targetType: {
      type: String,
      required: true,
      enum: ['customer', 'purchase', 'invitation', 'template', 'coupon', 'rsvp', 'system'],
    },
    targetId: {
      type: String,
      default: '',
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    ipAddress: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const AdminActivityLog =
  mongoose.models.AdminActivityLog ||
  mongoose.model('AdminActivityLog', adminActivityLogSchema);

export default AdminActivityLog;
