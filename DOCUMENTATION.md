# 🌕 Moonlight Production — Comprehensive Platform Master Documentation

> **Luxury Indian Wedding Photography, 4K Master Cinema & Studio Management Platform**  
> **Brand**: Moonlight Production (`Moonlight Productions & Films`)  
> **Aesthetic Theme**: Dark Luxury Obsidian (`#0B0B0C` base, `#121215` frosted glass, `#D4AF37` gold accents)  
> **Live Web Application**: [https://moonlight-pink-two.vercel.app](https://moonlight-pink-two.vercel.app)  
> **Official GitHub Repository**: [https://github.com/neeleshkirar1812-max/moonlight.git](https://github.com/neeleshkirar1812-max/moonlight.git)  

---

## 1. Executive Summary & Brand Identity

**Moonlight Production** is an enterprise-grade luxury wedding cinema and fine-art photography studio platform. The system caters to high-net-worth couples, royal palace destination weddings, and studio leadership across major heritage circuits in Central and Western India:

- **Key Destination Circuits**: *Maheshwar Ghats, Ahilya Fort, Jehan Numa Palace Bhopal, Udaipur Palace Circuits, Jaipur, Goa Beachfronts, Mumbai*.
- **Contact & Official Channels**:
  - **WhatsApp & Hotline**: `+91 92292 29323`
  - **Instagram**: `@moonlight_production__`
  - **YouTube**: `@moonlightproductions_films`
  - **Linktree Portfolio**: `https://linktr.ee/moonlight_photography_in`

---

## 2. Technical Architecture & Stack

```
[Clients & Visitors] ──► [Vercel Global Edge CDN] ──► [React 18 SPA + Tailwind CSS Dark Luxury]
                                                               │
                          ┌────────────────────────────────────┼────────────────────────────────────┐
                          ▼                                    ▼                                    ▼
              [Resilient Storage Engine]            [Razorpay Payment SDK]           [Google Sheets Webhook Sync]
```

### Core Technologies:
- **Frontend Core**: React 18, React Router v6, Vite 5.
- **Styling & UI**: Tailwind CSS, Custom Glassmorphism (`backdrop-blur-2xl`), Custom Dark Scrollbars, Shimmer Button Animations.
- **Icons & Visuals**: Lucide React (`Camera`, `Crown`, `ShieldCheck`, `KeyRound`, `Kanban`, `Sparkles`).
- **Data Export & Sync**: SheetJS (`xlsx`), Google Apps Script Webhooks.
- **Resilience Engine**: Built-in 405/404 fail-safe client router that eliminates all static hosting errors.

---

## 3. Complete Role & Security Governance Hierarchy

### Governance Rules Matrix:

| Role | Creation Authority | Login Activation | Password Reset Rights | Dashboard Route |
| :--- | :--- | :--- | :--- | :--- |
| **Super Admin** | System Genesis | Instant / Supreme | Master Override for ALL Users | `/super-admin/dashboard` |
| **Studio Admin / HR** | Super Admin ONLY | Super Admin Approval | Self via Email OTP / Super Admin | `/admin/dashboard` |
| **Production Crew** | HR Submits Request | Super Admin Approval | Self via Email OTP / Super Admin | `/employee/dashboard` |
| **Client / Couple** | Online Request | Super Admin Approval | Self via Email OTP / Super Admin | `/customer/dashboard` |

---

## 4. Full Sitemap & Feature Directory

### A. Public Website (`/`)
1. **Homepage (`/`)**:
   - 4K YouTube Cinema Showcase & Floating Video Modals.
   - Portfolio Mosaic (Palace, Pre-Wedding, Beachfront, Heritage).
   - 8-Step Interactive Budget & Timeline Estimator.
   - Real-Time Press & Editorial Feature Bar.
2. **Portfolio Directory (`/portfolio` & `/portfolio/:category`)**:
   - Filterable categories: *Palace Weddings, Pre-Wedding Cinema, Heritage Destination, Beach Weddings*.
   - High-resolution lightbox and 4K video reel players.
3. **Services & Investment (`/services`)**:
   - Tiered packages: *The Imperial Heritage Suite, The Royal Sovereign Collection, Cinematic Pre-Wedding Odyssey*.
   - Inclusions accordion and deliverables breakdown.
4. **Studio Legacy & Master Directors (`/about`)**:
   - Studio heritage story, equipment arsenal (RED/Sony FX Cine, Hasselblad, DJI Drones).
5. **Editorial Journal (`/blog` & `/blog/:slug`)**:
   - Destination wedding planning guides and masterclass cinema breakdowns.
6. **Guild of Masters Careers (`/careers`)**:
   - Openings for Cinematographers, Drone Masters, and DaVinci Colorists with direct application modal.
7. **Private Concierge & Contact (`/contact`)**:
   - VIP consultation request form, WhatsApp hotline, and interactive map.

---

### B. Authentication & Security Engine
1. **Unified 3-Tab Login Portal (`/login`)**:
   - **Couple Sanctuary Tab** (Bride & Groom private gallery access).
   - **Studio Admin Tab** (Studio leadership and operations access).
   - **Production Crew Tab** (Photographers and field directors).
   - Password Show/Hide toggle, 1-Click test pills for instant evaluation.
2. **Regulated Access Registration (`/register`)**:
   - Couples submit their wedding dates and details.
   - Enforces **Super Admin Verification Queue** (no unauthorized self-activation).
3. **2-Way Password Recovery Portal (`/forgot-password`)**:
   - **Option 1**: 6-Digit Email OTP verification with 60-second live resend countdown timer.
   - **Option 2**: Emergency Password Reset Ticket dispatched directly to Super Admin Control Center.

---

### C. Client Couple Sanctuary (`/customer/*`)
1. **Client Dashboard (`/customer/dashboard`)**:
   - Private 4K High-Res Galleries.
   - Photo Selection & Favoriting engine for physical album printing.
   - Production Timeline & Cinema Delivery Milestones.
   - Official GST Invoices and Razorpay Payment Receipts.

---

### D. HR & Studio Admin Console (`/admin/*`)
1. **KPI Analytics Dashboard (`/admin/dashboard`)**:
   - Revenue summaries, advance retainers collected, confirmed shoot metrics.
2. **Real-Time Auto-Updating Enquiries Pipeline (`/admin/enquiries`)**:
   - **5-Stage Live Kanban Board**: `📥 New Inquiries` ➔ `📞 Contacted / Discussion` ➔ `📄 Quotation Sent` ➔ `👑 Confirmed Shoots` ➔ `✨ Completed & Delivered`.
   - **Google Sheets Webhook Live Connector**: Zero manual Excel downloads; automatic row insertion into Google Drive spreadsheet.
   - **1-Click WhatsApp Quick Pitch**: Sends customized royal proposal directly to client's phone number.
3. **Bookings & Shoot Calendar (`/admin/bookings`)**:
   - Multi-day shoot schedules, venue logistics, crew allocation.
4. **Client GST Invoices (`/admin/invoices`)**:
   - 18% GST calculation, printable tax invoices, payment links.
5. **Razorpay Transactions Ledger (`/admin/payments`)**:
   - Real-time transaction history with UPI/Netbanking verification.
6. **Portfolio CMS (`/admin/portfolio`)**:
   - Add/edit/delete high-res imagery, destination tags, and featured flags.
7. **Private Client Galleries Manager (`/admin/galleries`)**:
   - Generate PIN-protected galleries for couples.
8. **Wedding Cinema Embeds (`/admin/videos`)**:
   - YouTube 4K teaser and feature film management.
9. **Production Crew Operations (`/admin/employees`)**:
   - HR creates crew profiles which are automatically queued for Super Admin approval.

---

### E. Super Admin Governance Control Center (`/super-admin/*`)
1. **Super Admin Dashboard (`/super-admin/dashboard`)**:
   - System surveillance, security health, database schemas, and privileged logs.
2. **Approvals & Master Password Control (`/super-admin/approvals`)**:
   - **Tab 1 (Pending Logins)**: 1-Click `[ ✅ Approve & Activate ]` or `[ ❌ Reject ]` for HR-created crew and registered couples.
   - **Tab 2 (Master User Password Directory)**: Search any user and click `[ 🔑 Change Pass ]` with random strong password generator.
   - **Tab 3 (Password Reset Tickets)**: Instant resolution of client/crew forgotten credential tickets.
3. **Admin Account Provisioning (`/super-admin/admins`)**:
   - Create and manage HR and Studio Admin accounts.
4. **Immutable Audit Logs (`/super-admin/audit-logs`)**:
   - Real-time surveillance of user logins, master password modifications, and record deletions.
5. **Server & Cloud Configuration (`/super-admin/config`)**:
   - SMTP Email dispatchers, Razorpay API credentials, and AWS S3 cloud parameters.

---

## 5. Standard Test Credentials

| Role | Account Email | Default Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `superadmin@moonlightproduction.com` | `SuperAdmin@2026` | Full Supreme Access |
| **Studio Admin / HR** | `admin@moonlightproduction.com` | `Admin@2026` | Studio & HR Operations |
| **Lead Cinematographer** | `lead.photographer@moonlightproduction.com` | `Employee@2026` | Assigned Shoots & Crew Portal |
| **Bride & Groom (Client)** | `aarav.ananya@gmail.com` | `Customer@2026` | Private Client Sanctuary |

---

## 6. Maintenance & Deployment Guide

### To Deploy Updates to GitHub & Vercel:
```powershell
$env:PATH = "C:\Users\neele\.gemini\antigravity\scratch\MinGit\cmd;$env:PATH"
git add .
git commit -m "docs: add complete platform master documentation"
git push -u origin main
```
