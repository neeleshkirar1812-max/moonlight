import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: ['customer', 'employee', 'admin', 'superadmin'],
    },
    description: {
      type: String,
    },
    permissions: [{
      type: String,
      required: true,
    }],
    isSystemRole: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model('Role', roleSchema);
export default Role;
