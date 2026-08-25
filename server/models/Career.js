import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      enum: ['Cinematography', 'Photography', 'Post-Production', 'Production & Client Relations', 'Creative Direction'],
      required: true,
    },
    location: {
      type: String,
      default: 'Mumbai / On-Location Worldwide',
    },
    jobType: {
      type: String,
      enum: ['Full-Time', 'Part-Time', 'Freelance / Contract', 'Seasonal'],
      default: 'Full-Time',
    },
    experienceRequired: {
      type: String,
      default: '2-5 Years',
    },
    description: {
      type: String,
      required: true,
    },
    responsibilities: [{
      type: String,
    }],
    requirements: [{
      type: String,
    }],
    perks: [{
      type: String,
    }],
    salaryRange: {
      type: String,
      default: 'Competitive / Industry Standard',
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Career = mongoose.model('Career', careerSchema);
export default Career;
