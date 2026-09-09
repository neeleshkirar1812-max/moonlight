import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * Generates an official, luxury branded Employment Offer Letter PDF for Moonlight Production.
 */
export const generateOfferLetterPDF = (candidate) => {
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

  // Gold Accent Top Bar
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
  doc.text('ROYAL WEDDING CINEMATOGRAPHY & PHOTOGRAPHY ATELIER', 32, 22);

  doc.setFontSize(7);
  doc.setTextColor(180, 180, 180);
  doc.text('Central Studio • Bhopal, Madhya Pradesh • Phone: +91 77489 06015', 32, 27);
  doc.text('Email: nkneeleshkirar@gmail.com • Instagram: @moonlight_production_bhopal', 32, 32);

  // Right Header Label (Aligned to 196mm)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(212, 175, 55);
  doc.text('LETTER OF APPOINTMENT', rightEdge, 14, { align: 'right' });

  const refCode = `MLP/HR/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(200, 200, 200);
  doc.text(`Ref: ${refCode}`, rightEdge, 20, { align: 'right' });
  doc.text(`Date: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`, rightEdge, 25, { align: 'right' });
  doc.text('Status: Confirmed Offer', rightEdge, 30, { align: 'right' });

  // 2. Candidate Salutation
  let y = 50;
  doc.setTextColor(20, 20, 20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('TO (SELECTED CANDIDATE):', margin, y);

  doc.setFont('times', 'bold');
  doc.setFontSize(11.5);
  doc.text(candidate.fullName || 'Selected Candidate', margin, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);
  doc.text(`Email: ${candidate.email || 'N/A'}`, margin, y + 11);
  doc.text(`Phone: ${candidate.phone || 'N/A'}`, margin, y + 16);

  // 3. Subject Line Card
  y = 72;
  doc.setFillColor(248, 246, 240);
  doc.roundedRect(margin, y, contentWidth, 9, 1.5, 1.5, 'F');
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentWidth, 9, 1.5, 1.5, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(11, 11, 11);
  const offeredRole = candidate.hiringDetails?.offeredRole || candidate.career?.title || 'Production Crew Specialist';
  doc.text(`SUBJECT: FORMAL OFFER OF EMPLOYMENT AS ${offeredRole.toUpperCase()}`, margin + 4, y + 6);

  // 4. Body Opening
  y = 88;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(40, 40, 40);
  const introText = `Dear ${candidate.fullName || 'Candidate'},\n\nWe are delighted to extend this formal offer of employment with Moonlight Production. Following our evaluation of your portfolio and technical experience, we were deeply impressed by your passion, framing discipline, and commitment to visual excellence. We look forward to welcoming you to our royal wedding production atelier.`;
  const splitIntro = doc.splitTextToSize(introText, contentWidth);
  doc.text(splitIntro, margin, y);

  // 5. Employment Terms Table
  y = 110;
  const joiningDateStr = candidate.hiringDetails?.joiningDate
    ? new Date(candidate.hiringDetails.joiningDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date(+new Date() + 7 * 24 * 3600 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const salaryNum = Number(candidate.hiringDetails?.offeredSalary) || 45000;

  const termsData = [
    ['Job Designation / Role', offeredRole],
    ['Department', candidate.career?.department || 'Production & Cinematography Crew'],
    ['Date of Joining', joiningDateStr],
    ['Primary Studio Location', 'Moonlight Production Studio, Bhopal & On-Location Destination Shoots'],
    ['Monthly Compensation (Gross)', `INR ${salaryNum.toLocaleString('en-IN')} per month`],
    ['Annual CTC Equivalent', `INR ${(salaryNum * 12).toLocaleString('en-IN')} per annum + Shoot Allowances`],
    ['Probation Period', '3 Months from Date of Joining'],
    ['Notice Period', '30 Days written notice or pay in lieu thereof'],
  ];

  doc.autoTable({
    startY: y,
    head: [['TERM & CONDITION', 'AGREED SPECIFICS & POLICY']],
    body: termsData,
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
      0: { cellWidth: 65, fontStyle: 'bold' },
      1: { cellWidth: 117 },
    },
    styles: {
      lineColor: [220, 210, 190],
      lineWidth: 0.2,
    },
  });

  // 6. Professional Terms & Intellectual Property
  let finalY = doc.lastAutoTable.finalY + 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(11, 11, 11);
  doc.text('KEY EMPLOYMENT CLAUSES & POLICIES:', margin, finalY);

  finalY += 4.5;
  const policyText =
    '1. Intellectual Property & Master Media: All raw video recordings, audio multi-tracks, and high-resolution photographs captured on studio assignments remain the exclusive property of Moonlight Production.\n' +
    '2. Equipment Protocol: You will be entrusted with professional cinema gear, lenses, and lighting equipment. Paramount care and technical maintenance are mandatory.\n' +
    '3. Professional Conduct: Punctuality, sophisticated grooming, and discreet privacy regarding VIP clients and luxury weddings are strictly enforced.\n' +
    '4. Employee Portal: Upon joining, your official Employee Portal credentials will be active to manage shoot call-sheets and view monthly payroll slips.';

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(70, 70, 70);
  const splitPolicies = doc.splitTextToSize(policyText, contentWidth);
  doc.text(splitPolicies, margin, finalY);

  // 7. Signature Blocks
  const sigY = 248;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.4);
  doc.line(margin, sigY, margin + 60, sigY);
  doc.line(rightEdge - 60, sigY, rightEdge, sigY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(11, 11, 11);
  doc.text('NEELESH KIRAR', margin, sigY + 5);
  doc.text('CANDIDATE ACCEPTANCE', rightEdge, sigY + 5, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.text('Founder & Executive Director', margin, sigY + 9);
  doc.text('Moonlight Production', margin, sigY + 13);

  doc.text('Signature & Date:', rightEdge, sigY + 9, { align: 'right' });
  doc.text(`I, ${candidate.fullName || 'Candidate'}, accept this offer.`, rightEdge, sigY + 13, { align: 'right' });

  // 8. Footer Accent Bar
  doc.setFillColor(11, 11, 11);
  doc.rect(0, pageHeight - 10, pageWidth, 10, 'F');
  doc.setFillColor(212, 175, 55);
  doc.rect(0, pageHeight - 10, pageWidth, 1.2, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(180, 180, 180);
  doc.text('Moonlight Production • Confidential Employment Agreement • All Rights Reserved', pageWidth / 2, pageHeight - 4, { align: 'center' });

  // Trigger browser download
  const cleanName = (candidate.fullName || 'Candidate').replace(/\s+/g, '_');
  doc.save(`Moonlight_Offer_Letter_${cleanName}.pdf`);
  return doc;
};
