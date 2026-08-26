import Booking from '../models/Booking.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';
import { AppError } from '../middleware/error.js';
import { logAuditEvent } from '../middleware/audit.js';
import { generateBookingsExcelBuffer } from '../services/excelService.js';

// @desc    Get all bookings (Admin/Employee/Customer scoped)
// @route   GET /api/bookings
// @access  Private
export const getBookings = async (req, res, next) => {
  try {
    const { status, paymentStatus, page = 1, limit = 20 } = req.query;
    const query = {};

    if (req.user.role === 'customer') {
      query.customer = req.user._id;
    } else if (req.user.role === 'employee') {
      query.assignedEmployees = req.user._id;
    }

    if (status && status !== 'ALL') {
      query.bookingStatus = status;
    }

    if (paymentStatus && paymentStatus !== 'ALL') {
      query.paymentStatus = paymentStatus;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Booking.countDocuments(query);
    const bookings = await Booking.find(query)
      .populate('customer', 'name email phone avatar')
      .populate('assignedEmployees', 'name email phone avatar designation')
      .sort({ eventDate: 1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: bookings.length,
      total,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single booking by ID
// @route   GET /api/bookings/:id
// @access  Private
export const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('customer', 'name email phone avatar')
      .populate('assignedEmployees', 'name email phone avatar designation bio');

    if (!booking) {
      return next(new AppError('Booking not found', 404));
    }

    // Role-based access restriction
    if (req.user.role === 'customer' && booking.customer._id.toString() !== req.user._id.toString()) {
      return next(new AppError('Unauthorized access to this booking', 403));
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status & deliverables
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { bookingStatus, paymentStatus, deliverablesStatus, scheduleTimeline } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) return next(new AppError('Booking not found', 404));

    if (bookingStatus) booking.bookingStatus = bookingStatus;
    if (paymentStatus) booking.paymentStatus = paymentStatus;
    if (deliverablesStatus) booking.deliverablesStatus = deliverablesStatus;
    if (scheduleTimeline) booking.scheduleTimeline = scheduleTimeline;

    await booking.save();
    await logAuditEvent(req, 'UPDATE_BOOKING_STATUS', 'Booking', booking._id, { bookingStatus, paymentStatus });

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Assign team to booking
// @route   PUT /api/bookings/:id/assign
// @access  Private/Admin
export const assignBookingTeam = async (req, res, next) => {
  try {
    const { employeeIds } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) return next(new AppError('Booking not found', 404));

    booking.assignedEmployees = employeeIds;
    await booking.save();

    for (const empId of employeeIds) {
      await Notification.create({
        recipient: empId,
        title: 'Assigned to Wedding Shoot',
        message: `You are booked for ${booking.eventType} on ${new Date(booking.eventDate).toLocaleDateString()}.`,
        type: 'EMPLOYEE_ASSIGNMENT',
        link: `/employee/projects`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Team assigned to shoot',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Export Confirmed Bookings to Formatted Excel (.xlsx) Spreadsheet
 * @route GET /api/bookings/export/excel
 * @access Private/Admin
 */
export const exportBookingsExcel = async (req, res, next) => {
  try {
    const { status, paymentStatus } = req.query;
    const query = {};
    if (status && status !== 'ALL') query.bookingStatus = status;
    if (paymentStatus && paymentStatus !== 'ALL') query.paymentStatus = paymentStatus;

    const bookings = await Booking.find(query)
      .populate('customer', 'name email phone')
      .populate('assignedEmployees', 'name email phone designation')
      .sort({ eventDate: 1 });

    const buffer = generateBookingsExcelBuffer(bookings);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=Lumiere_Bookings_${Date.now()}.xlsx`);
    return res.send(buffer);
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking order tracking stage
// @route   PATCH /api/bookings/:id/stage
// @access  Private (Admin or assigned Employee)
export const updateBookingStage = async (req, res, next) => {
  try {
    const { stage, note } = req.body;
    const booking = await Booking.findById(req.params.id);
    if (!booking) return next(new AppError('Booking not found', 404));

    const allowedStages = [
      'ENQUIRY_RECEIVED',
      'QUOTATION_SENT',
      'ADVANCE_PAID',
      'CONFIRMED',
      'SHOOT_SCHEDULED',
      'SHOOT_COMPLETED',
      'EDITING',
      'DELIVERED',
      'CLOSED',
    ];

    if (!allowedStages.includes(stage)) {
      return next(new AppError(`Invalid stage. Allowed: ${allowedStages.join(', ')}`, 400));
    }

    if (req.user.role === 'employee') {
      const isAssigned = booking.assignedEmployees.some(
        (empId) => empId.toString() === req.user._id.toString()
      );
      if (!isAssigned) {
        return next(new AppError('You are not assigned to this shoot.', 403));
      }
      if (!['SHOOT_COMPLETED', 'EDITING'].includes(stage)) {
        return next(new AppError('Production crew can only update shoot execution and editing stages.', 403));
      }
    }

    booking.orderStage = stage;
    booking.stageHistory.push({
      stage,
      updatedBy: req.user._id,
      updaterName: req.user.name || 'Staff Member',
      timestamp: new Date(),
      note: note || `Stage updated to ${stage.replace(/_/g, ' ')}`,
    });

    await booking.save();

    await logAuditEvent(req, 'UPDATE_BOOKING_STAGE', 'Booking', booking._id, {
      newStage: stage,
      updatedBy: req.user.name,
      note,
    });

    await Notification.create({
      recipient: booking.customer,
      title: 'Booking Order Update',
      message: `Your wedding shoot (${booking.bookingNumber}) is now in stage: ${stage.replace(/_/g, ' ')}.`,
      type: 'BOOKING_STAGE_UPDATE',
      link: '/customer/dashboard',
    });

    res.status(200).json({
      success: true,
      message: `Booking stage successfully updated to ${stage}`,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};


