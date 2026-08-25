import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    designation: {
      type: String,
      required: true,
      default: 'Lead Photographer',
    },
    skills: [{
      type: String,
    }],
    gearList: [{
      type: String,
    }],
    experienceYears: {
      type: Number,
      default: 3,
    },
    bio: {
      type: String,
    },
    portfolioUrl: {
      type: String,
    },
    instagramHandle: {
      type: String,
    },
    activeShootsCount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 5.0,
    },
    availabilityStatus: {
      type: String,
      enum: ['Available', 'On Shoot', 'On Leave', 'In Editing'],
      default: 'Available',
    }
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;
