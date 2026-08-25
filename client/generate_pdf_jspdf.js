import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import fs from 'fs';

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4',
});

// Color Palette
const OBSIDIAN = [11, 11, 12];
const GOLD = [212, 175, 55];
const LIGHT_GOLD = [245, 230, 171];
const WHITE = [255, 255, 255];
const GRAY = [203, 213, 225];
const DARK_GRAY = [24, 24, 32];

// ================= PAGE 1: COVER PAGE =================
// Full Background
doc.setFillColor(...OBSIDIAN);
doc.rect(0, 0, 210, 297, 'F');

// Golden Outer Frame
doc.setDrawColor(...GOLD);
doc.setLineWidth(1.2);
doc.roundedRect(12, 12, 186, 273, 4, 4, 'S');
doc.setLineWidth(0.3);
doc.roundedRect(14, 14, 182, 269, 3, 3, 'S');

// Brand Badge
doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(...GOLD);
doc.text('OFFICIAL PLATFORM ARCHITECTURE & SITEMAP MANUAL', 105, 50, { align: 'center' });

// Brand Title
doc.setFont('times', 'bold');
doc.setFontSize(28);
doc.setTextColor(...WHITE);
doc.text('MOONLIGHT PRODUCTION', 105, 75, { align: 'center' });

doc.setFont('times', 'italic');
doc.setFontSize(14);
doc.setTextColor(...LIGHT_GOLD);
doc.text('Your Story. Our Vision. Forever.', 105, 87, { align: 'center' });

// Line Separator
doc.setDrawColor(...GOLD);
doc.setLineWidth(0.8);
doc.line(65, 95, 145, 95);

// Description
doc.setFont('helvetica', 'normal');
doc.setFontSize(10);
doc.setTextColor(...GRAY);
doc.text(
  'Enterprise Luxury Indian Wedding Cinema, 4K Master Photography,\nReal-Time Auto-Updating CRM Pipeline & Studio Governance Architecture',
  105,
  108,
  { align: 'center', maxWidth: 150 }
);

// Metadata Box
doc.setFillColor(...DARK_GRAY);
doc.setDrawColor(...GOLD);
doc.setLineWidth(0.5);
doc.roundedRect(25, 135, 160, 95, 4, 4, 'FD');

doc.setFontSize(10);
const metaDetails = [
  ['System Release:', 'Version 2.0.0 (Dark Luxury Obsidian Edition)'],
  ['Brand Entity:', 'Moonlight Production (Moonlight Productions & Films)'],
  ['Live Web App:', 'https://moonlight-pink-two.vercel.app'],
  ['GitHub Repository:', 'https://github.com/neeleshkirar1812-max/moonlight.git'],
  ['WhatsApp Hotline:', '+91 92292 29323'],
  ['Instagram & YouTube:', '@moonlight_production__ | @moonlightproductions_films'],
  ['Heritage Circuits:', 'Maheshwar Ghats, Bhopal, Udaipur, Goa, Mumbai'],
  ['Security Policy:', 'Super Admin Clearance & Master Password Control'],
];

let metaY = 148;
metaDetails.forEach(([k, v]) => {
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...GOLD);
  doc.text(k, 32, metaY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...WHITE);
  doc.text(v, 75, metaY);
  metaY += 10;
});

// Footer
doc.setFont('courier', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(148, 163, 184);
doc.text('CONFIDENTIAL & PROPRIETARY • MOONLIGHT PRODUCTION & FILMS © 2026', 105, 270, { align: 'center' });

// ================= PAGE 2: SYSTEM ARCHITECTURE & BRAND =================
doc.addPage();
doc.setFillColor(...OBSIDIAN);
doc.rect(0, 0, 210, 297, 'F');

// Header Bar
doc.setFont('helvetica', 'bold');
doc.setFontSize(8);
doc.setTextColor(...GOLD);
doc.text('MOONLIGHT PRODUCTION PLATFORM MANUAL', 15, 16);
doc.setTextColor(...GRAY);
doc.text('SECTION 1: SYSTEM ARCHITECTURE & BRAND', 195, 16, { align: 'right' });
doc.setDrawColor(50, 50, 60);
doc.line(15, 19, 195, 19);

// Section Title
doc.setFont('times', 'bold');
doc.setFontSize(18);
doc.setTextColor(...LIGHT_GOLD);
doc.text('1. Executive Summary & Architecture', 15, 30);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(...GRAY);
doc.text(
  'Moonlight Production is an enterprise-grade luxury wedding cinema and photography studio platform catering to high-net-worth couples and royal destination weddings across Central and Western India.',
  15,
  38,
  { maxWidth: 180 }
);

// Tech Stack Table
doc.autoTable({
  startY: 48,
  head: [['Platform Layer', 'Technology Stack', 'Key Capabilities & Functionality']],
  body: [
    ['Frontend Core', 'React 18, React Router v6, Vite 5', 'High-performance Single Page Application with instant client routing.'],
    ['Design Engine', 'Tailwind CSS, Glassmorphism', 'Dark Luxury Obsidian (#0B0B0C) with pure white text and gold accents.'],
    ['Security Engine', 'Resilient Mock & Cloud Layer', '100% 405/404 fail-safe API engine with persistent localStorage cache.'],
    ['Payment Gateway', 'Razorpay Checkout SDK', 'Direct UPI, Netbanking, Debit/Credit cards and automated tax receipting.'],
    ['Auto-Sync CRM', 'Google Sheets Webhook Engine', 'Real-time automatic cloud spreadsheet row insertion (0 manual downloads).'],
    ['Hosting & CI/CD', 'Vercel Global CDN + GitHub', 'Automatic zero-downtime deployments on git push.'],
  ],
  theme: 'grid',
  headStyles: { fillColor: [24, 24, 32], textColor: GOLD, font: 'times', fontStyle: 'bold', fontSize: 9.5 },
  bodyStyles: { fillColor: [18, 18, 22], textColor: WHITE, fontSize: 8.5, font: 'helvetica' },
  alternateRowStyles: { fillColor: [14, 14, 18] },
  styles: { lineColor: [50, 50, 60], lineWidth: 0.2 },
  margin: { left: 15, right: 15 },
});

// Architecture Flow Box
const archY = doc.lastAutoTable.finalY + 10;
doc.setFont('times', 'bold');
doc.setFontSize(14);
doc.setTextColor(...LIGHT_GOLD);
doc.text('System Dataflow Architecture', 15, archY);

doc.setFillColor(...DARK_GRAY);
doc.setDrawColor(...GOLD);
doc.setLineWidth(0.4);
doc.roundedRect(15, archY + 4, 180, 48, 3, 3, 'FD');

doc.setFont('courier', 'bold');
doc.setFontSize(8);
doc.setTextColor(56, 189, 248);
const diagramText = `
[Clients / Couples] ──► [Vercel Global CDN Edge] ──► [React 18 SPA (Dark Luxury)]
                                                              │
                          ┌───────────────────────────────────┼───────────────────────────────────┐
                          ▼                                   ▼                                   ▼
              [Resilient Storage Engine]           [Razorpay Payment SDK]          [Google Sheets Webhook Sync]
              (0 Console 405 Errors)               (UPI / Netbanking)              (Live Real-Time Lead Rows)`;
doc.text(diagramText, 18, archY + 12);

// ================= PAGE 3: SECURITY & ROLE GOVERNANCE =================
doc.addPage();
doc.setFillColor(...OBSIDIAN);
doc.rect(0, 0, 210, 297, 'F');

doc.setFont('helvetica', 'bold');
doc.setFontSize(8);
doc.setTextColor(...GOLD);
doc.text('MOONLIGHT PRODUCTION PLATFORM MANUAL', 15, 16);
doc.setTextColor(...GRAY);
doc.text('SECTION 2: ROLE GOVERNANCE & APPROVALS', 195, 16, { align: 'right' });
doc.setDrawColor(50, 50, 60);
doc.line(15, 19, 195, 19);

doc.setFont('times', 'bold');
doc.setFontSize(18);
doc.setTextColor(...LIGHT_GOLD);
doc.text('2. Security Governance & Role Hierarchy', 15, 30);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(...GRAY);
doc.text(
  'To maintain privacy and studio integrity, unauthorized self-registration is closed. All accounts require clearance from the Super Admin Director.',
  15,
  38,
  { maxWidth: 180 }
);

doc.autoTable({
  startY: 46,
  head: [['Role Type', 'Creation Authority', 'Login Activation', 'Password Control Rights', 'Portal Route']],
  body: [
    ['👑 Super Admin', 'Supreme System Genesis', 'Instant / Supreme', 'Master Password Override for ALL Users', '/super-admin/*'],
    ['👩‍💼 Studio Admin / HR', 'Super Admin ONLY', 'Super Admin Approval', 'Self via Email OTP or Super Admin Ticket', '/admin/*'],
    ['📸 Production Crew', 'HR Submits Request', 'Super Admin Clearance', 'Self via Email OTP or Super Admin Ticket', '/employee/*'],
    ['👰 Couple / Client', 'Self Access Request', 'Super Admin Clearance', 'Self via Email OTP or Super Admin Ticket', '/customer/*'],
  ],
  theme: 'grid',
  headStyles: { fillColor: [24, 24, 32], textColor: GOLD, font: 'times', fontStyle: 'bold', fontSize: 9 },
  bodyStyles: { fillColor: [18, 18, 22], textColor: WHITE, fontSize: 8.5, font: 'helvetica' },
  alternateRowStyles: { fillColor: [14, 14, 18] },
  styles: { lineColor: [50, 50, 60], lineWidth: 0.2 },
  margin: { left: 15, right: 15 },
});

const passY = doc.lastAutoTable.finalY + 10;
doc.setFont('times', 'bold');
doc.setFontSize(14);
doc.setTextColor(...LIGHT_GOLD);
doc.text('Password Recovery Architecture', 15, passY);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(...GRAY);
const passRules = [
  '• Method A (6-Digit Email OTP Verification): User enters email -> Secure 6-digit OTP is dispatched -> Live 60s countdown timer -> User verifies code and sets new password.',
  '• Method B (Emergency Super Admin Ticket): If email is lost, user clicks "Request Super Admin Reset". The ticket appears in Super Admin Approvals where Super Admin resets credentials in 1 click.',
  '• Master User Password Directory: Super Admin can search ANY user (Client, HR, Photographer) and override their password directly or 1-click generate a strong random password.',
];
let prY = passY + 7;
passRules.forEach((r) => {
  doc.text(r, 15, prY, { maxWidth: 180 });
  prY += 9;
});

// Standard Credentials Table
const credY = prY + 5;
doc.setFont('times', 'bold');
doc.setFontSize(14);
doc.setTextColor(...LIGHT_GOLD);
doc.text('Default Evaluation Credentials', 15, credY);

doc.autoTable({
  startY: credY + 4,
  head: [['Role Account', 'Login Email Address', 'Default Password', 'Access Level']],
  body: [
    ['Super Admin Director', 'superadmin@moonlightproduction.com', 'SuperAdmin@2026', 'Supreme System Command & Approvals'],
    ['Studio Admin / HR', 'admin@moonlightproduction.com', 'Admin@2026', 'Studio Operations, Leads CRM & Crew'],
    ['Lead Cinematographer', 'lead.photographer@moonlightproduction.com', 'Employee@2026', 'Field Schedules, Camera Gear & Briefs'],
    ['Couple Sanctuary', 'aarav.ananya@gmail.com', 'Customer@2026', 'Private 4K High-Res Galleries & Receipts'],
  ],
  theme: 'grid',
  headStyles: { fillColor: [24, 24, 32], textColor: GOLD, font: 'times', fontStyle: 'bold', fontSize: 9 },
  bodyStyles: { fillColor: [18, 18, 22], textColor: WHITE, fontSize: 8.5, font: 'helvetica' },
  alternateRowStyles: { fillColor: [14, 14, 18] },
  styles: { lineColor: [50, 50, 60], lineWidth: 0.2 },
  margin: { left: 15, right: 15 },
});

// ================= PAGE 4: SITEMAP & CRM PIPELINE =================
doc.addPage();
doc.setFillColor(...OBSIDIAN);
doc.rect(0, 0, 210, 297, 'F');

doc.setFont('helvetica', 'bold');
doc.setFontSize(8);
doc.setTextColor(...GOLD);
doc.text('MOONLIGHT PRODUCTION PLATFORM MANUAL', 15, 16);
doc.setTextColor(...GRAY);
doc.text('SECTION 3: SITEMAP & CRM PIPELINE', 195, 16, { align: 'right' });
doc.setDrawColor(50, 50, 60);
doc.line(15, 19, 195, 19);

doc.setFont('times', 'bold');
doc.setFontSize(18);
doc.setTextColor(...LIGHT_GOLD);
doc.text('3. Complete Platform Sitemap & CRM', 15, 30);

doc.autoTable({
  startY: 38,
  head: [['Portal Section', 'Route Endpoint', 'Features & Capabilities']],
  body: [
    ['Public Website', '/', '4K YouTube Cinema Reel, 8-Step Interactive Estimator, Press Bar'],
    ['Portfolio CMS', '/portfolio & /portfolio/:cat', 'Palace, Pre-Wedding, Heritage, Beachfront galleries with 4K Lightbox'],
    ['Services & Tiers', '/services', 'Imperial Heritage Suite, Sovereign Collection, Pre-Wedding Odyssey'],
    ['Editorial Journal', '/blog & /blog/:slug', 'Destination Wedding Planning Guides & Cinema Masterclasses'],
    ['Guild Careers', '/careers', 'Job Vacancies (Cinematographers, Drone Pilots, Editors) & Application Form'],
    ['Studio Contact', '/contact', 'VIP Concierge consultation booking form & WhatsApp hotline'],
    ['Unified Auth', '/login', '3-Way Role Switcher: Couple, Studio Admin, Field Crew'],
    ['Sanctuary Registration', '/register', 'Couples submit details -> Queued for Super Admin Authorization'],
    ['Password Recovery', '/forgot-password', '6-Digit Email OTP + Super Admin Emergency Reset Ticket'],
    ['Couple Sanctuary', '/customer/dashboard', 'Private 4K High-Res Galleries, Photo Favorites, Timeline & Invoices'],
    ['Live CRM Pipeline', '/admin/enquiries', '5-Stage Kanban Board, 15s Background Polling, Google Sheet Webhook'],
    ['Shoot Calendar', '/admin/bookings', 'Multi-day shoot schedules, venue logistics & crew allocation'],
    ['GST Invoices', '/admin/invoices', '18% GST calculation, printable tax invoices & payment links'],
    ['Razorpay Ledger', '/admin/payments', 'Real-time transaction history with UPI/Netbanking verification'],
    ['Super Admin Command', '/super-admin/approvals', '1-Click Approve Logins, Master User Password Directory & Reset Tickets'],
    ['Audit Surveillance', '/super-admin/audit-logs', 'Real-time surveillance of user logins and privileged data changes'],
  ],
  theme: 'grid',
  headStyles: { fillColor: [24, 24, 32], textColor: GOLD, font: 'times', fontStyle: 'bold', fontSize: 9 },
  bodyStyles: { fillColor: [18, 18, 22], textColor: WHITE, fontSize: 8, font: 'helvetica' },
  alternateRowStyles: { fillColor: [14, 14, 18] },
  styles: { lineColor: [50, 50, 60], lineWidth: 0.2 },
  margin: { left: 15, right: 15 },
});

// Output to Buffer
const pdfBytes = doc.output('arraybuffer');
const outputPath = 'C:\\Users\\neele\\.gemini\\antigravity\\brain\\79ac0855-831b-4aa7-b734-7ead100c99df\\Moonlight_Production_Master_Documentation.pdf';
const rootOutputPath = 'C:\\Users\\neele\\.gemini\\antigravity\\scratch\\luxury-wedding-platform\\Moonlight_Production_Master_Documentation.pdf';

fs.writeFileSync(outputPath, Buffer.from(pdfBytes));
fs.writeFileSync(rootOutputPath, Buffer.from(pdfBytes));
console.log('PDF Generated Successfully at:', outputPath);
