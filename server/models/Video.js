import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    youtubeUrl: {
      type: String,
      required: true,
    },
    youtubeVideoId: {
      type: String,
      default: 'dQw4w9WgXcQ',
    },
    thumbnail: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'Wedding Film',
    },
    clientNames: {
      type: String,
      required: true,
    },
    location: {
      city: String,
      venue: String,
    },
    description: {
      type: String,
    },
    duration: {
      type: String,
      default: '4:20',
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

videoSchema.pre('save', function (next) {
  if (this.youtubeUrl && !this.youtubeVideoId) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = this.youtubeUrl.match(regExp);
    if (match && match[2].length === 11) {
      this.youtubeVideoId = match[2];
    }
  }
  next();
});

const Video = mongoose.model('Video', videoSchema);
export default Video;
