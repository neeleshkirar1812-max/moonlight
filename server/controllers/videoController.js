import Video from '../models/Video.js';
import { AppError } from '../middleware/error.js';

export const getVideos = async (req, res, next) => {
  try {
    const { category, isFeatured } = req.query;
    const query = {};
    if (category && category !== 'All') query.category = category;
    if (isFeatured !== undefined) query.isFeatured = isFeatured === 'true';

    const videos = await Video.find(query).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: videos.length, data: videos });
  } catch (error) {
    next(error);
  }
};

export const createVideo = async (req, res, next) => {
  try {
    const { title, youtubeUrl, youtubeVideoId, thumbnail, category, clientNames, location, description, isFeatured } = req.body;

    const video = await Video.create({
      title,
      youtubeUrl,
      youtubeVideoId: youtubeVideoId || youtubeUrl.split('v=')[1]?.substring(0, 11) || 'dQw4w9WgXcQ',
      thumbnail,
      category,
      clientNames,
      location,
      description,
      isFeatured: Boolean(isFeatured),
    });

    res.status(201).json({ success: true, data: video });
  } catch (error) {
    next(error);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!video) return next(new AppError('Video not found', 404));
    res.status(200).json({ success: true, data: video });
  } catch (error) {
    next(error);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return next(new AppError('Video not found', 404));
    res.status(200).json({ success: true, message: 'Video deleted' });
  } catch (error) {
    next(error);
  }
};
