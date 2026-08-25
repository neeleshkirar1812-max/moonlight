import { ENV } from '../config/env.js';

export const sendWhatsAppMessage = async ({ phone, message, templateName, components }) => {
  console.log(`[WhatsApp Service] Triggering message to ${phone}`);
  // In production, interacts with Meta WhatsApp Cloud API / Twilio / Wati
  return {
    success: true,
    messageId: `wamid_${Date.now()}`,
    recipient: phone,
  };
};

export const generateWhatsAppClickUrl = (phone, text) => {
  const cleanPhone = (phone || '').replace(/[^\d]/g, '');
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
};

export const generateInvoiceWhatsAppUrl = (invoice, clientUrl = 'http://localhost:5173') => {
  const phone = invoice.clientInfo?.phone || invoice.customer?.phone || '+919820012345';
  const cleanPhone = (phone || '').replace(/[^\d]/g, '');
  const clientName = invoice.clientInfo?.name || invoice.customer?.name || 'Valued Client';
  const portalLink = `${clientUrl}/customer/invoices`;

  const text = `⚜️ *LUMIÈRE STUDIOS — OFFICIAL TAX INVOICE & AGREEMENT* ⚜️

Dear *${clientName}*,

Your official invoice *${invoice.invoiceNumber}* for wedding photography and cinema deliverables has been generated.

📋 *Invoice & Financial Summary:*
• Subtotal: ₹${Number(invoice.subtotal).toLocaleString('en-IN')}
• GST (18%): ₹${Number(invoice.taxAmount).toLocaleString('en-IN')}
• *Total Package Amount:* ₹${Number(invoice.totalAmount).toLocaleString('en-IN')}
• *Paid to Date:* ₹${Number(invoice.paidAmount || 0).toLocaleString('en-IN')}
• *Remaining Balance:* ₹${Number(invoice.remainingBalance).toLocaleString('en-IN')}
• *Status:* ${invoice.status}
• *Due Date:* ${new Date(invoice.dueDate || invoice.issueDate).toLocaleDateString('en-IN')}

📜 *Studio Payment Milestones & Terms:*
1. *30% Booking Retainer:* Non-refundable retainer to lock dates and crew.
2. *50% Pre-Wedding Payment:* Due before wedding/shoot commencement.
3. *20% Final Delivery Balance:* Payable upon handover of final media & albums.
4. *Delivery SLA:* High-res photos & 4K films delivered within *90 Days (3 Months)*.
5. *Digital Storage:* Project files preserved on Lumière Cloud for *6 Months* post-event.

🏦 *Studio Bank Details:*
• Bank: HDFC Bank Ltd. (Bandra West, Mumbai)
• A/C No: 50200084920194 | IFSC: HDFC0000043
• UPI: *lumierestudios@hdfcbank*

📥 *Click to View & Download Signed Studio PDF:*
${portalLink}

With Warm Regards,
*Lumière Studios Atelier Concierge*
Bandra West Penthouse, Mumbai`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
};

export const sendEnquiryWhatsAppNotification = async (enquiry) => {
  const message = `Hello ${enquiry.customerDetails.fullName}, thank you for contacting Lumière Studios. We have received your enquiry for ${enquiry.eventType} on ${new Date(enquiry.eventDate).toLocaleDateString('en-IN')}. Your reference ID is ${enquiry.enquiryId}. Our concierge team will connect with you shortly.`;
  return sendWhatsAppMessage({
    phone: enquiry.customerDetails.whatsappNumber || enquiry.customerDetails.phone,
    message,
  });
};
