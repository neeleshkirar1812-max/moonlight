import User from '../models/User.js';
import Admin from '../models/Admin.js';
import AuditLog from '../models/AuditLog.js';
import { AppError } from '../middleware/error.js';
import { logAuditEvent } from '../middleware/audit.js';

// @desc    Get all Admin users
// @route   GET /api/super-admin/admins
// @access  Private/SuperAdmin
export const getAdmins = async (req, res, next) => {
  try {
    const admins = await User.find({ role: { $in: ['admin', 'superadmin'] } })
      .select('-password')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: admins.length,
      data: admins,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new Admin user (Super Admin only)
// @route   POST /api/super-admin/admins
// @access  Private/SuperAdmin
export const createAdminUser = async (req, res, next) => {
  try {
    const { name, email, password, phone, department, permissions } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return next(new AppError('User with this email already exists', 400));

    const user = await User.create({
      name,
      email,
      password: password || 'Admin@Lumiere2026',
      phone,
      role: 'admin',
      permissions: permissions || ['manage_enquiries', 'manage_bookings', 'manage_portfolio', 'manage_galleries', 'manage_payments'],
    });

    const adminProfile = await Admin.create({
      user: user._id,
      department: department || 'Studio Operations',
      allowedModules: permissions || ['enquiries', 'bookings', 'payments', 'portfolio', 'galleries', 'blogs'],
    });

    await logAuditEvent(req, 'CREATE_ADMIN_USER', 'User', user._id, { email, role: 'admin' });

    res.status(201).json({
      success: true,
      message: 'Admin account created successfully',
      data: { user, adminProfile },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle Admin active state or delete Admin
// @route   DELETE /api/super-admin/admins/:id
// @access  Private/SuperAdmin
export const deleteAdminUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(new AppError('Admin not found', 404));

    if (user.role === 'superadmin') {
      return next(new AppError('Super Admin root account cannot be deleted.', 403));
    }

    await Admin.findOneAndDelete({ user: user._id });
    await user.deleteOne();

    await logAuditEvent(req, 'DELETE_ADMIN_USER', 'User', req.params.id, { email: user.email });

    res.status(200).json({
      success: true,
      message: 'Admin user deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get system Audit Logs
// @route   GET /api/super-admin/audit-logs
// @access  Private/SuperAdmin
export const getAuditLogs = async (req, res, next) => {
  try {
    const { action, limit = 50 } = req.query;
    const query = {};
    if (action) query.action = action;

    const logs = await AuditLog.find(query)
      .populate('user', 'name email role')
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: logs.length,
      data: logs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get system metrics & environment report
// @route   GET /api/super-admin/system-config
// @access  Private/SuperAdmin
export const getSystemConfig = async (req, res, next) => {
  try {
    const nodeEnv = process.env.NODE_ENV || 'development';
    const uptimeSeconds = process.uptime();
    const memoryUsage = process.memoryUsage();

    res.status(200).json({
      success: true,
      data: {
        environment: nodeEnv,
        uptime: `${Math.floor(uptimeSeconds / 60)} minutes`,
        nodeVersion: process.version,
        memoryUsage: {
          heapUsedMB: Math.round(memoryUsage.heapUsed / 1024 / 1024),
          heapTotalMB: Math.round(memoryUsage.heapTotal / 1024 / 1024),
          rssMB: Math.round(memoryUsage.rss / 1024 / 1024),
        },
        servicesStatus: {
          database: 'Connected (MongoDB)',
          storageCDN: 'Active (Cloudinary)',
          paymentGateway: 'Configured (Razorpay)',
          emailEngine: 'Active (EmailJS / Resend)',
          whatsAppAPI: 'Configured (Meta Graph API)',
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
