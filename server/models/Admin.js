import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    department: {
      type: String,
      default: 'Executive Management',
    },
    isSuperAdminAssigned: {
      type: Boolean,
      default: true,
    },
    allowedModules: [{
      type: String,
      default: ['enquiries', 'bookings', 'payments', 'portfolio', 'galleries', 'services', 'blogs', 'videos', 'careers', 'testimonials', 'settings'],
    }],
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
