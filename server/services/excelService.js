import * as XLSX from 'xlsx';

/**
 * Generate Excel Workbook buffer for Enquiries
 */
export const generateEnquiriesExcelBuffer = (enquiries) => {
  const rows = enquiries.map((enq) => ({
    'Enquiry Ref ID': enq.enquiryId || '',
    'Lead Source': enq.leadSource || 'Website',
    'Client Full Name': enq.customerDetails?.fullName || '',
    'Email Address': enq.customerDetails?.email || '',
    'Mobile / WhatsApp': enq.customerDetails?.whatsappNumber || enq.customerDetails?.phone || '',
    'Event Type': enq.eventType || '',
    'Event Date': enq.eventDate ? new Date(enq.eventDate).toLocaleDateString('en-IN') : '',
    'City & Location': `${enq.location?.city || ''}${enq.location?.venue ? ' - ' + enq.location.venue : ''}`,
    'Guest Count': enq.guestCount || 0,
    'Budget Range': enq.budgetRange || '',
    'Required Services': (enq.requiredServices || []).join(', '),
    'Quotation Amount (INR)': enq.quotation?.totalAmount ? `₹${enq.quotation.totalAmount.toLocaleString('en-IN')}` : 'Pending Quotation',
    'Status': enq.status || 'NEW',
    'Enquiry Date': enq.createdAt ? new Date(enq.createdAt).toLocaleString('en-IN') : '',
    'Client Story & Notes': enq.storyDetails || '',
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Auto column widths
  worksheet['!cols'] = [
    { wch: 18 }, // Ref ID
    { wch: 16 }, // Lead Source
    { wch: 25 }, // Client Name
    { wch: 28 }, // Email
    { wch: 18 }, // Phone
    { wch: 22 }, // Event Type
    { wch: 14 }, // Event Date
    { wch: 25 }, // City
    { wch: 12 }, // Guests
    { wch: 20 }, // Budget
    { wch: 30 }, // Services
    { wch: 22 }, // Quotation
    { wch: 16 }, // Status
    { wch: 22 }, // Date
    { wch: 40 }, // Story
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Enquiries Pipeline');
  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
};

/**
 * Generate Excel Workbook buffer for Confirmed Bookings
 */
export const generateBookingsExcelBuffer = (bookings) => {
  const rows = bookings.map((bkg) => ({
    'Booking Number': bkg.bookingNumber || '',
    'Client Full Name': bkg.customer?.name || 'Valued Client',
    'Email Address': bkg.customer?.email || '',
    'Phone Number': bkg.customer?.phone || '',
    'Event Type': bkg.eventType || '',
    'Event Date': bkg.eventDate ? new Date(bkg.eventDate).toLocaleDateString('en-IN') : '',
    'City & Venue': `${bkg.location?.city || ''}${bkg.location?.venue ? ' - ' + bkg.location.venue : ''}`,
    'Package / Services': (bkg.services || []).join(', ') || bkg.packageSelected || 'Heritage Wedding Coverage',
    'Total Amount (INR)': Number(bkg.totalAmount || 0),
    'Advance Paid (INR)': Number(bkg.advanceAmount || 0),
    'Balance Due (INR)': Number(bkg.remainingAmount || 0),
    'Payment Status': bkg.paymentStatus || 'UNPAID',
    'Booking Status': bkg.bookingStatus || 'CONFIRMED',
    'Assigned Crew': (bkg.assignedEmployees || []).map((e) => e.name || e).join(', ') || 'Pending Assignment',
    'Created Date': bkg.createdAt ? new Date(bkg.createdAt).toLocaleDateString('en-IN') : '',
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);

  worksheet['!cols'] = [
    { wch: 18 },
    { wch: 25 },
    { wch: 28 },
    { wch: 18 },
    { wch: 22 },
    { wch: 14 },
    { wch: 25 },
    { wch: 30 },
    { wch: 18 },
    { wch: 18 },
    { wch: 18 },
    { wch: 15 },
    { wch: 16 },
    { wch: 30 },
    { wch: 16 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Confirmed Bookings');
  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
};

/**
 * Generate Master Studio Multi-Sheet Excel Workbook
 */
export const generateMasterStudioExcelBuffer = ({ enquiries, bookings, invoices }) => {
  const workbook = XLSX.utils.book_new();

  // Sheet 1: Enquiries
  const enqRows = (enquiries || []).map((enq) => ({
    'Enquiry Ref ID': enq.enquiryId || '',
    'Lead Source': enq.leadSource || 'Website',
    'Client Name': enq.customerDetails?.fullName || '',
    'Email': enq.customerDetails?.email || '',
    'Phone': enq.customerDetails?.whatsappNumber || enq.customerDetails?.phone || '',
    'Event Type': enq.eventType || '',
    'Event Date': enq.eventDate ? new Date(enq.eventDate).toLocaleDateString('en-IN') : '',
    'Location': enq.location?.city || '',
    'Budget': enq.budgetRange || '',
    'Status': enq.status || 'NEW',
    'Created At': enq.createdAt ? new Date(enq.createdAt).toLocaleDateString('en-IN') : '',
  }));
  const wsEnquiries = XLSX.utils.json_to_sheet(enqRows);
  XLSX.utils.book_append_sheet(workbook, wsEnquiries, 'All Enquiries');

  // Sheet 2: Bookings
  const bkgRows = (bookings || []).map((bkg) => ({
    'Booking Ref': bkg.bookingNumber || '',
    'Client': bkg.customer?.name || '',
    'Email': bkg.customer?.email || '',
    'Phone': bkg.customer?.phone || '',
    'Event Type': bkg.eventType || '',
    'Event Date': bkg.eventDate ? new Date(bkg.eventDate).toLocaleDateString('en-IN') : '',
    'Total Amount': bkg.totalAmount || 0,
    'Advance Paid': bkg.advanceAmount || 0,
    'Balance Due': bkg.remainingAmount || 0,
    'Payment Status': bkg.paymentStatus || 'UNPAID',
    'Booking Status': bkg.bookingStatus || 'CONFIRMED',
  }));
  const wsBookings = XLSX.utils.json_to_sheet(bkgRows);
  XLSX.utils.book_append_sheet(workbook, wsBookings, 'Confirmed Bookings');

  // Sheet 3: Invoices
  const invRows = (invoices || []).map((inv) => ({
    'Invoice No': inv.invoiceNumber || '',
    'Client Name': inv.clientInfo?.name || inv.customer?.name || '',
    'Email': inv.clientInfo?.email || '',
    'Phone': inv.clientInfo?.phone || '',
    'Subtotal': inv.subtotal || 0,
    'GST 18%': inv.taxAmount || 0,
    'Grand Total': inv.totalAmount || 0,
    'Paid Amount': inv.paidAmount || 0,
    'Balance Due': inv.remainingBalance || 0,
    'Status': inv.status || 'ISSUED',
    'Due Date': inv.dueDate ? new Date(inv.dueDate).toLocaleDateString('en-IN') : '',
  }));
  const wsInvoices = XLSX.utils.json_to_sheet(invRows);
  XLSX.utils.book_append_sheet(workbook, wsInvoices, 'GST Invoices');

  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
};
