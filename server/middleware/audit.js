import AuditLog from '../models/AuditLog.js';

export const logAuditEvent = async (req, action, resource, resourceId, details = {}) => {
  try {
    await AuditLog.create({
      user: req.user ? req.user._id : null,
      userEmail: req.user ? req.user.email : 'System/Anonymous',
      userRole: req.user ? req.user.role : 'Public',
      action,
      resource,
      resourceId: resourceId ? resourceId.toString() : null,
      details,
      ipAddress: req.ip || req.connection.remoteAddress || '127.0.0.1',
      userAgent: req.get('User-Agent') || 'Unknown',
    });
  } catch (error) {
    console.error('[Audit Log Error]', error.message);
  }
};
