import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';
import User from '../models/User.js';
import Gallery from '../models/Gallery.js';
import { AppError } from './error.js';

// Protect routes - JWT verification
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new AppError('You are not logged in. Please log in to gain access.', 401));
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    const currentUser = await User.findById(decoded.id).select('+permissions');

    if (!currentUser) {
      return next(new AppError('The user belonging to this token no longer exists.', 401));
    }

    if (!currentUser.isActive) {
      return next(new AppError('Your account has been deactivated. Please contact support.', 403));
    }

    req.user = currentUser;
    next();
  } catch (error) {
    return next(new AppError('Authentication failed. Token is invalid or expired.', 401));
  }
};

// Role-Based Access Control (RBAC)
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Authentication required.', 401));
    }

    // Super Admin has automatic global override
    if (req.user.role === 'superadmin') {
      return next();
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          `Permission Denied: Your role (${req.user.role}) is not authorized to access this resource.`,
          403
        )
      );
    }
    next();
  };
};

// Verify Customer Resource Ownership (Prevents cross-customer data leaks)
export const verifyCustomerOwnership = (paramKey = 'customerId') => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Authentication required.', 401));
    }

    // Admins and SuperAdmins have elevated access
    if (['admin', 'superadmin', 'employee'].includes(req.user.role)) {
      return next();
    }

    const requestedCustomerId = req.params[paramKey] || req.body[paramKey] || req.query[paramKey];
    
    if (requestedCustomerId && req.user._id.toString() !== requestedCustomerId.toString()) {
      return next(new AppError('Forbidden: You can only access your own customer records.', 403));
    }
    next();
  };
};

// Verify Private Gallery Access & PIN validation
export const verifyGalleryAccess = async (req, res, next) => {
  try {
    const galleryId = req.params.galleryId || req.params.id;
    const gallery = await Gallery.findById(galleryId);

    if (!gallery) {
      return next(new AppError('Private gallery not found.', 404));
    }

    // Admins and SuperAdmins have full access
    if (req.user && ['admin', 'superadmin'].includes(req.user.role)) {
      req.gallery = gallery;
      return next();
    }

    // Assigned employees
    if (req.user && req.user.role === 'employee') {
      req.gallery = gallery;
      return next();
    }

    // Check customer ownership
    if (req.user && req.user.role === 'customer') {
      if (gallery.customer.toString() !== req.user._id.toString()) {
        return next(new AppError('Forbidden: You do not own this private wedding gallery.', 403));
      }

      // Check gallery expiry if set
      if (gallery.expiryDate && new Date() > new Date(gallery.expiryDate)) {
        return next(new AppError('This wedding album link has expired. Please contact studio support.', 403));
      }

      req.gallery = gallery;
      return next();
    }

    return next(new AppError('Access Denied to this private gallery.', 403));
  } catch (error) {
    next(error);
  }
};
