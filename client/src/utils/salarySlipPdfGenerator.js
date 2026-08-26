import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

  // 1. Top Obsidian Luxury Banner
  doc.setFillColor(11, 11, 11);
  doc.rect(0, 0, pageWidth, 40, 'F');

  // Gold Accent Line
  doc.setFillColor(212, 175, 55);
  doc.rect(0, 0, pageWidth, 3, 'F');

  // Studio Monogram Circle
  doc.setFillColor(20, 20, 20);
  doc.circle(18, 20, 9, 'F');
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.6);
  doc.circle(18, 20, 9, 'D');

  doc.setTextColor(212, 175, 55);
  doc.setFont('times', 'bold');
  doc.setFontSize(15);
  doc.text('M', 15, 24);

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

  // Right Side Header Metadata
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(212, 175, 55);
  doc.text('SALARY PAY SLIP', 150, 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(200, 200, 200);
  doc.text(`Slip No: ${slip.slipNumber || 'SLIP-MLP-001'}`, 150, 19);
  doc.text(`Month: ${slip.month || 'Current Month'}`, 150, 24);

  const statusText = (slip.paymentStatus || 'Pending').toUpperCase();
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(statusText === 'PAID' ? 46 : 212, statusText === 'PAID' ? 204 : 175, statusText === 'PAID' ? 113 : 55);
  doc.text(`Status: ${statusText}`, 150, 29);

  // 2. Employee Details Card
  let y = 48;
  doc.setFillColor(248, 246, 240);
  doc.roundedRect(14, y, pageWidth - 28, 28, 2, 2, 'F');
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.3);
  doc.roundedRect(14, y, pageWidth - 28, 28, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(11, 11, 11);
  doc.text('EMPLOYEE DETAILS', 18, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(50, 50, 50);

  // Column 1 - Employee Credentials
  const resolvedName =
    slip.employeeName ||
    slip.user?.name ||
    slip.employee?.name ||
    slip.employee?.user?.name ||
    slip.name ||
    'Production Crew Member';
  const resolvedCode = slip.employeeCode || slip.employee?.employeeCode || 'EMP-MLP-001';
  const resolvedDesig = slip.designation || slip.employee?.designation || 'Production Specialist';

  doc.text(`Employee Code: ${resolvedCode}`, 18, y + 13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(11, 11, 11);
  doc.text(`Employee Name: ${resolvedName}`, 18, y + 19);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  doc.text(`Designation: ${resolvedDesig}`, 18, y + 25);

  // Column 2
  doc.text(`Payment Mode: ${slip.paymentMethod || 'BANK_TRANSFER'}`, 110, y + 13);
  doc.text(`Transaction ID: ${slip.transactionId || 'Pending Clearance'}`, 110, y + 19);
  doc.text(`Payment Date: ${slip.paymentDate ? new Date(slip.paymentDate).toLocaleDateString('en-IN') : 'End of Month'}`, 110, y + 25);

  // 3. Earnings & Deductions Breakdown Tables
  y = 84;

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
    ['Basic Salary', `₹${basicPay.toLocaleString('en-IN')}`],
    ['House Rent Allowance (HRA)', `₹${hra.toLocaleString('en-IN')}`],
    ['Royal Shoot Performance Bonus', `₹${bonus.toLocaleString('en-IN')}`],
    ['Location & Travel Reimbursement', `₹${travel.toLocaleString('en-IN')}`],
    ['Total Earnings (Gross Pay)', `₹${grossPay.toLocaleString('en-IN')}`],
  ];

  const deductionsBody = [
    ['Income Tax / TDS', `₹${tax.toLocaleString('en-IN')}`],
    ['Provident Fund Contribution', `₹${pf.toLocaleString('en-IN')}`],
    ['Advance / Gear Recovery', `₹${advance.toLocaleString('en-IN')}`],
    ['Other Professional Deductions', '₹0'],
    ['Total Deductions', `₹${totalDeductions.toLocaleString('en-IN')}`],
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
    head: [['EARNINGS', 'AMOUNT (INR)', 'DEDUCTIONS', 'AMOUNT (INR)']],
    body: combinedBody,
    margin: { left: 14, right: 14 },
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
  doc.roundedRect(14, finalY, pageWidth - 28, 22, 2, 2, 'F');
  doc.setFillColor(212, 175, 55);
  doc.rect(14, finalY, 3, 22, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(180, 180, 180);
  doc.text('NET SALARY PAYABLE (TAKE-HOME):', 24, finalY + 8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(212, 175, 55);
  doc.text(`₹${netPay.toLocaleString('en-IN')}`, 24, finalY + 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(200, 200, 200);
  doc.text(`Disbursed via ${slip.paymentMethod || 'Direct Bank Transfer'}`, 120, finalY + 14);

  // 5. Notes & Verification Stamp
  finalY += 32;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(11, 11, 11);
  doc.text('NOTES & ADVICE:', 14, finalY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(80, 80, 80);
  doc.text(
    slip.notes ||
      'This salary slip is an official record of monthly payroll by Moonlight Production. For any discrepancy, contact HR within 5 days.',
    14,
    finalY + 5
  );

  // 6. Signature Block
  const sigY = 245;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.4);
  doc.line(14, sigY, 70, sigY);
  doc.line(140, sigY, 196, sigY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(11, 11, 11);
  doc.text('NEELESH KIRAR', 14, sigY + 5);
  doc.text('EMPLOYEE ACKNOWLEDGEMENT', 140, sigY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.text('Authorized Signatory & Founder', 14, sigY + 9);
  doc.text('Moonlight Production', 14, sigY + 13);
  doc.text('Digital Signature / Employee Signature', 140, sigY + 9);

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
