import Testimonial from '../models/Testimonial.js';
import { AppError } from '../middleware/error.js';

export const getTestimonials = async (req, res, next) => {
  try {
    const { isFeatured } = req.query;
    const query = { isPublished: true };
    if (isFeatured !== undefined) query.isFeatured = isFeatured === 'true';

    const testimonials = await Testimonial.find(query).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: testimonials.length, data: testimonials });
  } catch (error) {
    next(error);
  }
};

export const createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!testimonial) return next(new AppError('Testimonial not found', 404));
    res.status(200).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) return next(new AppError('Testimonial not found', 404));
    res.status(200).json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    next(error);
  }
};
