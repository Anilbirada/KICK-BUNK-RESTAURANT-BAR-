# KICK BUNK 360 — System Requirements Specification (SRS)
## Enterprise Digital Platform & Mobile Ecosystem

**Client:** Kick Bunk Group  
**Development Partner:** RSR Technologies  
**Benchmark Reference:** Toast POS  
**Target Environments:** Web (Next.js 14), Mobile (React Native / Expo), Backend (Node.js Express TypeScript), Database (PostgreSQL 16)

---

## 1. Business Profile & Verified Discovery

### Reference 1: Kick Bunk Restaurant & Bar (Bengaluru Flagship)
- **Official Name:** Kick Bunk Restaurant and Bar (Kick Bunk Family Garden Restaurant / Resto Bar)
- **Address:** Hulimangala Main Road, near Vinayaka Layout / Yarandahalli, Jigani Hobli, Electronic City Phase 1, Bengaluru, Karnataka 560105
- **Google Maps Rating:** 4.1 / 5.0 (over 1,800+ verified customer reviews)
- **Primary Phone:** +91 82962 19302 / +91 99866 95881 / +91 89512 30666 / +91 99453 21367
- **Operating Hours:** 11:00 AM – 11:30 PM (All 7 days)
- **Key Amenities:** Open-air lush garden dining, private cabanas / gazebos, rooftop bar, live charcoal clay-oven tandoor, sports screening, valet parking, family dining hall.
- **Popular Cuisine:** Charcoal Kalmi Kebab, Tandoori Chicken, Pepper Chicken, Dragon Chicken, Royal Dum Biryani, Chinese appetizers, Paneer Malai Tikka, Mocktails & full bar.

### Reference 2: Kick Bunk Garden Bar & Restaurant (Tirupati Outlet)
- **Official Name:** Kick Bunk Garden Bar and Restaurant
- **Address:** Door No. 19-1-G/25, Kothapalli, Samavayi Margam, Chinthalachenu, Korramenugunta / Korlagunta (near Star Lite Suites), Tirupati, Andhra Pradesh 517501
- **Google Maps Rating:** 4.0 / 5.0 (over 150+ reviews)
- **Primary Phone:** +91 98855 20220 / +91 77605 94868
- **Operating Hours:** 11:30 AM – 11:00 PM (All 7 days)
- **Key Amenities:** Open-air garden dining, Asian & North Indian delicacies, lounge seating, full bar service.

---

## 2. Functional Requirements

### 2.1 Customer Web Application
- **FR-WEB-01 (Homepage):** Hero video/banner, quick outlet locator, chef signature dishes, amenities overview, verified Google rating badge, customer reviews carousel, promotional promo banner.
- **FR-WEB-02 (About & Brand Story):** Comprehensive history, garden dining concept, open-air cabanas, sports screenings, and hygiene standards.
- **FR-WEB-03 (Digital Menu & Ordering):** Interactive menu with category filtering, keyword search, pure veg toggle, portion variants (Regular/Large), customizable add-ons, spice levels, allergens, and preparation times.
- **FR-WEB-04 (Cart & GST Billing):** Line item controls, dining channel selector (`DINE_IN`, `TAKEAWAY`, `DELIVERY`), coupon code validation (`WELCOME100`), 5% GST computation (2.5% CGST + 2.5% SGST), and payment method selection (UPI, Card, Cash).
- **FR-WEB-05 (Table Reservations):** Outlet selection, date and time slot selection, guest counter, seating preference (Open Air Garden, Private Cabana, Family Hall, Lounge), and backend double-booking validation.
- **FR-WEB-06 (Gallery & Media):** Categorized media assets (Food, Ambience, Cabanas, Events) with lightbox image viewer and video playback.
- **FR-WEB-07 (Contact & Inquiries):** Click-to-call, WhatsApp direct link, embedded Google Map, directions button, and interactive contact form saving directly to `contact_inquiries` database table.

### 2.2 Mobile Application (React Native / Expo)
- **FR-MOB-01 (Cross-Platform):** Single unified codebase for Android and iOS using Expo SDK 51+ with TypeScript.
- **FR-MOB-02 (Shared Backend):** Connects to the same Node.js REST API endpoints as the website; zero duplicated or hardcoded data.
- **FR-MOB-03 (16 Core Screens):** Splash, Onboarding, Home, Business Info, Menu, Category, Product Details, Gallery, Video, Customer Reviews, Location & Maps, Contact, Profile, Settings, Favorites, and Notifications.
- **FR-MOB-04 (Native Capabilities):** Offline-friendly storage, pull-to-refresh, share sheet, click-to-call, map intent opening, and Android back button handling.

### 2.3 Restaurant Counter POS
- **FR-POS-01 (Toast POS Workflow):** High-speed product catalog grid, category switching, search by dish name, table assignment grid.
- **FR-POS-02 (Order Handling):** Hold order and resume order workflow with visual held badge counters.
- **FR-POS-03 (Split Payments):** Split bill across multiple tender types (e.g. ₹400 UPI + ₹250 Cash) with reconciliation validation.
- **FR-POS-04 (GST Invoice Generation):** Instant receipt preview with formatted print capability, CGST/SGST tax breakdown, and GSTIN formatting.

### 2.4 Kitchen Display System (KDS)
- **FR-KDS-01 (Station Routing):** Ticket routing to specific kitchen stations (`ST-TANDOOR`, `ST-CHINESE`, `ST-CURRY`, `ST-BEVERAGE`).
- **FR-KDS-02 (Prep Timers):** Real-time elapsed time display with progressive delay alerts (Green < 10m, Amber 10-20m, Red > 20m).
- **FR-KDS-03 (Bump Workflow):** Ticket progression (`RECEIVED` → `ACCEPTED` → `PREPARING` → `READY` → `COMPLETED`).

### 2.5 Central Admin Dashboard
- **FR-ADM-01 (Financial Dashboard):** Real-time aggregation of gross sales, net revenue, AOV, collected payments, taxes, and outlet comparison.
- **FR-ADM-02 (Menu Management):** Category creation, dish editing, price updates, availability toggles.
- **FR-ADM-03 (Inquiry Management):** Real-time view of website/app contact inquiries, status management (`NEW`, `IN_PROGRESS`, `RESOLVED`), and responses.
- **FR-ADM-04 (Inventory & Recipes):** Stock levels, reorder thresholds, low-stock warnings, recipe ingredient bill-of-materials, and estimated food cost percentage.
- **FR-ADM-05 (Table Reservations):** Calendar schedule of reservations with approval and table seating controls.

---

## 3. Non-Functional Requirements
- **NFR-01 (Security):** OWASP-compliant API security, JWT authentication, bcrypt password hashing, input sanitization with Zod, CORS protection, and secure HTTP headers via Helmet.
- **NFR-02 (Performance):** Sub-200ms API response time, server-side static page generation for public pages, client-side caching for mobile app.
- **NFR-03 (Reliability):** Real-time synchronization via Socket.IO with automated polling fallback for kitchen tickets and table status.
- **NFR-04 (Scalability):** Normalized relational schema in PostgreSQL 16 ready for multi-tenant and multi-branch horizontal growth.
