import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * Generates an ultra-luxurious, production-grade Wedding Cinema & Photography Quotation Proposal PDF.
 * Formatted with exact margins (14mm left/right, 182mm content width) and royal typography.
 */
export const generateQuotationPDF = (data = {}) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = 182;
  const rightEdge = margin + contentWidth; // 196mm

  // 1. Top Obsidian Luxury Header Banner
  doc.setFillColor(11, 11, 11);
  doc.rect(0, 0, pageWidth, 44, 'F');

  // Gold Top Accent Line
  doc.setFillColor(212, 175, 55);
  doc.rect(0, 0, pageWidth, 3, 'F');

  // Studio Monogram Crest
  doc.setFillColor(20, 20, 20);
  doc.circle(18, 22, 10, 'F');
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.6);
  doc.circle(18, 22, 10, 'D');

  doc.setTextColor(212, 175, 55);
  doc.setFont('times', 'bold');
  doc.setFontSize(16);
  doc.text('M', 15, 26);

  // Studio Name & Subtitle
  doc.setFont('times', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('MOONLIGHT PRODUCTION', 32, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(212, 175, 55);
  doc.text('ROYAL WEDDING CINEMATOGRAPHY & CANDID PHOTOGRAPHY STUDIO', 32, 23);

  doc.setFontSize(7);
  doc.setTextColor(180, 180, 180);
  doc.text('Central Studio • Bhopal, MP • Hotline: +91 77489 06015 / +91 92292 29323', 32, 28);
  doc.text('Email: nkneeleshkirar@gmail.com • Instagram: @moonlight_production_bhopal', 32, 33);

  // Header Right: Quotation Metadata
  const quoteRef = data.enquiryId || data.bookingNumber || `QTN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const validUntilDate = new Date(Date.now() + 30 * 24 * 3600 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(212, 175, 55);
  doc.text('OFFICIAL PROPOSAL & QUOTATION', rightEdge, 14, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(220, 220, 220);
  doc.text(`Proposal Ref: ${quoteRef}`, rightEdge, 20, { align: 'right' });
  doc.text(`Date Issued: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`, rightEdge, 25, { align: 'right' });
  doc.text(`Valid Until: ${validUntilDate}`, rightEdge, 30, { align: 'right' });

  // Status Badge
  doc.setFillColor(212, 175, 55);
  doc.roundedRect(rightEdge - 42, 33, 42, 5.5, 1, 1, 'F');
  doc.setTextColor(11, 11, 11);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('STATUS: PROPOSAL ACTIVE', rightEdge - 21, 37, { align: 'center' });

  // 2. Client & Event Details Card
  const cardY = 50;
  doc.setFillColor(248, 246, 240);
  doc.roundedRect(margin, cardY, contentWidth, 26, 2, 2, 'F');
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, cardY, contentWidth, 26, 2, 2, 'D');

  const clientName = data.customerDetails?.fullName || data.customer?.name || data.clientInfo?.name || 'Valued Couple';
  const clientEmail = data.customerDetails?.email || data.customer?.email || data.clientInfo?.email || 'N/A';
  const clientPhone = data.customerDetails?.phone || data.customer?.phone || data.clientInfo?.phone || '+91 92292 29323';
  const eventType = data.eventType || 'Royal Palace Destination Wedding';
  const eventDateStr = data.eventDate ? new Date(data.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'November 2026';
  const eventLocation = data.location?.venue ? `${data.location.venue}, ${data.location.city}` : data.location?.city || 'Central India';

  // Left Column - Client
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(160, 120, 20);
  doc.text('PROPOSAL PREPARED FOR:', margin + 4, cardY + 6);

  doc.setFont('times', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(20, 20, 20);
  doc.text(clientName, margin + 4, cardY + 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(80, 80, 80);
  doc.text(`Mobile / WhatsApp: ${clientPhone}`, margin + 4, cardY + 17);
  doc.text(`Email: ${clientEmail}`, margin + 4, cardY + 22);

  // Right Column - Event Scope
  const rightColX = margin + 96;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(160, 120, 20);
  doc.text('EVENT DESTINATION & DATES:', rightColX, cardY + 6);

  doc.setFont('times', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(20, 20, 20);
  doc.text(eventType, rightColX, cardY + 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(80, 80, 80);
  doc.text(`Date of Festivities: ${eventDateStr}`, rightColX, cardY + 17);
  doc.text(`Destination / Venue: ${eventLocation}`, rightColX, cardY + 22);

  // 3. Itemized Quotation Inclusions Table
  const totalVal = Number(data.quotation?.totalAmount || data.totalAmount || 850000);
  const items = data.items && data.items.length > 0 ? data.items : [
    {
      description: '4K Ultra-HD Cinematic Wedding Feature Film (DaVinci Resolve Master Color Graded)',
      quantity: 1,
      unitPrice: Math.round(totalVal * 0.35),
      total: Math.round(totalVal * 0.35),
    },
    {
      description: 'Royal Candid Photography by Senior Master Cameramen & Signature Portraiture',
      quantity: 2,
      unitPrice: Math.round(totalVal * 0.15),
      total: Math.round(totalVal * 0.30),
    },
    {
      description: 'Licensed Aerial Drone Sweeps (4K 60FPS) for Grand Baraat & Venue Panoramas',
      quantity: 1,
      unitPrice: Math.round(totalVal * 0.15),
      total: Math.round(totalVal * 0.15),
    },
    {
      description: '2x Premium Italian Leather Handcrafted Flush-Mount Coffee Table Albums (300 GSM)',
      quantity: 2,
      unitPrice: Math.round(totalVal * 0.10),
      total: Math.round(totalVal * 0.20),
    },
  ];

  const tableData = items.map((it, idx) => [
    idx + 1,
    it.description,
    it.quantity || 1,
    `INR ${Number(it.unitPrice || 0).toLocaleString('en-IN')}`,
    `INR ${Number(it.total || (it.unitPrice || 0) * (it.quantity || 1)).toLocaleString('en-IN')}`,
  ]);

  doc.autoTable({
    startY: 80,
    head: [['#', 'Cinema & Photography Deliverable Inclusions', 'Qty', 'Unit Rate (INR)', 'Total (INR)']],
    body: tableData,
    margin: { left: margin, right: margin },
    theme: 'grid',
    headStyles: {
      fillColor: [212, 175, 55],
      textColor: [11, 11, 11],
      fontStyle: 'bold',
      fontSize: 8,
      halign: 'left',
    },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 102 },
      2: { cellWidth: 15, halign: 'center' },
      3: { cellWidth: 27, halign: 'right' },
      4: { cellWidth: 28, halign: 'right' },
    },
    styles: {
      fontSize: 7.5,
      textColor: [40, 40, 40],
      cellPadding: 2.5,
    },
    alternateRowStyles: {
      fillColor: [253, 251, 247],
    },
  });

  const finalY = doc.lastAutoTable.finalY + 4;

  // 4. Financial Calculation Box (Right Side)
  const subtotal = totalVal;
  const gstRate = 18;
  const gstAmount = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gstAmount;
  const advanceRetainer = Math.round(grandTotal * 0.30);
  const shootDue = Math.round(grandTotal * 0.50);
  const deliveryDue = grandTotal - advanceRetainer - shootDue;

  doc.setFillColor(250, 250, 250);
  doc.roundedRect(120, finalY, 76, 34, 1.5, 1.5, 'F');
  doc.setDrawColor(220, 220, 220);
  doc.roundedRect(120, finalY, 76, 34, 1.5, 1.5, 'D');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(80, 80, 80);
  doc.text('Package Subtotal:', 124, finalY + 5);
  doc.text(`INR ${subtotal.toLocaleString('en-IN')}`, 192, finalY + 5, { align: 'right' });

  doc.text(`GST (${gstRate}%):`, 124, finalY + 10);
  doc.text(`INR ${gstAmount.toLocaleString('en-IN')}`, 192, finalY + 10, { align: 'right' });

  // Grand Total Highlight
  doc.setFillColor(212, 175, 55);
  doc.rect(120, finalY + 13, 76, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(0, 0, 0);
  doc.text('Estimated Grand Total:', 124, finalY + 18);
  doc.text(`INR ${grandTotal.toLocaleString('en-IN')}`, 192, finalY + 18, { align: 'right' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(34, 150, 80);
  doc.text('30% Advance to Book Dates:', 124, finalY + 24);
  doc.text(`INR ${advanceRetainer.toLocaleString('en-IN')}`, 192, finalY + 24, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('50% Due Before Shoot Commencement', 124, finalY + 29);
  doc.text('20% Due at Deliverables Handover', 124, finalY + 33);

  // 5. Studio Bank Account & UPI Box (Left Side of Totals)
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(margin, finalY, 102, 34, 1.5, 1.5, 'F');
  doc.setDrawColor(212, 175, 55);
  doc.roundedRect(margin, finalY, 102, 34, 1.5, 1.5, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(212, 175, 55);
  doc.text('OFFICIAL STUDIO PAYMENT DETAILS (TO LOCK SHOOT DATES):', margin + 4, finalY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(60, 60, 60);
  doc.text('Beneficiary: Moonlight Production & Films', margin + 4, finalY + 10);
  doc.text('Bank: HDFC Bank Ltd., Central Branch', margin + 4, finalY + 15);
  doc.text('A/C No: 50200084920194  |  IFSC Code: HDFC0000043', margin + 4, finalY + 20);
  doc.setFont('helvetica', 'bold');
  doc.text('Official UPI ID: moonlightproduction@hdfcbank', margin + 4, finalY + 25);
  doc.setFont('helvetica', 'normal');
  doc.text('Share payment screenshot on WhatsApp to lock calendar reservation.', margin + 4, finalY + 30);

  // 6. Production Milestone & Terms Box
  const tncY = finalY + 38;
  doc.setFillColor(252, 250, 245);
  doc.roundedRect(margin, tncY, contentWidth, 58, 2, 2, 'F');
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, tncY, contentWidth, 58, 2, 2, 'D');

  doc.setFont('times', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(170, 130, 20);
  doc.text('ROYAL WEDDING PRODUCTION TERMS & PROPOSAL PROTOCOL', margin + 4, tncY + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(40, 40, 40);

  const tncLines = [
    '1. CALENDAR RESERVATION: Shoot dates are locked strictly upon receipt of the 30% advance booking retainer on a first-come, first-served basis.',
    '2. ADVANCE NON-REFUNDABLE POLICY: The 30% advance retainer is strictly non-refundable under all circumstances due to date blocking and dedicated crew reservation.',
    '3. EDITING & POST-PRODUCTION: Master color-graded photographs and 4K cinematic docu-films will be delivered within 90 days (3 months) from the wedding conclusion.',
    '4. TRAVEL & LOGISTICS: For destination assignments outside Bhopal, client provides return flight/train tickets, local airport/venue transfers, and comfortable crew accommodation.',
    '5. DIGITAL CLOUD STORAGE: Master raw footage and color-graded exports are preserved in our cloud archive for 6 months post-event for couple download.',
    '6. PROPOSAL VALIDITY: This proposal and pricing estimate remain valid for 30 days from the date of issuance.',
    '7. JURISDICTION: All agreements are subject to court jurisdiction in Madhya Pradesh, India.',
  ];

  let currentLineY = tncY + 10.5;
  tncLines.forEach((clause) => {
    const wrapped = doc.splitTextToSize(clause, 174);
    doc.text(wrapped, margin + 4, currentLineY);
    currentLineY += wrapped.length * 3.1 + 0.8;
  });

  // 7. Signature Block & Footer
  const footerY = 280;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(margin, footerY - 4, rightEdge, footerY - 4);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(120, 120, 120);
  doc.text('Moonlight Production • Luxury Wedding Cinema & Candid Photography Studio', margin, footerY);

  // Digital Signature Stamp
  doc.setFont('times', 'bolditalic');
  doc.setFontSize(8.5);
  doc.setTextColor(212, 175, 55);
  doc.text('Neelesh Kirar — Founder & Executive Director', rightEdge, footerY - 1, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(100, 100, 100);
  doc.text('Authorized Studio Proposal Seal • Moonlight Production', rightEdge, footerY + 2.5, { align: 'right' });

  // 8. Bottom Accent Bar
  doc.setFillColor(11, 11, 11);
  doc.rect(0, pageHeight - 6, pageWidth, 6, 'F');
  doc.setFillColor(212, 175, 55);
  doc.rect(0, pageHeight - 6, pageWidth, 1, 'F');

  const cleanName = clientName.replace(/\s+/g, '_');
  doc.save(`Moonlight_Proposal_Quotation_${cleanName}.pdf`);
  return doc;
};
