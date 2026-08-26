import Payment from '../models/Payment.js';
import Booking from '../models/Booking.js';
import User from '../models/User.js';
import Invoice from '../models/Invoice.js';
import Notification from '../models/Notification.js';
import { createRazorpayOrder, verifyPaymentSignature } from '../services/razorpayService.js';
import { createInvoiceForBooking } from '../services/invoiceService.js';
import { sendPaymentReceiptEmail } from '../services/emailService.js';
import { AppError } from '../middleware/error.js';
import { logAuditEvent } from '../middleware/audit.js';

// @desc    Create Razorpay Order for Booking
// @route   POST /api/payments/create-order
// @access  Private (Customer / Admin)
export const createOrder = async (req, res, next) => {
  try {
    const { bookingId, amount, paymentType } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) return next(new AppError('Booking not found', 404));

    // Verify ownership
    if (req.user.role === 'customer' && booking.customer.toString() !== req.user._id.toString()) {
      return next(new AppError('Unauthorized access to booking payment', 403));
    }

    const payAmount = Number(amount) || booking.advanceAmount;
    const receipt = `RCP-${Date.now().toString().slice(-6)}`;

    const razorpayOrder = await createRazorpayOrder({
      amount: payAmount,
      receipt,
      notes: {
        bookingId: booking._id.toString(),
        bookingNumber: booking.bookingNumber,
        customerName: req.user.name,
      },
    });

    const paymentNumber = `PAY-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    const payment = await Payment.create({
      paymentNumber,
      razorpayOrderId: razorpayOrder.id,
      booking: booking._id,
      customer: req.user._id,
      amount: payAmount,
      currency: 'INR',
      paymentType: paymentType || (booking.paymentStatus === 'UNPAID' ? 'ADVANCE' : 'REMAINING'),
      status: 'CREATED',
      receiptNumber: receipt,
    });

    res.status(200).json({
      success: true,
      order: razorpayOrder,
      paymentId: payment._id,
      amount: payAmount,
      currency: 'INR',
      bookingNumber: booking.bookingNumber,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify Razorpay Payment Signature (CRITICAL BACKEND VERIFICATION)
// @route   POST /api/payments/verify
// @access  Private
export const verifyPayment = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paymentId,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id) {
      return next(new AppError('Payment details missing', 400));
    }

    const isValid = verifyPaymentSignature({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    if (!isValid) {
      if (paymentId) {
        await Payment.findByIdAndUpdate(paymentId, { status: 'FAILED', failureReason: 'Signature mismatch' });
      }
      return next(new AppError('Payment signature verification failed. Fraudulent or corrupted transaction.', 400));
    }

    const payment = await Payment.findOne({
      $or: [{ _id: paymentId }, { razorpayOrderId: razorpay_order_id }],
    });

    if (!payment) {
      return next(new AppError('Payment record not found', 404));
    }

    payment.razorpayPaymentId = razorpay_payment_id;
    payment.razorpaySignature = razorpay_signature;
    payment.status = 'CAPTURED';
    payment.paidAt = new Date();
    await payment.save();

    // Update Booking status and Order Stage
    const booking = await Booking.findById(payment.booking);
    if (booking) {
      if (payment.amount >= booking.totalAmount || booking.remainingAmount <= payment.amount) {
        booking.paymentStatus = 'PAID';
        booking.remainingAmount = 0;
        if (booking.orderStage === 'ENQUIRY_RECEIVED' || booking.orderStage === 'QUOTATION_SENT' || booking.orderStage === 'ADVANCE_PAID') {
          booking.orderStage = 'CONFIRMED';
          booking.stageHistory.push({
            stage: 'CONFIRMED',
            updaterName: 'Razorpay Auto-Sync',
            timestamp: new Date(),
            note: 'Full payment captured. Booking confirmed.',
          });
        }
      } else {
        booking.paymentStatus = 'PARTIAL';
        booking.remainingAmount = Math.max(0, booking.remainingAmount - payment.amount);
        if (booking.orderStage === 'ENQUIRY_RECEIVED' || booking.orderStage === 'QUOTATION_SENT') {
          booking.orderStage = 'ADVANCE_PAID';
          booking.stageHistory.push({
            stage: 'ADVANCE_PAID',
            updaterName: 'Razorpay Auto-Sync',
            timestamp: new Date(),
            note: `Advance payment of ₹${payment.amount.toLocaleString('en-IN')} received.`,
          });
        }
      }
      await booking.save();

      // Automatically sync or generate official GST Invoice
      const customerUser = await User.findById(booking.customer);
      const existingInvoice = await Invoice.findOne({ booking: booking._id });

      if (existingInvoice) {
        existingInvoice.paidAmount = (existingInvoice.paidAmount || 0) + payment.amount;
        existingInvoice.remainingBalance = Math.max(0, existingInvoice.totalAmount - existingInvoice.paidAmount);
        existingInvoice.status = existingInvoice.remainingBalance <= 0 ? 'PAID' : 'PARTIALLY_PAID';
        existingInvoice.payment = payment._id;
        await existingInvoice.save();
      } else {
        await createInvoiceForBooking(booking, customerUser, payment);
      }

      // Email receipt
      sendPaymentReceiptEmail(payment, customerUser).catch(err => console.error('[Receipt Email Error]', err));

      // Customer notification
      await Notification.create({
        recipient: customerUser._id,
        title: 'Payment Successful',
        message: `Your payment of ₹${payment.amount.toLocaleString('en-IN')} for booking ${booking.bookingNumber} was confirmed.`,
        type: 'PAYMENT_RECEIVED',
        link: `/customer/invoices`,
      });
    }

    await logAuditEvent(req, 'PAYMENT_VERIFIED', 'Payment', payment._id, {
      amount: payment.amount,
      razorpayPaymentId: razorpay_payment_id,
    });

    res.status(200).json({
      success: true,
      message: 'Payment verified and captured successfully',
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all payments (Admin / Customer scoped)
// @route   GET /api/payments
// @access  Private
export const getPayments = async (req, res, next) => {
  try {
    const query = {};
    if (req.user.role === 'customer') {
      query.customer = req.user._id;
    }

    const payments = await Payment.find(query)
      .populate('customer', 'name email phone avatar')
      .populate('booking', 'bookingNumber eventType totalAmount remainingAmount')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
    });
  } catch (error) {
    next(error);
  }
};
