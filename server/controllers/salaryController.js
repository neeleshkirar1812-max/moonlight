import Salary from '../models/Salary.js';
import Employee from '../models/Employee.js';
import User from '../models/User.js';
import { AppError } from '../middleware/error.js';
import { logAuditEvent } from '../middleware/audit.js';

// @desc    Get salary slips (scoped: employee gets own, admin gets all)
// @route   GET /api/salary
// @access  Private
export const getSalarySlips = async (req, res, next) => {
  try {
    const { month, status, employeeId } = req.query;
    const query = {};

    if (req.user.role === 'employee') {
      query.user = req.user._id;
    } else {
      if (employeeId) query.employee = employeeId;
      if (status) query.paymentStatus = status;
    }

    if (month && month !== 'ALL') {
      query.month = month;
    }

    const slips = await Salary.find(query)
      .populate('user', 'name email phone avatar')
      .populate('employee', 'designation employeeCode rating')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: slips.length,
      data: slips,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create / Generate a monthly salary slip for single employee
// @route   POST /api/salary
// @access  Private/Admin
export const createSalarySlip = async (req, res, next) => {
  try {
    const {
      employeeId,
      month,
      year = new Date().getFullYear(),
      basicPay = 0,
      hraAllowances = 0,
      shootBonus = 0,
      travelReimbursement = 0,
      taxDeduction = 0,
      providentFund = 0,
      advanceDeduction = 0,
      paymentMethod = 'BANK_TRANSFER',
      notes,
    } = req.body;

    const emp = await Employee.findById(employeeId).populate('user', 'name email');
    if (!emp) return next(new AppError('Employee not found', 404));

    const grossPay = Number(basicPay) + Number(hraAllowances) + Number(shootBonus) + Number(travelReimbursement);
    const totalDeductions = Number(taxDeduction) + Number(providentFund) + Number(advanceDeduction);
    const netPay = Math.max(0, grossPay - totalDeductions);

    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const cleanMonth = month.replace(/\s+/g, '').toUpperCase();
    const slipNumber = `SLIP-${cleanMonth}-${emp.user?.name?.slice(0, 3).toUpperCase() || 'EMP'}-${randomSuffix}`;

    const newSlip = await Salary.create({
      employee: emp._id,
      user: emp.user?._id || emp.user,
      employeeCode: emp.employeeCode || req.body.employeeCode || `EMP-${Date.now().toString().slice(-4)}`,
      employeeName: emp.user?.name || req.body.employeeName || 'Production Crew Member',
      designation: emp.designation || req.body.designation || 'Production Specialist',
      month,
      year,
      slipNumber,
      basicPay,
      hraAllowances,
      shootBonus,
      travelReimbursement,
      grossPay,
      taxDeduction,
      providentFund,
      advanceDeduction,
      totalDeductions,
      netPay,
      paymentStatus: 'Pending',
      paymentMethod,
      notes: notes || `Monthly salary for ${month}`,
    });

    await logAuditEvent(req, 'GENERATE_SALARY_SLIP', 'Salary', newSlip._id, {
      employeeName: emp.user.name,
      month,
      netPay,
    });

    res.status(201).json({
      success: true,
      message: 'Salary slip generated successfully',
      data: newSlip,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Bulk generate salary slips for all employees for a given month
// @route   POST /api/salary/bulk
// @access  Private/Admin
export const bulkGenerateSalarySlips = async (req, res, next) => {
  try {
    const { month, year = new Date().getFullYear() } = req.body;
    if (!month) return next(new AppError('Please provide target month', 400));

    const employees = await Employee.find().populate('user', 'name email');
    const createdSlips = [];

    for (const emp of employees) {
      if (!emp.user) continue;

      // Base salaries based on designation or standard default
      let basic = 35000;
      if (emp.designation?.toLowerCase().includes('director') || emp.designation?.toLowerCase().includes('lead')) {
        basic = 55000;
      } else if (emp.designation?.toLowerCase().includes('senior') || emp.designation?.toLowerCase().includes('master')) {
        basic = 45000;
      }

      const hra = Math.round(basic * 0.2);
      const bonus = 5000;
      const gross = basic + hra + bonus;
      const deductions = Math.round(gross * 0.05); // 5% standard deductions
      const netPay = gross - deductions;

      const randomSuffix = Math.floor(100 + Math.random() * 900);
      const empName = emp.user?.name || emp.name || 'Crew Member';
      const initials = empName.replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase() || 'EMP';
      const slipNumber = `SLIP-${cleanMonth}-${initials}-${randomSuffix}`;

      const slip = await Salary.create({
        employee: emp._id,
        user: emp.user?._id || emp.user,
        employeeCode: emp.employeeCode || `EMP-${randomSuffix}`,
        employeeName: empName,
        designation: emp.designation || 'Production Crew',
        month,
        year,
        slipNumber,
        basicPay: basic,
        hraAllowances: hra,
        shootBonus: bonus,
        grossPay: gross,
        totalDeductions: deductions,
        netPay,
        paymentStatus: 'Pending',
        paymentMethod: 'BANK_TRANSFER',
      });
      createdSlips.push(slip);
    }

    await logAuditEvent(req, 'BULK_GENERATE_SALARY_SLIPS', 'Salary', null, {
      month,
      count: createdSlips.length,
    });

    res.status(201).json({
      success: true,
      message: `Successfully generated ${createdSlips.length} salary slips for ${month}`,
      data: createdSlips,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark salary as Paid
// @route   PATCH /api/salary/:id/pay
// @access  Private/Admin
export const markSalaryPaid = async (req, res, next) => {
  try {
    const { paymentMethod = 'BANK_TRANSFER', transactionId } = req.body;
    const slip = await Salary.findById(req.params.id);
    if (!slip) return next(new AppError('Salary slip not found', 404));

    slip.paymentStatus = 'Paid';
    slip.paymentDate = new Date();
    slip.paymentMethod = paymentMethod;
    slip.transactionId = transactionId || `TXN-PAY-${Date.now().toString().slice(-6)}`;
    await slip.save();

    await logAuditEvent(req, 'MARK_SALARY_PAID', 'Salary', slip._id, {
      employeeName: slip.employeeName,
      month: slip.month,
      netPay: slip.netPay,
      transactionId: slip.transactionId,
    });

    res.status(200).json({
      success: true,
      message: `Salary for ${slip.employeeName} (${slip.month}) marked as Paid.`,
      data: slip,
    });
  } catch (error) {
    next(error);
  }
};
