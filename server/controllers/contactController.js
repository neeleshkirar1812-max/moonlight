import ContactMessage from '../models/ContactMessage.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js';
import { AppError } from '../middleware/error.js';

export const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return next(new AppError('Please complete name, email, and message.', 400));
    }

    const contact = await ContactMessage.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    const admins = await User.find({ role: { $in: ['admin', 'superadmin'] } });
    for (const admin of admins) {
      await Notification.create({
        recipient: admin._id,
        title: 'New Contact Inquiry',
        message: `${name} sent a message: "${subject || 'General Inquiry'}"`,
        type: 'NEW_MESSAGE',
        link: '/admin/messages',
      });
    }

    res.status(201).json({
      success: true,
      message: 'Thank you. Your message has been received.',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    next(error);
  }
};

export const markMessageRead = async (req, res, next) => {
  try {
    const msg = await ContactMessage.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    if (!msg) return next(new AppError('Message not found', 404));
    res.status(200).json({ success: true, data: msg });
  } catch (error) {
    next(error);
  }
};
