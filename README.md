# KICK BUNK – European Luxury Restaurant & Bar
## Enterprise Restaurant Management & Digital Transformation Platform
### European Luxury × Modern Garden Restaurant × Premium Hospitality Ecosystem

[![Next.js](https://img.shields.io/badge/Next.js-14.x-black?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React_Native-Expo_SDK_51-61DAFB?style=flat&logo=react&logoColor=black)](https://reactnative.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-50_Entities-2D3748?style=flat&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Design System](https://img.shields.io/badge/Theme-European_Luxury_Light-C5A46D)](#)

---

## 🏛️ European Luxury Visual Redesign

The platform features a **European Luxury Light Theme**:

- **Warm Luxury Ivory (`#F7F3EB`)**: Primary canvas background providing a spacious, sunlit, and inviting ambiance.
- **Champagne Cream (`#EFE7DA`)**: Secondary surfaces for garden showcases and the photo editorial gallery.
- **Pure White (`#FFFFFF`)**: Crisp card surfaces for food items, private banquets, and checkout.
- **Antique Gold (`#B58A45`)**: Refined metallic accents, animated navigation underlines, and primary reservation buttons.
- **Rich Charcoal (`#25231F`)**: High-contrast, editorial serif and sans-serif typography.
- **Deep Emerald Green (`#254C3C`)**: Botanical garden anchor used across the reservation canvas, highlights, and brand footer.
- **Deep Burgundy (`#482A32`)**: The designated dark luxury contrast section exclusively for the **Resto-Bar Nightlife** experience.
- **Official Brand Logo Plaque**: Customer's original gold logo displayed inside a circular charcoal plaque with gold rim, preserving original proportions against the ivory header.

---

## 🚀 Live Production Links & Mobile App Download

| Component | Platform / Technology | Live Production Link | Status |
| :--- | :--- | :--- | :--- |
| **🌐 Customer Website** | Next.js 14 App Router | [**https://kickbunk-frontend.onrender.com**](https://kickbunk-frontend.onrender.com) | ✅ **Live** |
| **⚡ Central Backend API** | Express + Socket.IO + Prisma | [**https://kickbunk-backend.onrender.com/api/v1**](https://kickbunk-backend.onrender.com/api/v1) | ✅ **Live** |
| **🏥 Health Check** | System Monitoring Endpoint | [**https://kickbunk-backend.onrender.com/api/v1/health**](https://kickbunk-backend.onrender.com/api/v1/health) | ✅ **Healthy** |
| **📊 Executive Admin Suite** | Business Owner Portal | [**https://kickbunk-frontend.onrender.com/admin**](https://kickbunk-frontend.onrender.com/admin) | ✅ **Live** |
| **📱 Android Mobile App** | Standalone APK (`Kick Bunk.apk`) | [**Download Kick Bunk.apk (Repository)**](./Kick%20Bunk.apk) • [**Expo CDN Mirror**](https://expo.dev/artifacts/eas/EQQ_iOwetFm7-ZjhVKpq7TwsyAT_uVYpA6Eysdf4sWc.apk) | ✅ **Production Build** (63.99 MB) |
| **🐘 Cloud Database** | PostgreSQL 16 (Render Managed) | `kickbunk360` Database | ✅ **Online** |

> **Executive Admin Credentials**:
> - Email: `owner@kickbunk.com`
> - Password: `KickBunk@2026`

---

## Table of Contents
1. [Executive Summary & Enterprise Overview](#1-executive-summary--enterprise-overview)
2. [The Real-World Business Problem & Industry Pain Points](#2-the-real-world-business-problem--industry-pain-points)
3. [The Enterprise Solution: KICK BUNK 360](#3-the-enterprise-solution-kick-bunk-360)
4. [System Architecture & Data Flow](#4-system-architecture--data-flow)
5. [Verified Outlets & Real Brand Information](#5-verified-outlets--real-brand-information)
6. [Step-by-Step Installation & Execution Guide](#6-step-by-step-installation--execution-guide)
   - [Step 1: System Prerequisites](#step-1-system-prerequisites)
   - [Step 2: Database Setup & Password Configuration](#step-2-database-setup--password-configuration)
   - [Step 3: Centralized Backend API Setup](#step-3-centralized-backend-api-setup)
   - [Step 4: Web Application Setup (Customer, POS & Admin)](#step-4-web-application-setup-customer-pos--admin)
   - [Step 5: Cross-Platform Mobile Application Setup](#step-5-cross-platform-mobile-application-setup)
   - [Alternative: One-Command Docker Compose Setup](#alternative-one-command-docker-compose-setup)
7. [Default Seed Test Accounts & Passwords](#7-default-seed-test-accounts--passwords)
8. [Web Application Portals & Routing Directory](#8-web-application-portals--routing-directory)
9. [Mobile Application Structure (16 Screens)](#9-mobile-application-structure-16-screens)
10. [Automated End-to-End Acceptance Testing](#10-automated-end-to-end-acceptance-testing)
11. [Troubleshooting & Common Questions](#11-troubleshooting--common-questions)
12. [Accompanying Architecture Documentation](#12-accompanying-architecture-documentation)
13. [Commercial Ownership & Credits](#13-commercial-ownership--credits)

---

## 1. Executive Summary & Enterprise Overview

- **Client:** Kick Bunk Group
- **Architect & Development Partner:** Next Gen Digital Agency (Contact: +91 84317 12924)
- **Product Name:** KICK BUNK 360
- **Industry Vertical:** Luxury Casual Dining, Multi-Branch Garden Restaurants & Sports Bars
- **Benchmark Reference Platform:** Toast POS

**KICK BUNK 360** is a centralized, production-grade restaurant digital transformation platform designed and built specifically for the **Kick Bunk hospitality group**. It replaces disconnected third-party software with an end-to-end, vertically integrated digital ecosystem.

The system connects:
- A luxury casual dining **Customer Website** with direct food ordering and table/cabana booking.
- A cross-platform **Android & iOS Mobile Application** (React Native with Expo SDK 51).
- A high-speed **Toast POS-Style Billing Terminal** with split tenders, order hold/resume, and thermal GST invoice printing.
- A real-time **Kitchen Display System (KDS)** featuring automated station routing, countdown timers, and digital bump bar controls.
- An **Executive Multi-Branch Owner Dashboard** with live financial reporting, inventory tracking with recipe-level ingredient depletion, customer loyalty CRM, and staff management.

All modules interact in real time through a central **Node.js Express TypeScript API** with **Socket.IO WebSockets** and a normalized 50-entity **PostgreSQL 16** database.

---

## 2. The Real-World Business Problem & Industry Pain Points

Traditional multi-branch restaurants, garden bars, and casual dining chains experience severe operational friction:

### 1. Fragmented Software Silos
Most restaurants use 4 to 6 disconnected SaaS platforms: one for billing, another for table reservations, 3rd-party delivery aggregators (charging 25% to 35% commission fees), manual spreadsheets for inventory, and paper kitchen slips (KOTs). When these tools do not share a common database, stockouts occur during peak dinner hours, sales reconciliation takes hours every night, and customer data is lost to aggregators.

### 2. The "Kitchen Slip" Chaos (Lost KOTs & Delay Times)
In large venues like Kick Bunk (which features expansive outdoor garden dining and private cabanas), physical paper tickets frequently get lost, stained, or cooked out of sequence. Chefs have no visibility into how long an order has been waiting, resulting in cold starters, delayed main courses, and frustrated guests.

### 3. Food Waste & Raw Material Shrinkage (15%–20% Margin Loss)
High-cost ingredients—such as marinated tandoori chicken drumsticks, jumbo prawns, mutton cuts, and premium bar spirits—frequently vanish or spoil due to manual inventory estimation. Without automated recipe-level deduction tied directly to completed orders, restaurant owners lose 15%–20% of net margin every month.

### 4. Missing Direct Digital Ownership
Kick Bunk's Bengaluru Flagship holds a stellar **4.1★ rating with over 1,800+ authentic Google Reviews**, yet the business previously lacked its own online ordering and table booking engine. Customers were forced to phone in or use third-party aggregators that keep customer data and erode profitability.

### 5. Multi-Outlet Disconnect
Operating two locations—the **Bengaluru Flagship** in Electronic City and the **Tirupati Outlet** in Korlagunta—left ownership without real-time, consolidated sales figures, live gross margins, or cross-outlet inventory visibility.

---

## 3. The Enterprise Solution: KICK BUNK 360

KICK BUNK 360 solves these operational problems with a unified, vertically integrated platform:

1. **Direct Customer Ordering with 0% Commission:**
   Customers order food and book cabanas directly on the website or mobile app. The platform handles online payments and automatically calculates statutory **5% Indian Restaurant GST** (2.5% CGST + 2.5% SGST) post-discount.
2. **Toast-Inspired Counter POS Terminal:**
   Cashiers can rapidly enter orders, pick tables from an interactive visual floor plan, split bills across multiple tenders (Cash, Card, UPI), hold orders during table changes, and generate GST-compliant invoices.
3. **Live Kitchen Display System (KDS):**
   Orders instantly route to digital kitchen screens categorized by station:
   - *Clay Charcoal Tandoor* (Kalmi Kebab, Tandoori Chicken, Tikka Platters)
   - *Main Curry Kitchen* (Butter Chicken, Andhra Curries, Handi Biryani)
   - *Chinese & Continental* (Hong Kong Chicken, Chilli Paneer)
   - *Beverage & Cocktail Bar* (Draught Beers, Mocktails, Spirits)
   Prep timers flash amber and red when an order exceeds standard preparation thresholds.
4. **Automated Recipe Inventory Depletion Engine:**
   When the kitchen marks a dish as "Completed", the database automatically subtracts the exact recipe ingredients (e.g., 300g chicken drumsticks, 15g ginger-garlic paste, 5g cashew cream) from the branch inventory, eliminating raw material theft.
5. **Executive Financial Telemetry:**
   The Owner Dashboard calculates total revenue, average order value, labor costs, and food cost margins dynamically from immutable database records.

---

## 4. System Architecture & Data Flow

```
                                 ┌────────────────────────────────────────┐
                                 │            KICK BUNK 360               │
                                 │     Unified Platform Architecture      │
                                 └────────────────────────────────────────┘
                                                      │
            ┌─────────────────────────────────────────┼────────────────────────────────────────┐
            │                                         │                                        │
            ▼                                         ▼                                        ▼
   ┌──────────────────┐                     ┌──────────────────┐                     ┌──────────────────┐
   │ Next.js 14 Web   │                     │ React Native App │                     │ Toast-Style POS  │
   │ Customer Portal  │                     │ Android & iOS    │                     │ & Live KDS Bump  │
   │ (Port 3000)      │                     │ (Expo SDK 51)    │                     │ (Port 3000)      │
   └────────┬─────────┘                     └────────┬─────────┘                     └────────┬─────────┘
            │                                         │                                        │
            └─────────────────────────────────────────┼────────────────────────────────────────┘
                                                      │
                                                      ▼ HTTP / REST & WebSockets (ws://)
                                   ┌──────────────────────────────────────┐
                                   │     Node.js Express TypeScript       │
                                   │        Centralized API Server        │
                                   │             (Port 5000)              │
                                   └──────────────────┬───────────────────┘
                                                      │
                                                      ▼ Prisma ORM (50 Relational Models)
                                   ┌──────────────────────────────────────┐
                                   │            PostgreSQL 16             │
                                   │         Database: kickbunk360        │
                                   │             (Port 5433)              │
                                   └──────────────────────────────────────┘
```

### Technology Stack
- **Frontend Web Portal:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons, Socket.IO Client.
- **Cross-Platform Mobile Application:** React Native, Expo SDK 51, TypeScript, React Navigation (Native Stack + Bottom Tabs), Lucide React Native (16 screens).
- **Backend Application Server:** Node.js, Express, TypeScript, REST API architecture, Socket.IO WebSockets, Helmet security headers, CORS protection.
- **Database & ORM:** PostgreSQL 16, Prisma ORM with 50 normalized relational entities, foreign key constraints, atomic transactions, and B-Tree indexing.
- **Security & Authorization:** Role-Based Access Control (RBAC) middleware, stateless JSON Web Tokens (JWT), bcrypt password hashing (10 salt rounds).
- **Tax Compliance:** Statutory 5% Indian Restaurant GST (2.5% CGST + 2.5% SGST) applied strictly after promotional discounts.

---

## 5. Verified Outlets & Real Brand Information

### 1. Bengaluru Flagship (Electronics City)
- **Official Name:** Kick Bunk Family Garden Restaurant & Bar
- **Address:** Yarandahalli Main Road, near Hulimangala Cross, Electronic City Phase 1, Jigani Hobli, Bengaluru, Karnataka 560105
- **Google Maps Rating:** **4.1 ★ (1,800+ authentic reviews)**
- **Direct Phone Numbers:** `+91 82962 19302` / `+91 99866 95881` / `+91 99453 21367`
- **Operating Hours:** 11:30 AM – 11:30 PM (Open 7 Days a Week)
- **Facilities:** Open-air palm-lined garden, private bamboo dining cabanas, live charcoal clay tandoors, large-screen sports screening, climate-controlled family dining hall, full cocktail resto-bar, private parking.

### 2. Tirupati Outlet (Rayalaseema)
- **Official Name:** Kick Bunk Garden Bar & Restaurant
- **Address:** Door No. 19-1-G/25, Kothapalli, Samavayi Margam, Chinthalachenu, Korlagunta / Korramenugunta Road, Tata Nagar, Tirupati, Andhra Pradesh 517501
- **Google Maps Rating:** **4.0 ★ (150+ reviews)**
- **Direct Phone Numbers:** `+91 98855 20220` / `+91 77605 94868`
- **Operating Hours:** 11:30 AM – 11:00 PM (Open 7 Days a Week)
- **Facilities:** Outdoor garden cabanas, family AC dining section, signature Rayalaseema & Andhra spice dishes, bar lounge.

---

## 6. Step-by-Step Installation & Execution Guide

Follow these simple, step-by-step instructions to run the entire Kick Bunk 360 ecosystem locally on your development workstation.

### Step 1: System Prerequisites
Ensure you have the following installed on your machine:
- **Node.js:** v18.17.0 or higher ([Download Node.js](https://nodejs.org/))
- **npm:** v9.x or higher (comes bundled with Node.js)
- **Git:** Latest version ([Download Git](https://git-scm.com/))
- **PostgreSQL 16:** Installed and running locally ([Download PostgreSQL](https://www.postgresql.org/download/))

---

### Step 2: Database Setup & Password Configuration

The database configuration uses PostgreSQL 16. The project connects using the following credentials:

```ini
# PostgreSQL Database Connection Parameters
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5433
DB_NAME=kickbunk360
```

#### Exact Connection String:
```text
postgresql://postgres:postgres@localhost:5433/kickbunk360?schema=public
```
*(Note: If your local PostgreSQL installation runs on default port `5432`, simply change `5433` to `5432` in `backend/.env`)*.

#### Create the Database:
Open your PostgreSQL terminal (`psql`) or pgAdmin and run:
```sql
CREATE DATABASE kickbunk360;
```

---

### Step 3: Centralized Backend API Setup

1. Open your terminal and navigate to the backend directory:
   ```bash
   cd "backend"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create or verify `backend/.env` with the following contents:
   ```ini
   PORT=5000
   DATABASE_URL="postgresql://postgres:postgres@localhost:5433/kickbunk360?schema=public"
   JWT_SECRET="kickbunk360_ultra_secure_jwt_secret_token_2026_enterprise_dining"
   JWT_EXPIRES_IN="7d"
   CORS_ORIGIN="http://localhost:3000"
   NODE_ENV="development"
   ```

4. Push Database Schema (Prisma syncs all 50 tables without manual SQL migration files):
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Seed Initial Restaurant Business Data (Outlets, Categories, Dishes, Ingredients, Recipes, Staff Accounts):
   ```bash
   npm run prisma:seed
   ```

6. Start the Backend API Server:
   ```bash
   npm run dev
   ```
   *The backend will boot on **`http://localhost:5000`** with WebSocket real-time channels active.*  
   *Verify server health at: [http://localhost:5000/api/v1/health](http://localhost:5000/api/v1/health)*

---

### Step 4: Web Application Setup (Customer, POS & Admin)

1. Open a **new terminal window** and navigate to the frontend directory:
   ```bash
   cd "frontend"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create `frontend/.env.local` (or use default fallback):
   ```ini
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
   ```

4. Build and Launch the Web Application:
   - **For Development Mode (Hot Reloading):**
     ```bash
     npm run dev
     ```
   - **For Production Mode (Optimized Server):**
     ```bash
     npm run build
     npm start
     ```
   *The web platform will be accessible immediately at **`http://localhost:3000`**.*

---

### Step 5: Cross-Platform Mobile Application Setup

The mobile application runs on Android, iOS, or inside the Expo Go mobile client.

1. Open a **new terminal window** and navigate to the mobile directory:
   ```bash
   cd "mobile"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run TypeScript Verification (Confirm 0 type errors):
   ```bash
   npx tsc --noEmit
   ```

4. Launch the Expo Development Server:
   ```bash
   npm start
   ```
   - Press **`a`** to open in an **Android Emulator** or connected USB device.
   - Press **`i`** to open in an **iOS Simulator** (macOS only).
   - Or open the **Expo Go** app on your physical iPhone or Android smartphone and scan the terminal QR code.

---

### Alternative: One-Command Docker Compose Setup

To spin up the PostgreSQL database and all services in a single command using Docker:
```bash
docker-compose up -d
```

---

## 7. Default Seed Test Accounts & Passwords

The system comes pre-seeded with role-based user accounts for testing:

| Role | Email / Phone | Password | Accessible Portals & Permissions |
|---|---|---|---|
| **Business Owner** | `owner@kickbunk.com` | `KickBunk@2026` | Full Multi-Branch Analytics, Financial Auditing, Profit Margins |
| **Super Admin** | `admin@kickbunk.com` | `KickBunk@2026` | Global Configuration, Staff Management, Menu Engineering |
| **Branch Manager** | `manager.blr@kickbunk.com` | `KickBunk@2026` | Branch-specific Orders, Tables, Inventory, Stock Inward |
| **Cashier / POS** | `cashier.blr@kickbunk.com` | `KickBunk@2026` | Counter POS Billing Terminal, Split Payments, Cashier Shift Handover |
| **Kitchen Chef** | `kitchen.blr@kickbunk.com` | `KickBunk@2026` | Kitchen Display System (KDS), Station Routing, Bump Bar |
| **Customer** | `rahul.sharma@example.com` | `Customer@2026` | Online Food Ordering, Table/Cabana Bookings, Loyalty Rewards |

---

## 8. Web Application Portals & Routing Directory

| Web Route | Portal Description | Key Features |
|---|---|---|
| [`/`](http://localhost:3000/) | **Cinematic Homepage** | Hero video/imagery, 4.1★ Google review badge, bestsellers, brand ethos |
| [`/about`](http://localhost:3000/about) | **Brand & Story** | Heritage, charcoal clay tandoor, bamboo cabana atmosphere, facilities |
| [`/menu`](http://localhost:3000/menu) | **Digital Food Menu** | Instant search, Veg/Non-Veg filter, spice meters, portion & addon customizer |
| [`/gallery`](http://localhost:3000/gallery) | **Interactive Gallery** | Real photo & video lightbox modal with food & ambience categorization |
| [`/outlets`](http://localhost:3000/outlets) | **Outlets Locator** | Bengaluru & Tirupati map links, direct calling, daily timings |
| [`/booking`](http://localhost:3000/booking) | **Table Reservation** | Date/slot picker, guest counter, cabana preference, double-booking prevention |
| [`/contact`](http://localhost:3000/contact) | **Contact & Inquiries** | Direct inquiry form saving to database, WhatsApp chat trigger |
| [`/cart`](http://localhost:3000/cart) | **Ordering & Checkout** | Dine-In/Takeaway/Delivery toggle, `WELCOME100` coupon, 5% GST computation |
| [`/pos`](http://localhost:3000/pos) | **Toast POS Billing** | Rapid item entry, table layout grid, split tenders, hold/resume, GST invoice |
| [`/kitchen`](http://localhost:3000/kitchen) | **Kitchen Display (KDS)** | Station routing, live countdown prep timers, delay warnings, bump bar |
| [`/admin`](http://localhost:3000/admin) | **Executive Dashboard** | Real revenue metrics, AOV, low-stock warnings, recipes, reservations |

---

## 9. Mobile Application Structure (16 Screens)

The React Native mobile codebase is located in [`mobile/src/screens/`](mobile/src/screens/):

1. `SplashScreen.tsx`: Brand intro with luxury charcoal & warm gold loading animation.
2. `OnboardingScreen.tsx`: Feature walkthrough (Dining, Booking, Loyalty).
3. `HomeScreen.tsx`: Daily specials, bestsellers, direct ordering CTA, branch selector.
4. `BusinessInfoScreen.tsx`: Brand history, facilities, clay tandoor, Google reviews.
5. `MenuScreen.tsx`: Category tabs, dietary filters, price badges, search bar.
6. `CategoryScreen.tsx`: Filtered view of menu subcategories with item cards.
7. `ProductDetailScreen.tsx`: High-res photos, spice levels, portion customizer, addon check-boxes.
8. `GalleryScreen.tsx`: Photo grid showcasing outdoor garden dining and party cabanas.
9. `VideoScreen.tsx`: Video stream highlighting live kitchen tandoor cooking and ambience.
10. `ReviewsScreen.tsx`: Real verified Google reviews (4.1★) and rating submission form.
11. `LocationScreen.tsx`: Bengaluru and Tirupati branches with GPS navigation and direct call.
12. `ContactScreen.tsx`: Feedback form, management phone numbers, customer support.
13. `ProfileScreen.tsx`: Customer profile, past order history, saved addresses.
14. `SettingsScreen.tsx`: Notification toggles, dark/light theme options, language settings.
15. `FavoritesScreen.tsx`: Bookmarked favorite dishes with quick 1-tap re-order.
16. `NotificationsScreen.tsx`: Real-time order progress updates and exclusive promotional offers.

---

## 10. Automated End-to-End Acceptance Testing

To run the automated integration test suite validating the complete business flow against the live database:

```bash
cd "backend"
npx ts-node-dev --transpile-only src/tests/e2eTest.ts
```

### Verified Test Assertions:
- [x] Multi-branch discovery (`Bengaluru Flagship` & `Tirupati Outlet`).
- [x] Dynamic menu retrieval and pricing calculations.
- [x] JWT Authentication & Role-Based authorization.
- [x] Order placement with coupon `WELCOME100` and 5% Indian Restaurant GST calculation.
- [x] Real-time KDS ticket creation and status transitions (`RECEIVED` -> `ACCEPTED` -> `PREPARING` -> `READY`).
- [x] Automated recipe inventory deduction upon order fulfillment.
- [x] Table reservation conflict validation & double-booking prevention.
- [x] Real-time Owner Dashboard financial aggregation from persisted DB records.

---

## 11. Troubleshooting & Common Questions

### Q1: PostgreSQL connection error (`P1001: Can't reach database server at localhost:5433`)
- **Fix:** Verify PostgreSQL is running. If your PostgreSQL runs on port `5432` instead of `5433`, update `DATABASE_URL` in `backend/.env` to:
  ```ini
  DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kickbunk360?schema=public"
  ```

### Q2: Android emulator cannot reach backend API (`Network request failed`)
- **Fix:** On Android emulators, `localhost` points to the emulator itself. Use `http://10.0.2.2:5000/api/v1` (this is automatically configured in `mobile/src/api/client.ts`). For a physical device on the same Wi-Fi, replace with your workstation's LAN IP (e.g., `http://192.168.1.100:5000/api/v1`).

### Q3: Next.js build permission issue on Windows (`EPERM: operation not permitted`)
- **Fix:** Run your terminal as Administrator, or clean the cache before building:
  ```bash
  cd frontend
  rmdir /s /q .next
  npm run build
  ```

---

## 12. Accompanying Architecture Documentation

For in-depth architectural and engineering specifications, refer to the following documents in the repository root:
- [`REQUIREMENTS.md`](./REQUIREMENTS.md) — Functional and non-functional specifications.
- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — Microservice topologies, WebSocket matrices, caching.
- [`DATABASE_SCHEMA.md`](./DATABASE_SCHEMA.md) — 50-entity Prisma schema documentation.
- [`API_DOCUMENTATION.md`](./API_DOCUMENTATION.md) — REST endpoints, payloads, and response schemas.
- [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md) — Phased milestones and delivery roadmap.
- [`TESTING_PLAN.md`](./TESTING_PLAN.md) — Unit, integration, and load test benchmarks.
- [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) — Production multi-cloud infrastructure and SSL setup.

---

## 13. Commercial Ownership & Credits

**Product Name:** KICK BUNK 360  
**Hospitality Client:** Kick Bunk Group  
**Architect & Development Company:** RSR Technologies  
**Primary Contacts:** +91 77605 94868 / +91 99453 21367  
**Copyright:** © 2026 Kick Bunk Group & RSR Technologies. All rights reserved.
