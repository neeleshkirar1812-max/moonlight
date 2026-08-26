import mongoose from 'mongoose';

const salarySchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    employeeCode: {
      type: String,
      required: true,
    },
    employeeName: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    month: {
      type: String, // e.g. "August 2026"
      required: true,
      index: true,
    },
    year: {
      type: Number,
      default: () => new Date().getFullYear(),
    },
    slipNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    basicPay: {
      type: Number,
      required: true,
      default: 0,
    },
    hraAllowances: {
      type: Number,
      default: 0,
    },
    shootBonus: {
      type: Number,
      default: 0,
    },
    travelReimbursement: {
      type: Number,
      default: 0,
    },
    grossPay: {
      type: Number,
      required: true,
      default: 0,
    },
    taxDeduction: {
      type: Number,
      default: 0,
    },
    providentFund: {
      type: Number,
      default: 0,
    },
    advanceDeduction: {
      type: Number,
      default: 0,
    },
    totalDeductions: {
      type: Number,
      required: true,
      default: 0,
    },
    netPay: {
      type: Number,
      required: true,
      default: 0,
    },
    paymentStatus: {
      type: String,
      enum: ['Paid', 'Pending'],
      default: 'Pending',
      index: true,
    },
    paymentDate: {
      type: Date,
    },
    paymentMethod: {
      type: String,
      enum: ['BANK_TRANSFER', 'UPI', 'NEFT', 'CASH', 'CHEQUE'],
      default: 'BANK_TRANSFER',
    },
    transactionId: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      default: 'Monthly production salary payout for Moonlight Production studio crew.',
    },
  },
  {
    timestamps: true,
  }
);

const Salary = mongoose.model('Salary', salarySchema);
export default Salary;
