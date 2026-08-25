import { ENV } from '../config/env.js';

export const sendEmailNotification = async ({ to, subject, template, data, html }) => {
  console.log(`[Email Service] Dispatched "${subject}" to ${to}`);
  // In production, interacts with EmailJS / Resend / SendGrid / Nodemailer SMTP
  return {
    success: true,
    messageId: `msg_${Date.now()}`,
    recipient: to,
  };
};

export const sendInvoiceEmailNotification = async (invoice, customerUser) => {
  const email = invoice.clientInfo?.email || customerUser?.email;
  const name = invoice.clientInfo?.name || customerUser?.name || 'Valued Client';

  return sendEmailNotification({
    to: email,
    subject: `Official GST Tax Invoice ${invoice.invoiceNumber} | Lumière Studios Atelier`,
    template: 'invoice_dispatched',
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: #0B0B0B; color: #FFFFFF; padding: 40px 30px; border-radius: 16px; border: 1px solid #D4AF37; max-width: 680px; margin: auto;">
        <div style="text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.4); padding-bottom: 20px; margin-bottom: 24px;">
          <h1 style="color: #D4AF37; margin: 0; font-size: 26px; letter-spacing: 3px; font-family: Georgia, serif;">LUMIÈRE STUDIOS</h1>
          <p style="color: #F5E6BE; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-top: 5px;">Atelier of Royal Wedding Photography & Haute Cinema</p>
          <p style="color: #888; font-size: 10px; margin-top: 4px;">GSTIN: 27AAAAA0000A1Z5 • Mumbai • Lake Como • Paris</p>
        </div>
        
        <p style="font-size: 15px; color: #E5E5E5;">Dear <strong>${name}</strong>,</p>
        <p style="font-size: 13px; color: #B0B0B0; line-height: 1.6;">Your official studio tax invoice and production agreement <strong>${invoice.invoiceNumber}</strong> has been generated for your celebration.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 12px; background: #141414; border-radius: 10px; overflow: hidden; border: 1px solid #2A2A2A;">
          <tr style="background: #1F1F1F; color: #D4AF37;">
            <th style="padding: 12px 10px; text-align: left;">Invoice Number</th>
            <th style="padding: 12px 10px; text-align: right;">Total Amount</th>
            <th style="padding: 12px 10px; text-align: right;">Paid to Date</th>
            <th style="padding: 12px 10px; text-align: right;">Remaining Due</th>
          </tr>
          <tr style="color: #FFFFFF; border-top: 1px solid #2A2A2A;">
            <td style="padding: 14px 10px; font-family: monospace; font-weight: bold; color: #D4AF37;">${invoice.invoiceNumber}</td>
            <td style="padding: 14px 10px; text-align: right; font-weight: bold;">₹${Number(invoice.totalAmount).toLocaleString('en-IN')}</td>
            <td style="padding: 14px 10px; text-align: right; color: #34D399; font-weight: bold;">₹${Number(invoice.paidAmount || 0).toLocaleString('en-IN')}</td>
            <td style="padding: 14px 10px; text-align: right; color: #F59E0B; font-weight: bold;">₹${Number(invoice.remainingBalance).toLocaleString('en-IN')}</td>
          </tr>
        </table>

        <!-- Studio Bank Transfer Card -->
        <div style="background: #161616; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 10px; padding: 16px; margin: 20px 0; font-size: 11px; line-height: 1.6;">
          <strong style="color: #D4AF37; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; display: block; margin-bottom: 6px;">🏦 Official Studio Bank & UPI Details:</strong>
          <span style="color: #DDD;">Beneficiary: <strong>Lumière Studios International Ltd.</strong></span><br/>
          <span style="color: #AAA;">Bank: HDFC Bank Ltd., Bandra West Branch, Mumbai</span><br/>
          <span style="color: #AAA;">A/C No: <strong style="color: #FFF;">50200084920194</strong> | IFSC: <strong style="color: #FFF;">HDFC0000043</strong></span><br/>
          <span style="color: #34D399;">Official Studio UPI ID: <strong>lumierestudios@hdfcbank</strong></span>
        </div>

        <!-- Official Studio Terms & Conditions -->
        <div style="background: #121212; border: 1px solid #262626; border-radius: 10px; padding: 18px; margin: 20px 0; font-size: 11px; color: #AAA; line-height: 1.7;">
          <strong style="color: #D4AF37; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; display: block; margin-bottom: 8px;">📜 Studio Terms & Conditions (T&C):</strong>
          <ul style="margin: 0; padding-left: 16px;">
            <li><strong style="color: #EEE;">Payment Milestones:</strong> 30% advance retainer to confirm booking; 50% due prior to wedding/shoot date; 20% on final deliverables handover.</li>
            <li><strong style="color: #EEE;">Advance Policy:</strong> The 30% advance retainer is strictly non-refundable under all circumstances due to exclusive date locking and crew scheduling.</li>
            <li><strong style="color: #EEE;">Delivery SLA:</strong> Edited photographs and 4K cinema films delivered within <strong>90 days (3 months)</strong>.</li>
            <li><strong style="color: #EEE;">Cloud Backup Retention:</strong> Master project data is preserved digitally on Lumière Cloud for <strong>6 months</strong> post-event, after which storage is cleared.</li>
            <li><strong style="color: #EEE;">Copyright:</strong> Studio retains moral rights for portfolio & awards; couples receive unrestricted personal print and social media rights.</li>
          </ul>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${ENV.CLIENT_URL || 'http://localhost:5173'}/customer/invoices" style="background: linear-gradient(135deg, #D4AF37, #AA820A); color: #000000; padding: 14px 36px; border-radius: 30px; text-decoration: none; font-weight: bold; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; display: inline-block; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">
            VIEW INVOICE & DOWNLOAD SIGNED PDF →
          </a>
        </div>

        <p style="font-size: 10px; color: #666; text-align: center; margin-top: 30px; border-top: 1px solid #222; padding-top: 20px;">
          Lumière Studios International Ltd. • GSTIN: 27AAAAA0000A1Z5<br/>
          Lumière Penthouse, Bandra West, Mumbai 400050 • Concierge: +91 98200 12345
        </p>
      </div>
    `,
    data: {
      name,
      invoiceNumber: invoice.invoiceNumber,
      totalAmount: invoice.totalAmount,
      remainingBalance: invoice.remainingBalance,
    },
  });
};

export const sendEnquiryConfirmationEmail = async (enquiry) => {
  return sendEmailNotification({
    to: enquiry.customerDetails.email,
    subject: `Enquiry Received: ${enquiry.enquiryId} | Lumière Studios`,
    template: 'enquiry_confirmation',
    data: {
      name: enquiry.customerDetails.fullName,
      enquiryId: enquiry.enquiryId,
      eventType: enquiry.eventType,
      eventDate: enquiry.eventDate,
      location: enquiry.location.city,
    },
  });
};

export const sendBookingConfirmationEmail = async (booking, customerUser) => {
  return sendEmailNotification({
    to: customerUser.email,
    subject: `Booking Confirmed: ${booking.bookingNumber} | Lumière Studios`,
    template: 'booking_confirmation',
    data: {
      name: customerUser.name,
      bookingNumber: booking.bookingNumber,
      eventType: booking.eventType,
      eventDate: booking.eventDate,
      totalAmount: booking.totalAmount,
    },
  });
};

export const sendPaymentReceiptEmail = async (payment, user) => {
  return sendEmailNotification({
    to: user.email,
    subject: `Payment Receipt: ₹${payment.amount.toLocaleString('en-IN')} Received | Lumière Studios`,
    template: 'payment_receipt',
    data: {
      name: user.name,
      paymentNumber: payment.paymentNumber,
      amount: payment.amount,
      razorpayPaymentId: payment.razorpayPaymentId,
    },
  });
};
