import Invoice from '../models/Invoice.js';

export const generateInvoiceNumber = async () => {
  const year = new Date().getFullYear();
  const count = await Invoice.countDocuments();
  const paddedIndex = String(count + 1).padStart(4, '0');
  return `INV-${year}-${paddedIndex}`;
};

export const createInvoiceForBooking = async (booking, customerUser, payment = null) => {
  const invoiceNumber = await generateInvoiceNumber();
  
  const subtotal = Math.round(booking.totalAmount / 1.18);
  const taxAmount = booking.totalAmount - subtotal;
  
  const invoice = await Invoice.create({
    invoiceNumber,
    booking: booking._id,
    customer: customerUser._id,
    payment: payment ? payment._id : null,
    clientInfo: {
      name: customerUser.name,
      email: customerUser.email,
      phone: customerUser.phone,
      address: booking.location ? `${booking.location.venue || ''}, ${booking.location.city || ''}` : '',
    },
    items: [
      {
        description: `${booking.eventType} - ${booking.packageSelected || 'Comprehensive Coverage'}`,
        quantity: 1,
        unitPrice: subtotal,
        total: subtotal,
      }
    ],
    subtotal,
    taxRate: 18,
    taxAmount,
    totalAmount: booking.totalAmount,
    paidAmount: booking.advanceAmount || (payment ? payment.amount : 0),
    remainingBalance: booking.remainingAmount || 0,
    status: booking.paymentStatus === 'PAID' ? 'PAID' : (booking.advanceAmount > 0 ? 'PARTIALLY_PAID' : 'ISSUED'),
  });

  return invoice;
};
