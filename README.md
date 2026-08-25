# Lumière Studios — Luxury Full-Stack Wedding Photography & Media Business Platform

> **An Haute Couture, Production-Ready Digital Atelier for World-Class Wedding Media, Cinematic Heirlooms, Client Proofing, and Enterprise Production Management.**

Built with **MERN Stack** (MongoDB, Express.js, React.js, Node.js), **Tailwind CSS**, **Framer Motion**, **React Native / Expo**, **Cloudinary CDN**, **Razorpay Gateway**, **EmailJS**, and **WhatsApp Business API**.

---

## 🌟 Executive System Highlights

1. **Luxury Public Website & Brand Identity**:
   - Editorial Aesthetic with Royal Obsidian (`#0B0B0B`), Imperial Gold (`#D4AF37`), and Champagne (`#F5E6BE`).
   - Cinematic Hero with video & photography showcases, curated portfolios, and full-screen lightbox zoom.
   - 4 Dedicated Category Portfolio pages (`/portfolio/wedding`, `/portfolio/pre-wedding`, `/portfolio/destination-wedding`, `/portfolio/films`).
   - Services with transparent pricing tiers, Master Creative Directors showcase, and Editorial Journal (`/blog`).
   - Careers portal with live vacancy listings and interactive portfolio application modal.
   - Contact atelier page with Google Maps embed, telephone concierge, and direct messaging.

2. **8-Step Interactive Wedding Planner Wizard (`/enquiry`)**:
   - Live visual progress bar with instant step-by-step navigation.
   - Event Category picker, Date selector, Global Location selector, Dynamic Guest Count slider.
   - Multi-select Service bundle, Budget tier selector, Story & Vision narrative composer.
   - Automatic unique ID generation (`ENQ-2026-XXXXX`) and instant WhatsApp chat routing.

3. **Private Customer Sanctuary & Proofing Portal (`/customer`)**:
   - Wedding Countdown clock and Active Booking status overview.
   - **PIN-Protected Private High-Resolution Galleries**: Section tabs (Highlights, Ceremony, Portraits, Reception), favorite photo curation for physical album printing, and full-res download.
   - **Razorpay Live Payment Gateway**: Advance payments, remaining balance settlements, and payment transaction logs.
   - **Automated GST Invoices**: Client-side signed PDF invoice generator and download via `jsPDF`.
   - Private Wedding Cinema Films & Teaser streaming player.
   - Real-time Notifications and Profile/Password security manager.

4. **Production Crew Portal (`/employee`)**:
   - Upcoming shoot schedule and venue location briefs.
   - Interactive Shot Itinerary checklist and post-production deliverable progress updater.
   - Shoot Day Gear Checklist & task board.

5. **Executive Admin Dashboard (`/admin`)**:
   - Real-time KPI Analytics: Revenue captured, confirmed bookings, active enquiries, client counts, and quarterly performance chart.
   - **Enquiry Pipeline & Quotation Engine**: Search, filter, internal notes history, formal quotation sender with 25% advance auto-calc, and **1-Click Convert to Confirmed Booking**.
   - **Bookings & Crew Scheduling**: Assign lead photographers and cinematographers to specific dates.
   - **Cloudinary Portfolio CMS**: Upload media directly to Cloudinary CDN, manage tags, categories, and featured flags.
   - **Private Gallery Provisioner**: Create PIN-protected client albums and batch upload high-res photos.
   - Services, Editorial Blogs, YouTube Wedding Films, Job Openings, Applicant Resumes, and Testimonial CMS.
   - Brand & Global Studio Settings manager.

6. **Super Admin Control Center (`/super-admin`)**:
   - Admin account provisioning with granular permission flags.
   - Real-time Immutable Security Audit Logs (actions, resource targets, IP addresses).
   - System runtime diagnostics, environment status, and integration health checks.

7. **React Native / Expo Mobile Application (`mobile/`)**:
   - Native showcase with category switcher, fullscreen image zoom, and client PIN gallery unlocker.
   - Complete mobile role switcher for Customer, Employee, and Admin.

---

## 🚀 Quick Start Guide

### 1. Database Seeding & Backend Server
```bash
cd server
npm install
node seed/seed.js
npm run dev
```
*Backend runs on `http://localhost:5000` with pre-seeded demo accounts.*

### 2. Frontend Luxury Web Client
```bash
cd client
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`.*

### 3. Mobile App (Expo)
```bash
cd mobile
npm install
npx expo start
```

---

## 🔑 Demo Test Accounts (1-Click Switchers Available on Login Page)

| Role | Email | Password | Access Capabilities |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `superadmin@lumierestudios.com` | `SuperAdmin@2026` | Full system control, admin provisioning, audit logs |
| **Studio Admin** | `admin@lumierestudios.com` | `Admin@2026` | Enquiries pipeline, quotes, bookings, CMS, Razorpay ledger |
| **Production Crew** | `lead.photographer@lumierestudios.com` | `Employee@2026` | Assigned shoots, shot checklist, deliverables updater |
| **Couple Client** | `aarav.ananya@gmail.com` | `Customer@2026` | Private galleries (PIN: `2026`), bookings, Razorpay, PDF invoices |

---

## 🛡️ Architecture & Security
- **Role-Based Access Control (RBAC)**: Strict server-side route protection.
- **Ownership Scoping**: Customer A can never view Customer B's private galleries or invoices.
- **HMAC-SHA256 Razorpay Verification**: Cryptographically verified webhook and payment signatures.
- **Multer Memory Buffer**: Direct memory-to-Cloudinary streaming without temporary disk storage.
- **Security Middlewares**: Helmet HTTP security headers, CORS origin whitelisting, Express Rate Limiter, and centralized error logging.
