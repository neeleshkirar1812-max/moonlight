import Invoice from '../models/Invoice.js';
import User from '../models/User.js';
import Customer from '../models/Customer.js';
import Booking from '../models/Booking.js';
import Notification from '../models/Notification.js';
import { AppError } from '../middleware/error.js';
import { sendEmailNotification, sendInvoiceEmailNotification } from '../services/emailService.js';
import { generateInvoiceWhatsAppUrl, sendWhatsAppMessage } from '../services/whatsappService.js';
import { logAuditEvent } from '../middleware/audit.js';

/**
 * @desc Get all invoices (Customer sees only theirs, Admin sees all)
 * @route GET /api/invoices
 */
export const getInvoices = async (req, res, next) => {
  try {
    const query = {};
    if (req.user.role === 'customer') {
      query.$or = [{ customer: req.user._id }, { 'clientInfo.email': req.user.email }];
    }

    const invoices = await Invoice.find(query)
      .populate('customer', 'name email phone avatar')
      .populate('booking', 'bookingNumber eventType eventDate location')
      .sort({ issueDate: -1 });

    res.status(200).json({
      success: true,
      count: invoices.length,
      data: invoices,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Get single invoice details
 * @route GET /api/invoices/:id
 */
export const getInvoiceById = async (req, res, next) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate('customer', 'name email phone')
      .populate('booking', 'bookingNumber eventType eventDate location');

    if (!invoice) return next(new AppError('Invoice not found', 404));

    if (
      req.user.role === 'customer' &&
      invoice.customer?._id?.toString() !== req.user._id.toString() &&
      invoice.clientInfo?.email !== req.user.email
    ) {
      return next(new AppError('Unauthorized access to invoice', 403));
    }

    res.status(200).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Create Custom Invoice & Direct Dispatch to Email & WhatsApp (Admin)
 * @route POST /api/invoices
 */
export const createInvoice = async (req, res, next) => {
  try {
    const {
      customerId,
      clientName,
      clientEmail,
      clientPhone,
      clientAddress,
      bookingId,
      items,
      taxRate = 18,
      paidAmount = 0,
      status = 'ISSUED',
      dueDate,
      notes,
      sendEmail = true,
      sendWhatsApp = true,
    } = req.body;

    let finalName = clientName;
    let finalEmail = clientEmail;
    let finalPhone = clientPhone;
    let finalAddress = clientAddress || '';
    let targetUserId = customerId || null;

    // If customerId provided, autofill missing fields
    if (customerId) {
      const existingUser = await User.findById(customerId);
      if (existingUser) {
        finalName = finalName || existingUser.name;
        finalEmail = finalEmail || existingUser.email;
        finalPhone = finalPhone || existingUser.phone;
        targetUserId = existingUser._id;

        const custProfile = await Customer.findOne({ user: existingUser._id });
        if (custProfile?.address?.street && !finalAddress) {
          finalAddress = `${custProfile.address.street}, ${custProfile.address.city || ''}`;
        }
      }
    } else if (finalEmail) {
      const userByEmail = await User.findOne({ email: finalEmail.toLowerCase().trim() });
      if (userByEmail) {
        targetUserId = userByEmail._id;
        finalName = finalName || userByEmail.name;
        finalPhone = finalPhone || userByEmail.phone;
      }
    }

    if (!finalName || !finalEmail || !finalPhone) {
      return next(new AppError('Please provide Customer Name, Email Address, and Mobile / WhatsApp Number', 400));
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return next(new AppError('Please provide at least one invoice line item', 400));
    }

    // Calculate subtotal & totals
    const processedItems = items.map((item) => {
      const qty = Number(item.quantity) || 1;
      const price = Number(item.unitPrice) || 0;
      return {
        description: item.description,
        quantity: qty,
        unitPrice: price,
        total: qty * price,
      };
    });

    const subtotal = processedItems.reduce((acc, it) => acc + it.total, 0);
    const taxAmount = Math.round((subtotal * (Number(taxRate) || 18)) / 100);
    const totalAmount = subtotal + taxAmount;
    const remainingBalance = Math.max(0, totalAmount - (Number(paidAmount) || 0));

    // Unique invoice number
    const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const newInvoice = await Invoice.create({
      invoiceNumber,
      booking: bookingId || undefined,
      customer: targetUserId || undefined,
      clientInfo: {
        name: finalName,
        email: finalEmail.toLowerCase().trim(),
        phone: finalPhone,
        address: finalAddress || 'Private Client Atelier',
      },
      items: processedItems,
      subtotal,
      taxRate: Number(taxRate) || 18,
      taxAmount,
      totalAmount,
      paidAmount: Number(paidAmount) || 0,
      remainingBalance,
      status: Number(paidAmount) >= totalAmount ? 'PAID' : Number(paidAmount) > 0 ? 'PARTIALLY_PAID' : status,
      dueDate: dueDate ? new Date(dueDate) : new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      notes: notes || 'Thank you for choosing Lumière Studios to immortalize your wedding story.',
    });

    // 1. In-App Notification (if user registered)
    if (targetUserId) {
      await Notification.create({
        recipient: targetUserId,
        sender: req.user._id,
        title: `Official Invoice Issued: ${invoiceNumber}`,
        message: `An official invoice of ₹${totalAmount.toLocaleString('en-IN')} has been generated. View and settle it in your Client Sanctuary.`,
        type: 'SYSTEM_NOTIFICATION',
        link: '/customer/invoices',
      });
    }

    // 2. Direct Email Dispatch
    if (sendEmail) {
      try {
        await sendInvoiceEmailNotification(newInvoice, { name: finalName, email: finalEmail });
      } catch (mailErr) {
        console.warn('Invoice email dispatch non-critical error:', mailErr.message);
      }
    }

    // 3. Direct WhatsApp Dispatch (Backend API)
    if (sendWhatsApp) {
      try {
        await sendWhatsAppMessage({
          phone: finalPhone,
          message: `Dear ${finalName}, your official wedding invoice ${invoiceNumber} for ₹${totalAmount.toLocaleString('en-IN')} (Balance: ₹${remainingBalance.toLocaleString('en-IN')}) has been issued by Lumière Studios. Direct link: http://localhost:5173/customer/invoices`,
        });
      } catch (waErr) {
        console.warn('WhatsApp API background dispatch note:', waErr.message);
      }
    }

    logAuditEvent({
      action: 'CREATE_INVOICE',
      resourceType: 'Invoice',
      resourceId: newInvoice._id,
      performedBy: req.user._id,
      details: { invoiceNumber, totalAmount, clientEmail: finalEmail, clientPhone: finalPhone },
      req,
    });

    const populatedInvoice = await Invoice.findById(newInvoice._id)
      .populate('customer', 'name email phone avatar')
      .populate('booking', 'bookingNumber eventType eventDate');

    res.status(201).json({
      success: true,
      message: `Invoice ${invoiceNumber} created and directly sent to ${finalEmail} and WhatsApp (+${finalPhone})!`,
      data: populatedInvoice,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Update Invoice status / payment / details (Admin)
 * @route PUT /api/invoices/:id
 */
export const updateInvoice = async (req, res, next) => {
  try {
    const { clientName, clientEmail, clientPhone, clientAddress, items, taxRate, paidAmount, status, dueDate, notes, bookingId } = req.body;
    let invoice = await Invoice.findById(req.params.id);
    if (!invoice) return next(new AppError('Invoice not found', 404));

    if (clientName || clientEmail || clientPhone || clientAddress) {
      invoice.clientInfo = {
        name: clientName || invoice.clientInfo?.name,
        email: clientEmail || invoice.clientInfo?.email,
        phone: clientPhone || invoice.clientInfo?.phone,
        address: clientAddress ?? invoice.clientInfo?.address,
      };
    }

    if (items && Array.isArray(items)) {
      const processedItems = items.map((item) => {
        const qty = Number(item.quantity) || 1;
        const price = Number(item.unitPrice) || 0;
        return {
          description: item.description,
          quantity: qty,
          unitPrice: price,
          total: qty * price,
        };
      });
      const subtotal = processedItems.reduce((acc, it) => acc + it.total, 0);
      const taxAmount = Math.round((subtotal * (Number(taxRate ?? invoice.taxRate) || 18)) / 100);
      const totalAmount = subtotal + taxAmount;
      const finalPaid = Number(paidAmount ?? invoice.paidAmount) || 0;

      invoice.items = processedItems;
      invoice.subtotal = subtotal;
      invoice.taxRate = Number(taxRate ?? invoice.taxRate) || 18;
      invoice.taxAmount = taxAmount;
      invoice.totalAmount = totalAmount;
      invoice.paidAmount = finalPaid;
      invoice.remainingBalance = Math.max(0, totalAmount - finalPaid);
    } else if (paidAmount !== undefined) {
      const finalPaid = Number(paidAmount) || 0;
      invoice.paidAmount = finalPaid;
      invoice.remainingBalance = Math.max(0, invoice.totalAmount - finalPaid);
      if (finalPaid >= invoice.totalAmount) {
        invoice.status = 'PAID';
      } else if (finalPaid > 0) {
        invoice.status = 'PARTIALLY_PAID';
      }
    }

    if (status) invoice.status = status;
    if (dueDate) invoice.dueDate = new Date(dueDate);
    if (notes) invoice.notes = notes;
    if (bookingId) invoice.booking = bookingId;

    await invoice.save();

    const updated = await Invoice.findById(invoice._id)
      .populate('customer', 'name email phone avatar')
      .populate('booking', 'bookingNumber eventType eventDate');

    res.status(200).json({
      success: true,
      message: 'Invoice updated successfully.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Resend Invoice to Client Email & WhatsApp (Direct Backend Send)
 * @route POST /api/invoices/:id/send
 */
export const resendInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate('customer', 'name email phone');
    if (!invoice) return next(new AppError('Invoice not found', 404));

    const email = invoice.clientInfo?.email || invoice.customer?.email;
    const phone = invoice.clientInfo?.phone || invoice.customer?.phone;
    const name = invoice.clientInfo?.name || invoice.customer?.name;

    // Send Email
    if (email) {
      try {
        await sendInvoiceEmailNotification(invoice, { name, email, phone });
      } catch (e) {}
    }

    // Send WhatsApp API Message
    if (phone) {
      try {
        await sendWhatsAppMessage({
          phone,
          message: `Dear ${name}, reminder for invoice ${invoice.invoiceNumber} (Total: ₹${invoice.totalAmount.toLocaleString('en-IN')}, Remaining: ₹${invoice.remainingBalance.toLocaleString('en-IN')}). Pay/View online: http://localhost:5173/customer/invoices`,
        });
      } catch (e) {}
    }

    if (invoice.customer?._id) {
      await Notification.create({
        recipient: invoice.customer._id,
        sender: req.user._id,
        title: `Invoice Reminder: ${invoice.invoiceNumber}`,
        message: `Gentle reminder for Invoice ${invoice.invoiceNumber} (Total: ₹${invoice.totalAmount.toLocaleString('en-IN')}, Remaining: ₹${invoice.remainingBalance.toLocaleString('en-IN')}).`,
        type: 'SYSTEM_NOTIFICATION',
        link: '/customer/invoices',
      });
    }

    res.status(200).json({
      success: true,
      message: `Invoice ${invoice.invoiceNumber} directly delivered to ${email} and WhatsApp (+${phone})!`,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Delete Invoice (Admin)
 * @route DELETE /api/invoices/:id
 */
export const deleteInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return next(new AppError('Invoice not found', 404));

    await Invoice.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: `Invoice ${invoice.invoiceNumber} deleted successfully.`,
    });
  } catch (error) {
    next(error);
  }
};
