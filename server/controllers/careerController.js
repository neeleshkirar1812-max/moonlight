import Career from '../models/Career.js';
import JobApplication from '../models/JobApplication.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js';
import { AppError } from '../middleware/error.js';

export const getCareers = async (req, res, next) => {
  try {
    const careers = await Career.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: careers.length, data: careers });
  } catch (error) {
    next(error);
  }
};

export const getCareerById = async (req, res, next) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) return next(new AppError('Position not found', 404));
    res.status(200).json({ success: true, data: career });
  } catch (error) {
    next(error);
  }
};

export const createCareer = async (req, res, next) => {
  try {
    const career = await Career.create(req.body);
    res.status(201).json({ success: true, data: career });
  } catch (error) {
    next(error);
  }
};

export const updateCareer = async (req, res, next) => {
  try {
    const career = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!career) return next(new AppError('Position not found', 404));
    res.status(200).json({ success: true, data: career });
  } catch (error) {
    next(error);
  }
};

export const deleteCareer = async (req, res, next) => {
  try {
    const career = await Career.findByIdAndDelete(req.params.id);
    if (!career) return next(new AppError('Position not found', 404));
    res.status(200).json({ success: true, message: 'Position removed' });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit Job Application (Public)
export const applyForJob = async (req, res, next) => {
  try {
    const { careerId, fullName, email, phone, portfolioUrl, resumeUrl, coverLetter, yearsOfExperience } = req.body;

    if (!careerId || !fullName || !email || !phone) {
      return next(new AppError('Please complete all required fields.', 400));
    }

    const application = await JobApplication.create({
      career: careerId,
      fullName,
      email,
      phone,
      portfolioUrl,
      resumeUrl,
      coverLetter,
      yearsOfExperience: Number(yearsOfExperience) || 1,
      status: 'PENDING',
    });

    // Notify admins
    const admins = await User.find({ role: { $in: ['admin', 'superadmin'] } });
    for (const admin of admins) {
      await Notification.create({
        recipient: admin._id,
        title: 'New Job Application',
        message: `${fullName} applied for a position at Lumière Studios.`,
        type: 'CAREER_APPLICATION',
        link: '/admin/applications',
      });
    }

    res.status(201).json({
      success: true,
      message: 'Application received. Our talent team will review your portfolio.',
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all job applications (Admin)
export const getApplications = async (req, res, next) => {
  try {
    const applications = await JobApplication.find()
      .populate('career', 'title department location')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update application status (Admin)
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status, adminNotes } = req.body;
    const app = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes },
      { new: true }
    );
    if (!app) return next(new AppError('Application not found', 404));
    res.status(200).json({ success: true, data: app });
  } catch (error) {
    next(error);
  }
};
