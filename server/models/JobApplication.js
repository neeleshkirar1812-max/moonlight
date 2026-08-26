import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema(
  {
    career: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Career',
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    portfolioUrl: {
      type: String,
    },
    resumeUrl: {
      type: String,
    },
    resumePublicId: {
      type: String,
    },
    coverLetter: {
      type: String,
    },
    yearsOfExperience: {
      type: Number,
      default: 2,
    },
    status: {
      type: String,
      enum: [
        'Applied',
        'Shortlisted',
        'Interview',
        'Selected',
        'Rejected',
        'Hired',
        'PENDING',
        'REVIEWING',
        'SHORTLISTED',
        'REJECTED',
        'HIRED',
      ],
      default: 'Applied',
      index: true,
    },
    hiringDetails: {
      offeredRole: { type: String, default: '' },
      offeredSalary: { type: Number, default: 0 },
      joiningDate: { type: Date },
      offerLetterGenerated: { type: Boolean, default: false },
      employeeUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      hiredAt: { type: Date },
      hiredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    adminNotes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);
export default JobApplication;
