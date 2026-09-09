import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * Generates an ultra-luxurious, production-grade Studio Tax Invoice PDF with full legal Terms & Conditions and payment milestones.
 */
export const generateLuxuryInvoicePDF = (inv) => {
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

  // 1. Top Obsidian Luxury Banner
  doc.setFillColor(11, 11, 11);
  doc.rect(0, 0, pageWidth, 44, 'F');

  // Gold Accent Top Bar
  doc.setFillColor(212, 175, 55);
  doc.rect(0, 0, pageWidth, 3, 'F');

  // Studio Monogram Circle
  doc.setFillColor(20, 20, 20);
  doc.circle(18, 22, 10, 'F');
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.6);
  doc.circle(18, 22, 10, 'D');

  doc.setTextColor(212, 175, 55);
  doc.setFont('times', 'bold');
  doc.setFontSize(16);
  doc.text('M', 15, 26);

  // Studio Name & Hierarchy
  doc.setFont('times', 'bold');
  doc.setFontSize(17);
  doc.setTextColor(255, 255, 255);
  doc.text('MOONLIGHT PRODUCTION', 32, 17);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(212, 175, 55);
  doc.text('ROYAL INDIAN WEDDING PHOTOGRAPHY & 4K CINEMATIC FILMS (PROP. RAKSHA RATHORE)', 32, 22);

  doc.setFontSize(6.5);
  doc.setTextColor(190, 190, 190);
  doc.text('GSTIN: 23DHNPR9293D1ZT • MSME UDYAM: UDYAM-MP-10-0119118 • PAN: DHNPR9293D', 32, 27);
  doc.text('Regd. Office: C 37, Pallavi Nagar, Rohit Nagar, Bawaria Kalan, Bhopal, MP - 462039', 32, 31.5);
  doc.text('WhatsApp: +91 92292 29323 • Phone: +91 90395 83534 • Email: Tarunrathore3435@gmail.com', 32, 36);

  // Right Side Header Metadata (Aligned to 196mm)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(212, 175, 55);
  doc.text('TAX INVOICE', rightEdge, 14, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(220, 220, 220);
  doc.text(`Invoice No: ${inv.invoiceNumber}`, rightEdge, 20, { align: 'right' });
  doc.text(`Issue Date: ${new Date(inv.issueDate || Date.now()).toLocaleDateString('en-IN')}`, rightEdge, 25, { align: 'right' });
  doc.text(`Due Date: ${new Date(inv.dueDate || Date.now()).toLocaleDateString('en-IN')}`, rightEdge, 30, { align: 'right' });
  
  // Status Badge
  const statusColor = inv.status === 'PAID' ? [34, 197, 94] : inv.status === 'PARTIALLY_PAID' ? [59, 130, 246] : [212, 175, 55];
  doc.setFillColor(...statusColor);
  doc.roundedRect(rightEdge - 42, 33, 42, 5.5, 1, 1, 'F');
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text(`STATUS: ${inv.status || 'ISSUED'}`, rightEdge - 21, 37, { align: 'center' });

  // 2. Client Details Section Card
  doc.setFillColor(248, 246, 240);
  doc.roundedRect(14, 49, 182, 24, 2, 2, 'F');
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.3);
  doc.roundedRect(14, 49, 182, 24, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(160, 120, 20);
  doc.text('BILLED TO (CLIENT DETAILS):', 18, 55);

  doc.setFont('times', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(20, 20, 20);
  doc.text(`${inv.clientInfo?.name || inv.customer?.name || 'Valued Client'}`, 18, 61);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(80, 80, 80);
  doc.text(`Email: ${inv.clientInfo?.email || inv.customer?.email || 'N/A'}`, 18, 66);
  doc.text(`Mobile / WhatsApp: ${inv.clientInfo?.phone || inv.customer?.phone || 'N/A'}`, 105, 66);
  if (inv.clientInfo?.address) {
    doc.text(`Venue / Billing Address: ${inv.clientInfo.address}`, 18, 70);
  }

  // 3. Line Items Table
  const tableData = (inv.items || []).map((item, idx) => [
    idx + 1,
    item.description,
    item.quantity || 1,
    `INR ${Number(item.unitPrice || 0).toLocaleString('en-IN')}`,
    `INR ${Number(item.total || item.unitPrice * (item.quantity || 1)).toLocaleString('en-IN')}`,
  ]);

  doc.autoTable({
    startY: 77,
    head: [['#', 'Description of Wedding Cinema & Photography Services', 'Qty', 'Rate (INR)', 'Amount (INR)']],
    body: tableData,
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

  // 4. Financial Calculations Box (Right Side)
  const subtotal = Number(inv.subtotal || 0);
  const taxRate = Number(inv.taxRate || 18);
  const taxAmount = Number(inv.taxAmount || 0);
  const grandTotal = Number(inv.totalAmount || 0);
  const paidAmount = Number(inv.paidAmount || 0);
  const remaining = Number(inv.remainingBalance || 0);

  doc.setFillColor(250, 250, 250);
  doc.roundedRect(120, finalY, 76, 32, 1.5, 1.5, 'F');
  doc.setDrawColor(220, 220, 220);
  doc.roundedRect(120, finalY, 76, 32, 1.5, 1.5, 'D');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(80, 80, 80);
  doc.text(`Subtotal:`, 124, finalY + 5);
  doc.text(`INR ${subtotal.toLocaleString('en-IN')}`, 192, finalY + 5, { align: 'right' });

  doc.text(`GST (${taxRate}%):`, 124, finalY + 10);
  doc.text(`INR ${taxAmount.toLocaleString('en-IN')}`, 192, finalY + 10, { align: 'right' });

  // Grand Total Highlight
  doc.setFillColor(212, 175, 55);
  doc.rect(120, finalY + 13, 76, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(0, 0, 0);
  doc.text(`Grand Total Amount:`, 124, finalY + 18);
  doc.text(`INR ${grandTotal.toLocaleString('en-IN')}`, 192, finalY + 18, { align: 'right' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(34, 150, 80);
  doc.text(`Paid to Date:`, 124, finalY + 24);
  doc.text(`INR ${paidAmount.toLocaleString('en-IN')}`, 192, finalY + 24, { align: 'right' });

  doc.setTextColor(200, 40, 40);
  doc.text(`Balance Remaining:`, 124, finalY + 29);
  doc.text(`INR ${remaining.toLocaleString('en-IN')}`, 192, finalY + 29, { align: 'right' });

  // 5. Official Studio Bank Account Box (SBI)
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(margin, finalY, 102, 32, 1.5, 1.5, 'F');
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, finalY, 102, 32, 1.5, 1.5, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(212, 175, 55);
  doc.text('OFFICIAL STUDIO PAYMENT DETAILS (NEFT / RTGS / IMPS / UPI):', margin + 4, finalY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(60, 60, 60);
  doc.text('Beneficiary Name: Raksha Rathore (Moonlight Production)', margin + 4, finalY + 10);
  doc.text('Bank Name: State Bank of India (SBI)', margin + 4, finalY + 14.5);
  doc.text('A/C No: 63032503918  |  IFSC Code: SBIN0061083', margin + 4, finalY + 19);
  doc.setFont('helvetica', 'bold');
  doc.text('Official UPI / PhonePe / GPay: 9039583534 / 9229229323', margin + 4, finalY + 24);
  doc.setFont('helvetica', 'normal');
  doc.text('MSME Udyam: UDYAM-MP-10-0119118 • Share UTR on WhatsApp', margin + 4, finalY + 28.5);

  // 6. Comprehensive Studio Terms & Conditions (T&C) Box
  const tncY = finalY + 36;
  doc.setFillColor(252, 250, 245);
  doc.roundedRect(margin, tncY, contentWidth, 58, 2, 2, 'F');
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, tncY, contentWidth, 58, 2, 2, 'D');

  doc.setFont('times', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(170, 130, 20);
  doc.text('STUDIO TERMS & CONDITIONS AND PRODUCTION AGREEMENT', margin + 4, tncY + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(40, 40, 40);

  const tncLines = [
    '1. PAYMENT SCHEDULE: 30% advance booking retainer to lock shoot dates; 50% payment strictly due before shoot/wedding commencement; remaining 20% balance payable at the time of final deliverables handover.',
    '2. ADVANCE NON-REFUNDABLE POLICY: The 30% advance retainer is 100% non-refundable under all circumstances due to exclusive date blocking and crew reservations.',
    '3. EDITING & DELIVERY TIMELINE: Master color-graded photographs and 4K cinematic docu-films will be delivered within 90 days (3 months) from the conclusion of wedding festivities.',
    '4. DIGITAL ARCHIVE STORAGE: Raw and master project files remain archived on our high-security cloud servers for 6 months post-event. After 6 months, storage is purged and the studio assumes no digital retention liability.',
    '5. REVISIONS POLICY: Client package includes one (1) complimentary round of editorial feedback on the wedding cinema teaser/film within 14 days of online preview release.',
    '6. COPYRIGHT & MORAL RIGHTS: Moonlight Production retains moral creative copyright for fine-art exhibition and award entries. Couples receive full unrestricted rights for personal printing and social media usage.',
    '7. FORCE MAJEURE & JURISDICTION: Date rescheduling requires minimum 45 days written notice and is subject to studio crew availability. All legal matters subject to court jurisdiction in MP, India.',
  ];

  let currentLineY = tncY + 10.5;
  tncLines.forEach((clause) => {
    const wrapped = doc.splitTextToSize(clause, 174);
    doc.text(wrapped, margin + 4, currentLineY);
    currentLineY += wrapped.length * 3.1 + 0.8;
  });

  // 7. Signatory & Studio Seal
  const footerY = 280;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(margin, footerY - 4, rightEdge, footerY - 4);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(120, 120, 120);
  doc.text('Moonlight Production & Films • Mastercrafted Luxury Wedding Media • linktr.ee/moonlight_photography_in', margin, footerY);

  // Digital Signature Stamp
  doc.setFont('times', 'bolditalic');
  doc.setFontSize(8.5);
  doc.setTextColor(212, 175, 55);
  doc.text('Moonlight Production Lead Director', rightEdge, footerY - 1, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(100, 100, 100);
  doc.text('Founder & Creative Director (Authorized Signatory)', rightEdge, footerY + 2.5, { align: 'right' });

  doc.save(`${inv.invoiceNumber || 'Moonlight_Invoice'}.pdf`);
  return doc;
};
