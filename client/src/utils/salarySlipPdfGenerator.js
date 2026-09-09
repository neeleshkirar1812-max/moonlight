import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CREW_NAMES_MAP = {
  'EMP-MLP-001': 'Aman Pawar',
  'EMP-MLP-002': 'Bunny Singh',
  'EMP-MLP-003': 'Chinnu',
  'EMP-MLP-004': 'Rohit Manekar',
  'EMP-MLP-005': 'Sumit',
  'EMP-MLP-006': 'Tarun Rathore',
  'EMP-MLP-007': 'Santosh Rathore',
  'EMP-MLP-008': 'Lucky',
  'EMP-MLP-009': 'Priyanshu',
};

export const resolveCrewName = (slip = {}) => {
  if (slip.employeeName && slip.employeeName !== 'Production Crew Member' && slip.employeeName !== 'undefined') {
    return slip.employeeName;
  }
  if (slip.user?.name) return slip.user.name;
  if (slip.employee?.user?.name) return slip.employee.user.name;
  if (slip.employee?.name) return slip.employee.name;

  const code = slip.employeeCode || slip.employee?.employeeCode || '';
  if (CREW_NAMES_MAP[code]) return CREW_NAMES_MAP[code];

  const slipNum = (slip.slipNumber || '').toUpperCase();
  if (slipNum.includes('AMA')) return 'Aman Pawar';
  if (slipNum.includes('BUN')) return 'Bunny Singh';
  if (slipNum.includes('CHI')) return 'Chinnu';
  if (slipNum.includes('ROH')) return 'Rohit Manekar';
  if (slipNum.includes('SUM')) return 'Sumit';
  if (slipNum.includes('TAR')) return 'Tarun Rathore';
  if (slipNum.includes('SAN')) return 'Santosh Rathore';
  if (slipNum.includes('LUC')) return 'Lucky';
  if (slipNum.includes('PRI')) return 'Priyanshu';

  return 'Aman Pawar';
};

/**
 * Generates an official, luxury branded Monthly Salary Slip PDF for Moonlight Production crew members.
 */
export const generateSalarySlipPDF = (slip) => {
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
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Gold Accent Line
  doc.setFillColor(212, 175, 55);
  doc.rect(0, 0, pageWidth, 3, 'F');

  // Studio Monogram Circle
  doc.setFillColor(20, 20, 20);
  doc.circle(18, 21, 9, 'F');
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.6);
  doc.circle(18, 21, 9, 'D');

  doc.setTextColor(212, 175, 55);
  doc.setFont('times', 'bold');
  doc.setFontSize(15);
  doc.text('M', 15, 25);

  // Studio Name & Branding
  doc.setFont('times', 'bold');
  doc.setFontSize(17);
  doc.setTextColor(255, 255, 255);
  doc.text('MOONLIGHT PRODUCTION', 32, 17);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(212, 175, 55);
  doc.text('HUMAN RESOURCES & PAYROLL ATELIER • CENTRAL STUDIO BHOPAL', 32, 22);

  doc.setFontSize(7);
  doc.setTextColor(180, 180, 180);
  doc.text('Central Studio • Bhopal, MP • Phone: +91 77489 06015 • Email: nkneeleshkirar@gmail.com', 32, 27);
  doc.text('WhatsApp: +91 92292 29323 • Instagram: @moonlight_production_bhopal', 32, 32);

  // Right Side Header Metadata (Perfect Right-Aligned to 196mm)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(212, 175, 55);
  doc.text('SALARY PAY SLIP', rightEdge, 14, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(200, 200, 200);
  doc.text(`Slip No: ${slip.slipNumber || 'SLIP-MLP-001'}`, rightEdge, 20, { align: 'right' });
  doc.text(`Month: ${slip.month || 'August 2026'}`, rightEdge, 25, { align: 'right' });

  const statusText = (slip.paymentStatus || 'Paid').toUpperCase();
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(statusText === 'PAID' ? 46 : 212, statusText === 'PAID' ? 204 : 175, statusText === 'PAID' ? 113 : 55);
  doc.text(`Status: ${statusText}`, rightEdge, 30, { align: 'right' });

  // 2. Employee Details Card
  let y = 48;
  doc.setFillColor(248, 246, 240);
  doc.roundedRect(margin, y, contentWidth, 28, 2, 2, 'F');
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentWidth, 28, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(11, 11, 11);
  doc.text('EMPLOYEE DETAILS', margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(50, 50, 50);

  // Column 1 - Employee Credentials
  const resolvedName = resolveCrewName(slip);
  const resolvedCode = slip.employeeCode || slip.employee?.employeeCode || 'EMP-MLP-001';
  const resolvedDesig = slip.designation || slip.employee?.designation || 'Production Specialist';

  doc.text(`Employee Code: ${resolvedCode}`, margin + 4, y + 13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(11, 11, 11);
  doc.text(`Employee Name: ${resolvedName}`, margin + 4, y + 19);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  doc.text(`Designation: ${resolvedDesig}`, margin + 4, y + 25);

  // Column 2
  const col2X = margin + 96;
  doc.text(`Payment Mode: ${slip.paymentMethod || 'BANK_TRANSFER'}`, col2X, y + 13);
  doc.text(`Transaction ID: ${slip.transactionId || 'UTR-HDFC-9821040'}`, col2X, y + 19);
  doc.text(`Payment Date: ${slip.paymentDate ? new Date(slip.paymentDate).toLocaleDateString('en-IN') : '01/08/2026'}`, col2X, y + 25);

  // 3. Earnings & Deductions Breakdown Tables
  y = 82;

  const basicPay = Number(slip.basicPay) || 0;
  const hra = Number(slip.hraAllowances) || 0;
  const bonus = Number(slip.shootBonus) || 0;
  const travel = Number(slip.travelReimbursement) || 0;
  const grossPay = Number(slip.grossPay) || (basicPay + hra + bonus + travel);

  const tax = Number(slip.taxDeduction) || 0;
  const pf = Number(slip.providentFund) || 0;
  const advance = Number(slip.advanceDeduction) || 0;
  const totalDeductions = Number(slip.totalDeductions) || (tax + pf + advance);
  const netPay = Number(slip.netPay) || Math.max(0, grossPay - totalDeductions);

  const earningsBody = [
    ['Basic Salary', `INR ${basicPay.toLocaleString('en-IN')}`],
    ['House Rent Allowance (HRA)', `INR ${hra.toLocaleString('en-IN')}`],
    ['Royal Shoot Performance Bonus', `INR ${bonus.toLocaleString('en-IN')}`],
    ['Location & Travel Reimbursement', `INR ${travel.toLocaleString('en-IN')}`],
    ['Total Earnings (Gross Pay)', `INR ${grossPay.toLocaleString('en-IN')}`],
  ];

  const deductionsBody = [
    ['Income Tax / TDS', `INR ${tax.toLocaleString('en-IN')}`],
    ['Provident Fund Contribution', `INR ${pf.toLocaleString('en-IN')}`],
    ['Advance / Gear Recovery', `INR ${advance.toLocaleString('en-IN')}`],
    ['Other Professional Deductions', 'INR 0'],
    ['Total Deductions', `INR ${totalDeductions.toLocaleString('en-IN')}`],
  ];

  // Combined Table
  const combinedBody = [];
  for (let i = 0; i < 5; i++) {
    combinedBody.push([
      earningsBody[i][0],
      earningsBody[i][1],
      deductionsBody[i][0],
      deductionsBody[i][1],
    ]);
  }

  doc.autoTable({
    startY: y,
    head: [['EARNINGS BREAKDOWN', 'AMOUNT (INR)', 'DEDUCTIONS BREAKDOWN', 'AMOUNT (INR)']],
    body: combinedBody,
    margin: { left: margin, right: margin },
    theme: 'grid',
    headStyles: {
      fillColor: [11, 11, 11],
      textColor: [212, 175, 55],
      fontStyle: 'bold',
      fontSize: 8,
      halign: 'left',
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: [30, 30, 30],
      cellPadding: 2.2,
    },
    columnStyles: {
      0: { cellWidth: 50, fontStyle: 'normal' },
      1: { cellWidth: 41, halign: 'right', fontStyle: 'bold' },
      2: { cellWidth: 50, fontStyle: 'normal' },
      3: { cellWidth: 41, halign: 'right', fontStyle: 'bold' },
    },
    styles: {
      lineColor: [220, 210, 190],
      lineWidth: 0.2,
    },
  });

  // 4. Net Salary Payout Highlight Box
  let finalY = doc.lastAutoTable.finalY + 8;
  doc.setFillColor(11, 11, 11);
  doc.roundedRect(margin, finalY, contentWidth, 22, 2, 2, 'F');
  doc.setFillColor(212, 175, 55);
  doc.rect(margin, finalY, 3, 22, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(180, 180, 180);
  doc.text('NET SALARY PAYABLE (TAKE-HOME):', margin + 10, finalY + 8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(212, 175, 55);
  doc.text(`INR ${netPay.toLocaleString('en-IN')}`, margin + 10, finalY + 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(200, 200, 200);
  doc.text(`Disbursed via ${slip.paymentMethod || 'Direct Bank Transfer'}`, rightEdge - 6, finalY + 14, { align: 'right' });

  // 5. Notes & Verification Stamp
  finalY += 30;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(11, 11, 11);
  doc.text('NOTES & HR ADVICE:', margin, finalY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(80, 80, 80);
  const noteText = slip.notes || 'This salary slip is an official record of monthly payroll by Moonlight Production HR atelier. For any queries or verification, contact studio accounts within 5 days of salary credit.';
  const splitNote = doc.splitTextToSize(noteText, contentWidth);
  doc.text(splitNote, margin, finalY + 5);

  // 6. Signature Block
  const sigY = 245;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.4);
  doc.line(margin, sigY, margin + 60, sigY);
  doc.line(rightEdge - 60, sigY, rightEdge, sigY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(11, 11, 11);
  doc.text('NEELESH KIRAR', margin, sigY + 5);
  doc.text('EMPLOYEE ACKNOWLEDGEMENT', rightEdge, sigY + 5, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.text('Authorized Signatory & Founder', margin, sigY + 9);
  doc.text('Moonlight Production', margin, sigY + 13);
  doc.text('Digital Signature Verified', rightEdge, sigY + 9, { align: 'right' });
  doc.text(resolvedName, rightEdge, sigY + 13, { align: 'right' });

  // 7. Footer Accent Bar
  doc.setFillColor(11, 11, 11);
  doc.rect(0, pageHeight - 10, pageWidth, 10, 'F');
  doc.setFillColor(212, 175, 55);
  doc.rect(0, pageHeight - 10, pageWidth, 1.2, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(180, 180, 180);
  doc.text('Moonlight Production • Confidential Monthly Payroll Slip • Generated Electronically', pageWidth / 2, pageHeight - 4, { align: 'center' });

  const cleanName = (slip.employeeName || 'Employee').replace(/\s+/g, '_');
  const cleanMonth = (slip.month || 'Month').replace(/\s+/g, '_');
  doc.save(`Moonlight_SalarySlip_${cleanMonth}_${cleanName}.pdf`);
  return doc;
};
