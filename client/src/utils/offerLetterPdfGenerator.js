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

  // Right Header Label
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(212, 175, 55);
  doc.text('LETTER OF APPOINTMENT', 145, 14);

  const refCode = `MLP/HR/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(200, 200, 200);
  doc.text(`Ref: ${refCode}`, 145, 19);
  doc.text(`Date: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`, 145, 24);
  doc.text('Status: Confirmed Offer', 145, 29);

  // 2. Candidate Salutation
  let y = 52;
  doc.setTextColor(20, 20, 20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('TO:', 14, y);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(candidate.fullName || 'Selected Candidate', 14, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(80, 80, 80);
  doc.text(`Email: ${candidate.email || 'N/A'}`, 14, y + 10);
  doc.text(`Phone: ${candidate.phone || 'N/A'}`, 14, y + 15);

  // 3. Subject Line
  y = 78;
  doc.setFillColor(248, 246, 240);
  doc.roundedRect(14, y, pageWidth - 28, 9, 1.5, 1.5, 'F');
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.3);
  doc.roundedRect(14, y, pageWidth - 28, 9, 1.5, 1.5, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(11, 11, 11);
  const offeredRole = candidate.hiringDetails?.offeredRole || candidate.career?.title || 'Production Crew Specialist';
  doc.text(`SUBJECT: OFFER OF APPOINTMENT AS ${offeredRole.toUpperCase()}`, 18, y + 6);

  // 4. Body Opening
  y = 96;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(40, 40, 40);
  const introText = `Dear ${candidate.fullName || 'Candidate'},\n\nWe are delighted to extend this formal offer of employment with Moonlight Production. Following our interview and portfolio review process, we were deeply impressed by your passion, technical framing expertise, and dedication to cinematic excellence. We believe you will make an exceptional contribution to our royal wedding production crew.`;
  const splitIntro = doc.splitTextToSize(introText, pageWidth - 28);
  doc.text(splitIntro, 14, y);

  // 5. Employment Terms Table
  y = 122;
  const joiningDateStr = candidate.hiringDetails?.joiningDate
    ? new Date(candidate.hiringDetails.joiningDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date(+new Date() + 7 * 24 * 3600 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const salaryNum = Number(candidate.hiringDetails?.offeredSalary) || 45000;

  const termsData = [
    ['Job Designation / Role', offeredRole],
    ['Department', candidate.career?.department || 'Production & Cinematography Crew'],
    ['Date of Joining', joiningDateStr],
    ['Primary Studio Location', 'Moonlight Production Studio, Bhopal & On-Location Destination Shoots'],
    ['Monthly Compensation (Gross)', `₹${salaryNum.toLocaleString('en-IN')} per month`],
    ['Annual CTC Equivalent', `₹${(salaryNum * 12).toLocaleString('en-IN')} per annum + Shoot Allowances`],
    ['Probation Period', '3 Months from Date of Joining'],
    ['Notice Period', '30 Days written notice or pay in lieu thereof'],
  ];

  doc.autoTable({
    startY: y,
    head: [['Term & Condition', 'Agreed Specifics']],
    body: termsData,
    margin: { left: 14, right: 14 },
    theme: 'grid',
    headStyles: {
      fillColor: [11, 11, 11],
      textColor: [212, 175, 55],
      fontStyle: 'bold',
      fontSize: 8.5,
      halign: 'left',
    },
    bodyStyles: {
      fontSize: 8,
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
  let finalY = doc.lastAutoTable.finalY + 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(11, 11, 11);
  doc.text('KEY EMPLOYMENT CLAUSES & POLICIES:', 14, finalY);

  finalY += 5;
  const policyText =
    '1. Intellectual Property & Footage Rights: All raw video footage, audio multi-tracks, and high-resolution master photographs captured during Moonlight Production assignments remain the exclusive property of Moonlight Production.\n' +
    '2. Equipment Care: You will be entrusted with professional camera, lens, and lighting equipment. You are expected to operate and maintain gear with paramount diligence.\n' +
    '3. Professional Conduct: As an ambassador of our studio, punctuality, high-end grooming, and discreet discretion with VIP clients and celebrity weddings are mandatory.\n' +
    '4. Portal Access: Upon acceptance, your official Employee Portal credentials will be active to manage shoot itineraries and download salary slips.';

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(70, 70, 70);
  const splitPolicies = doc.splitTextToSize(policyText, pageWidth - 28);
  doc.text(splitPolicies, 14, finalY);

  // 7. Signature Blocks
  const sigY = 248;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.4);
  doc.line(14, sigY, 75, sigY);
  doc.line(135, sigY, 196, sigY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(11, 11, 11);
  doc.text('NEELESH KIRAR', 14, sigY + 5);
  doc.text('CANDIDATE ACCEPTANCE', 135, sigY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 100, 100);
  doc.text('Founder & Executive Director', 14, sigY + 9);
  doc.text('Moonlight Production', 14, sigY + 13);

  doc.text('Signature & Date:', 135, sigY + 9);
  doc.text(`I, ${candidate.fullName || 'the candidate'}, accept this offer.`, 135, sigY + 13);

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
