import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Customer from '../models/Customer.js';
import Employee from '../models/Employee.js';
import Admin from '../models/Admin.js';
import Notification from '../models/Notification.js';
import { ENV } from '../config/env.js';
import { AppError } from '../middleware/error.js';
import { logAuditEvent } from '../middleware/audit.js';

// Helper to sign JWT Access Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN,
  });
};

// Helper to sign Refresh Token
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, ENV.JWT_REFRESH_SECRET, {
    expiresIn: ENV.JWT_REFRESH_EXPIRES_IN,
  });
};

// @desc    Register a new customer
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, partnerName, weddingDate } = req.body;

    if (!name || !email || !password) {
      return next(new AppError('Please provide name, email, and password.', 400));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError('An account with this email already exists.', 400));
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: 'customer',
    });

    // Create Customer profile
    await Customer.create({
      user: user._id,
      partnerName,
      weddingDate: weddingDate ? new Date(weddingDate) : undefined,
    });

    const token = generateToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshTokens.push({ token: refreshToken });
    user.lastLogin = new Date();
    await user.save();

    // Welcome Notification
    await Notification.create({
      recipient: user._id,
      title: 'Welcome to Lumière Studios',
      message: 'Welcome to our luxury wedding portal. We are honored to be part of your story.',
      type: 'SYSTEM_NOTIFICATION',
      link: '/customer/dashboard',
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('Please provide email and password.', 400));
    }

    const user = await User.findOne({ email }).select('+password +permissions');
    if (!user || !(await user.matchPassword(password))) {
      return next(new AppError('Invalid email or password credentials.', 401));
    }

    if (!user.isActive) {
      return next(new AppError('Your account has been deactivated.', 403));
    }

    const token = generateToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshTokens.push({ token: refreshToken });
    user.lastLogin = new Date();
    await user.save();

    await logAuditEvent(req, 'USER_LOGIN', 'User', user._id, { email: user.email, role: user.role });

    res.status(200).json({
      success: true,
      token,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        permissions: user.permissions,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    let roleProfile = null;

    if (user.role === 'customer') {
      roleProfile = await Customer.findOne({ user: user._id });
    } else if (user.role === 'employee') {
      roleProfile = await Employee.findOne({ user: user._id });
    } else if (['admin', 'superadmin'].includes(user.role)) {
      roleProfile = await Admin.findOne({ user: user._id });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        permissions: user.permissions,
        createdAt: user.createdAt,
      },
      profile: roleProfile,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, avatar, partnerName, weddingDate, address, bio, instagramHandle } = req.body;

    const user = await User.findById(req.user._id);
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (avatar) user.avatar = avatar;
    await user.save();

    if (user.role === 'customer') {
      const customer = await Customer.findOne({ user: user._id });
      if (customer) {
        if (partnerName) customer.partnerName = partnerName;
        if (weddingDate) customer.weddingDate = new Date(weddingDate);
        if (address) customer.address = { ...customer.address, ...address };
        await customer.save();
      }
    } else if (user.role === 'employee') {
      const employee = await Employee.findOne({ user: user._id });
      if (employee) {
        if (bio) employee.bio = bio;
        if (instagramHandle) employee.instagramHandle = instagramHandle;
        await employee.save();
      }
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Change user password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');

    if (!(await user.matchPassword(currentPassword))) {
      return next(new AppError('Current password is incorrect.', 400));
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Refresh Token
// @route   POST /api/auth/refresh-token
// @access  Public
export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken: token } = req.body;

    if (!token) {
      return next(new AppError('Refresh Token is required', 400));
    }

    const decoded = jwt.verify(token, ENV.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new AppError('Invalid refresh token.', 401));
    }

    const newToken = generateToken(user._id, user.role);
    res.status(200).json({
      success: true,
      token: newToken,
    });
  } catch (error) {
    return next(new AppError('Refresh token expired or invalid.', 401));
  }
};
