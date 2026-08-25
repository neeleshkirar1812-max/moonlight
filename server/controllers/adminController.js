import User from '../models/User.js';
import Customer from '../models/Customer.js';
import Employee from '../models/Employee.js';
import Enquiry from '../models/Enquiry.js';
import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';
import Portfolio from '../models/Portfolio.js';
import Blog from '../models/Blog.js';
import { AppError } from '../middleware/error.js';
import { logAuditEvent } from '../middleware/audit.js';

// @desc    Get comprehensive Admin Dashboard KPI metrics & charts
// @route   GET /api/admin/dashboard
// @access  Private (Admin / SuperAdmin)
export const getDashboardKPIs = async (req, res, next) => {
  try {
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const totalEmployees = await User.countDocuments({ role: 'employee' });
    const totalEnquiries = await Enquiry.countDocuments();
    const newEnquiries = await Enquiry.countDocuments({ status: 'NEW' });
    const totalBookings = await Booking.countDocuments();
    const confirmedBookings = await Booking.countDocuments({ bookingStatus: 'CONFIRMED' });
    const totalPortfolioItems = await Portfolio.countDocuments();
    const totalBlogs = await Blog.countDocuments();

    // Financial calculations
    const capturedPayments = await Payment.find({ status: 'CAPTURED' });
    const totalRevenue = capturedPayments.reduce((acc, curr) => acc + (curr.amount || 0), 0);

    const pendingBookings = await Booking.find({ paymentStatus: { $in: ['UNPAID', 'PARTIAL'] } });
    const pendingPaymentsAmount = pendingBookings.reduce((acc, curr) => acc + (curr.remainingAmount || 0), 0);

    // Recent Enquiries
    const recentEnquiries = await Enquiry.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('enquiryId eventType customerDetails location status createdAt');

    // Recent Bookings
    const recentBookings = await Booking.find()
      .populate('customer', 'name email avatar')
      .sort({ createdAt: -1 })
      .limit(5);

    // Monthly Analytics Chart Mock / Aggregation
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyStats = months.map((m, idx) => ({
      month: m,
      enquiries: Math.floor(12 + Math.sin(idx) * 6 + idx * 1.5),
      bookings: Math.floor(4 + Math.sin(idx) * 2 + idx * 0.8),
      revenue: Math.floor((350000 + idx * 75000 + Math.sin(idx) * 100000)),
    }));

    res.status(200).json({
      success: true,
      data: {
        kpis: {
          totalCustomers,
          totalEmployees,
          totalEnquiries,
          newEnquiries,
          totalBookings,
          confirmedBookings,
          totalRevenue,
          pendingPaymentsAmount,
          totalPortfolioItems,
          totalBlogs,
        },
        recentEnquiries,
        recentBookings,
        monthlyStats,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Customers list for Admin
// @route   GET /api/admin/customers
export const getAdminCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find()
      .populate('user', 'name email phone avatar createdAt isActive')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: customers.length, data: customers });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Employees list for Admin
// @route   GET /api/admin/employees
export const getAdminEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find()
      .populate('user', 'name email phone avatar createdAt isActive')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: employees.length, data: employees });
  } catch (error) {
    next(error);
  }
};

// @desc    Create Employee (Admin)
// @route   POST /api/admin/employees
export const createEmployee = async (req, res, next) => {
  try {
    const { name, email, password, phone, designation, skills, experienceYears, bio, instagramHandle } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return next(new AppError('User with this email already exists', 400));

    const user = await User.create({
      name,
      email,
      password: password || 'Lumiere@2026',
      phone,
      role: 'employee',
    });

    const employee = await Employee.create({
      user: user._id,
      designation: designation || 'Lead Photographer',
      skills: Array.isArray(skills) ? skills : (skills ? skills.split(',').map(s => s.trim()) : ['Sony Alpha', 'Gimbal Mastery', 'Editorial Lighting']),
      experienceYears: Number(experienceYears) || 3,
      bio,
      instagramHandle,
    });

    await logAuditEvent(req, 'CREATE_EMPLOYEE', 'Employee', employee._id, { email });

    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: { user, employee },
    });
  } catch (error) {
    next(error);
  }
};
