import mongoose from 'mongoose';

const rsvpSchema = new mongoose.Schema(
  {
    invitationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Invitation',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      default: '',
      trim: true,
    },
    email: {
      type: String,
      default: '',
      trim: true,
    },
    guests: {
      type: Number,
      default: 1,
      min: 1,
    },
    response: {
      type: String,
      enum: ['Yes', 'No', 'Maybe'],
      default: 'Yes',
    },
    message: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const RSVP = mongoose.models.RSVP || mongoose.model('RSVP', rsvpSchema);
export default RSVP;
