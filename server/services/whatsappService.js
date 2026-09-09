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
  return `https://api.whatsapp.com/send?phone=${cleanPhone || '919229229323'}&text=${encodedText}`;
};

export const generateInvoiceWhatsAppUrl = (invoice, clientUrl = 'https://moonlight-pink-two.vercel.app') => {
  const phone = invoice.clientInfo?.phone || invoice.customer?.phone || '+919229229323';
  const cleanPhone = (phone || '').replace(/[^\d]/g, '');
  const clientName = invoice.clientInfo?.name || invoice.customer?.name || 'Valued Client';
  const portalLink = `${clientUrl}/customer/invoices`;

  const text = `⚜️ *MOONLIGHT PRODUCTION — OFFICIAL TAX INVOICE & AGREEMENT* ⚜️

Dear *${clientName}*,

Your official tax invoice *${invoice.invoiceNumber}* for royal wedding photography and 4K cinema films has been generated.

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
5. *Digital Storage:* Master files preserved on Moonlight Cloud for *6 Months* post-event.

🏦 *Official Bank Account Details (YES Bank):*
• Account Name: *MOONLIGHT PRODUCTION*
• Bank: *YES BANK Ltd.* (Branch: E-5/6 Arera Colony, Bittan Market, Bhopal - 462016)
• Account Type: *Current Account*
• Account Number: *069861900005221*
• IFSC Code: *YESB0000698*
• GSTIN: *23DHNPR9293D1ZT* | MSME Udyam: *UDYAM-MP-10-0119118*

📥 *Click to View & Download Signed Studio PDF:*
${portalLink}

With Warm Regards,
*Moonlight Production Studio Desk*
Principal Office: C 37, Pallavi Nagar, Rohit Nagar, Bawaria Kalan, Bhopal - 462039
Direct & WhatsApp: +91 92292 29323 / +91 90395 83534
Email: Tarunrathore3435@gmail.com
Instagram: @moonlight_production__`;

  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(text)}`;
};

export const sendEnquiryWhatsAppNotification = async (enquiry) => {
  const message = `Namaste ${enquiry.customerDetails.fullName} ji! 🙏\nThank you for contacting Moonlight Production.\nWe have received your enquiry for ${enquiry.eventType} in ${enquiry.location?.city} on ${new Date(enquiry.eventDate).toLocaleDateString('en-IN')}.\nYour reference ID is ${enquiry.enquiryId}.\nOur Executive Director will connect with you on WhatsApp shortly at +91 92292 29323.`;
  return sendWhatsAppMessage({
    phone: enquiry.customerDetails.whatsappNumber || enquiry.customerDetails.phone,
    message,
  });
};

