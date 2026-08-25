import Enquiry from '../models/Enquiry.js';
import Booking from '../models/Booking.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js';
import { AppError } from '../middleware/error.js';
import { sendEnquiryConfirmationEmail } from '../services/emailService.js';
import { sendEnquiryWhatsAppNotification } from '../services/whatsappService.js';
import { generateEnquiriesExcelBuffer } from '../services/excelService.js';
import { logAuditEvent } from '../middleware/audit.js';

// Generate unique luxury enquiry reference ID
const generateEnquiryId = () => {
  const year = new Date().getFullYear();
  const randomChars = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ENQ-${year}-${randomChars}`;
};

// @desc    Submit 8-step luxury enquiry form
// @route   POST /api/enquiries
// @access  Public
export const createEnquiry = async (req, res, next) => {
  try {
    const {
      eventType,
      eventDate,
      eventEndDate,
      location,
      guestCount,
      requiredServices,
      budgetRange,
      storyDetails,
      customerDetails,
      leadSource = 'Website',
    } = req.body;

    if (!eventType || !eventDate || !location?.city || !customerDetails?.fullName || !customerDetails?.email || !customerDetails?.phone) {
      return next(new AppError('Please complete all required enquiry fields.', 400));
    }

    const enquiryId = generateEnquiryId();

    const enquiry = await Enquiry.create({
      enquiryId,
      eventType,
      eventDate: new Date(eventDate),
      eventEndDate: eventEndDate ? new Date(eventEndDate) : undefined,
      location,
      guestCount: Number(guestCount) || 200,
      requiredServices: requiredServices || ['Photography', 'Cinematic Film'],
      budgetRange: budgetRange || '₹2L–₹5L',
      leadSource: leadSource || 'Website',
      storyDetails: storyDetails || '',
      customerDetails,
      userRef: req.user ? req.user._id : undefined,
      status: 'NEW',
      timelineHistory: [{
        status: 'NEW',
        updatedBy: customerDetails.fullName,
        comment: 'Enquiry submitted through the luxury interactive wedding planner.',
      }],
    });

    // Notify Admins
    const admins = await User.find({ role: { $in: ['admin', 'superadmin'] } });
    for (const admin of admins) {
      await Notification.create({
        recipient: admin._id,
        title: 'New High-Value Enquiry',
        message: `New enquiry ${enquiryId} from ${customerDetails.fullName} for ${eventType} in ${location.city}.`,
        type: 'NEW_ENQUIRY',
        link: `/admin/enquiries`,
      });
    }

    // Trigger Email & WhatsApp notifications
    sendEnquiryConfirmationEmail(enquiry).catch(err => console.error('[Enquiry Email Error]', err));
    sendEnquiryWhatsAppNotification(enquiry).catch(err => console.error('[Enquiry WhatsApp Error]', err));

    res.status(201).json({
      success: true,
      message: 'Your story has been received with love.',
      data: {
        enquiryId: enquiry.enquiryId,
        eventType: enquiry.eventType,
        eventDate: enquiry.eventDate,
        location: enquiry.location,
        requiredServices: enquiry.requiredServices,
        customerDetails: enquiry.customerDetails,
        createdAt: enquiry.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get enquiries with filtering, search, status, and pagination (Admin / Employee)
// @route   GET /api/enquiries
// @access  Private (Admin / Employee)
export const getEnquiries = async (req, res, next) => {
  try {
    const { status, search, eventType, assignedTo, page = 1, limit = 20 } = req.query;
    const query = {};

    // If employee, only show enquiries assigned to them
    if (req.user.role === 'employee') {
      query.assignedEmployees = req.user._id;
    } else if (assignedTo) {
      query.assignedEmployees = assignedTo;
    }

    if (status && status !== 'ALL') {
      query.status = status;
    }

    if (eventType && eventType !== 'ALL') {
      query.eventType = eventType;
    }

    if (search) {
      query.$or = [
        { enquiryId: { $regex: search, $options: 'i' } },
        { 'customerDetails.fullName': { $regex: search, $options: 'i' } },
        { 'customerDetails.email': { $regex: search, $options: 'i' } },
        { 'customerDetails.phone': { $regex: search, $options: 'i' } },
        { 'location.city': { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Enquiry.countDocuments(query);
    const enquiries = await Enquiry.find(query)
      .populate('assignedEmployees', 'name email phone avatar')
      .populate('userRef', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: enquiries.length,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      data: enquiries,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get enquiry by ID / enquiryId
// @route   GET /api/enquiries/:id
// @access  Private
export const getEnquiryById = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findOne({
      $or: [{ _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }, { enquiryId: req.params.id }],
    })
      .populate('assignedEmployees', 'name email phone avatar')
      .populate('internalNotes.authorRef', 'name avatar');

    if (!enquiry) {
      return next(new AppError('Enquiry not found', 404));
    }

    // If customer, verify ownership
    if (req.user.role === 'customer' && enquiry.userRef && enquiry.userRef.toString() !== req.user._id.toString()) {
      return next(new AppError('Unauthorized access to enquiry', 403));
    }

    res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update enquiry status
// @route   PUT /api/enquiries/:id/status
// @access  Private/Admin
export const updateEnquiryStatus = async (req, res, next) => {
  try {
    const { status, comment } = req.body;
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) return next(new AppError('Enquiry not found', 404));

    enquiry.status = status;
    enquiry.timelineHistory.push({
      status,
      updatedBy: req.user.name,
      comment: comment || `Status changed to ${status}`,
      timestamp: new Date(),
    });

    await enquiry.save();
    await logAuditEvent(req, 'UPDATE_ENQUIRY_STATUS', 'Enquiry', enquiry._id, { status, comment });

    res.status(200).json({
      success: true,
      message: `Enquiry status updated to ${status}`,
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Assign employees to enquiry
// @route   PUT /api/enquiries/:id/assign
// @access  Private/Admin
export const assignEmployees = async (req, res, next) => {
  try {
    const { employeeIds } = req.body;
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) return next(new AppError('Enquiry not found', 404));

    enquiry.assignedEmployees = employeeIds;
    enquiry.timelineHistory.push({
      status: enquiry.status,
      updatedBy: req.user.name,
      comment: `Assigned ${employeeIds.length} team members to enquiry.`,
    });

    await enquiry.save();

    // Notify assigned employees
    for (const empId of employeeIds) {
      await Notification.create({
        recipient: empId,
        title: 'New Project Assignment',
        message: `You have been assigned to enquiry ${enquiry.enquiryId} for ${enquiry.eventType}.`,
        type: 'EMPLOYEE_ASSIGNMENT',
        link: `/employee/dashboard`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Employees assigned successfully',
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add internal note to enquiry
// @route   POST /api/enquiries/:id/notes
// @access  Private (Admin / Employee)
export const addInternalNote = async (req, res, next) => {
  try {
    const { note } = req.body;
    if (!note) return next(new AppError('Note content is required', 400));

    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) return next(new AppError('Enquiry not found', 404));

    enquiry.internalNotes.push({
      note,
      authorName: req.user.name,
      authorRef: req.user._id,
      createdAt: new Date(),
    });

    await enquiry.save();

    res.status(201).json({
      success: true,
      message: 'Internal note added',
      data: enquiry.internalNotes,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Send formal quotation to client
// @route   POST /api/enquiries/:id/quotation
// @access  Private/Admin
export const sendQuotation = async (req, res, next) => {
  try {
    const { totalAmount, advanceRequired, lineItems, notes, validUntil } = req.body;
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) return next(new AppError('Enquiry not found', 404));

    enquiry.quotation = {
      quotationNumber: `QUO-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      totalAmount,
      advanceRequired: advanceRequired || Math.round(totalAmount * 0.25),
      lineItems: lineItems || [],
      notes,
      validUntil: validUntil ? new Date(validUntil) : new Date(+new Date() + 14 * 24 * 60 * 60 * 1000),
      sentAt: new Date(),
    };

    enquiry.status = 'QUOTATION_SENT';
    enquiry.timelineHistory.push({
      status: 'QUOTATION_SENT',
      updatedBy: req.user.name,
      comment: `Quotation of ₹${totalAmount?.toLocaleString('en-IN')} dispatched to client.`,
    });

    await enquiry.save();

    res.status(200).json({
      success: true,
      message: 'Quotation sent successfully',
      data: enquiry.quotation,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Convert Enquiry to Confirmed Booking
// @route   POST /api/enquiries/:id/convert-to-booking
// @access  Private/Admin
export const convertToBooking = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) return next(new AppError('Enquiry not found', 404));

    // Check or find user
    let customerUser = await User.findOne({ email: enquiry.customerDetails.email });
    if (!customerUser) {
      customerUser = await User.create({
        name: enquiry.customerDetails.fullName,
        email: enquiry.customerDetails.email,
        phone: enquiry.customerDetails.phone,
        password: 'Password@123', // Default temporary credentials
        role: 'customer',
      });
    }

    const year = new Date().getFullYear();
    const count = await Booking.countDocuments();
    const bookingNumber = `BKG-${year}-${String(count + 1).padStart(4, '0')}`;

    const totalAmount = enquiry.quotation?.totalAmount || 250000;
    const advanceAmount = enquiry.quotation?.advanceRequired || 50000;

    const booking = await Booking.create({
      bookingNumber,
      enquiryRef: enquiry._id,
      customer: customerUser._id,
      eventType: enquiry.eventType,
      eventDate: enquiry.eventDate,
      location: enquiry.location,
      services: enquiry.requiredServices,
      totalAmount,
      advanceAmount,
      remainingAmount: totalAmount - advanceAmount,
      paymentStatus: 'UNPAID',
      bookingStatus: 'CONFIRMED',
      assignedEmployees: enquiry.assignedEmployees,
    });

    enquiry.status = 'CONFIRMED';
    enquiry.timelineHistory.push({
      status: 'CONFIRMED',
      updatedBy: req.user.name,
      comment: `Converted to official Booking #${bookingNumber}`,
    });
    await enquiry.save();

    await logAuditEvent(req, 'CONVERT_ENQUIRY_TO_BOOKING', 'Booking', booking._id, { enquiryId: enquiry.enquiryId });

    res.status(201).json({
      success: true,
      message: 'Enquiry converted to booking successfully',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Export Enquiries Pipeline to Formatted Excel (.xlsx) Spreadsheet
 * @route GET /api/enquiries/export/excel
 * @access Private/Admin
 */
export const exportEnquiriesExcel = async (req, res, next) => {
  try {
    const { source, status } = req.query;
    const query = {};
    if (source && source !== 'ALL') query.leadSource = source;
    if (status && status !== 'ALL') query.status = status;

    const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });
    const buffer = generateEnquiriesExcelBuffer(enquiries);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=Lumiere_Enquiries_${Date.now()}.xlsx`);
    return res.send(buffer);
  } catch (error) {
    next(error);
  }
};

