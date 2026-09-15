import multer from 'multer';
import { AppError } from './error.js';

// Memory storage for direct Cloudinary stream uploading
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith('image/') ||
    file.mimetype.startsWith('video/') ||
    file.mimetype.startsWith('audio/') ||
    file.mimetype === 'audio/mpeg' ||
    file.mimetype === 'audio/mp3' ||
    file.mimetype === 'audio/wav' ||
    file.mimetype === 'audio/ogg' ||
    file.mimetype === 'audio/m4a' ||
    file.mimetype === 'audio/aac' ||
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'application/msword' ||
    file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    cb(null, true);
  } else {
    cb(new AppError('Unsupported file type. Please upload images, audio (MP3/WAV), videos, or documents.', 400), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB limit
  },
});
