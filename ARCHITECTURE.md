# KICK BUNK 360 — System Architecture Document
## Multi-Channel Restaurant Platform & Mobile Architecture

---

## 1. Architectural Overview

KICK BUNK 360 is built upon a modern, decoupled, multi-client, and event-driven architecture. All client applications (Customer Website, Mobile App, POS Terminal, Kitchen KDS, and Admin Portal) communicate with a single centralized Express.js TypeScript API backend connected to PostgreSQL 16.

```
+-----------------------------------------------------------------------------------+
|                                  CLIENT LAYER                                     |
|                                                                                   |
|  +--------------------+  +--------------------+  +-----------------------------+  |
|  |  Customer Website  |  |  React Native App  |  |  Counter POS & Kitchen KDS  |  |
|  |  (Next.js 14 Web)  |  |  (iOS & Android)   |  |  (High-Speed Web Terminals) |  |
|  +---------+----------+  +---------+----------+  +--------------+--------------+  |
|            |                       |                            |                 |
+------------|-----------------------|----------------------------|-----------------+
             | HTTPS (REST APIs)     | HTTPS (REST APIs)          | WebSockets & REST
             v                       v                            v
+-----------------------------------------------------------------------------------+
|                        APPLICATION GATEWAY & SECURITY                             |
|                                                                                   |
|  - Helmet HTTP Security Headers              - CORS Policy & Origin Controls      |
|  - JWT Bearer Authentication                 - Role-Based Access Control (RBAC)   |
|  - Zod Request Validation & Sanitization     - API Rate Limiting                  |
+-----------------------------------------------------------------------------------+
                                     |
                                     v
+-----------------------------------------------------------------------------------+
|                          BACKEND APPLICATION SERVICES                             |
|                                                                                   |
|  +-------------------+  +-------------------+  +-------------------------------+  |
|  |  Auth & Users     |  |  Menu & Catalogs  |  |  Orders & POS Billing Engine  |  |
|  +-------------------+  +-------------------+  +-------------------------------+  |
|  |  KDS Real-Time    |  |  Tables & Booking |  |  Inventory & Food Costing     |  |
|  +-------------------+  +-------------------+  +-------------------------------+  |
|  |  CRM & Loyalty    |  |  Inquiries & Maps |  |  Owner Financial Analytics    |  |
|  +-------------------+  +-------------------+  +-------------------------------+  |
|                                                                                   |
|                   Socket.IO Real-Time Engine (POS <-> KDS Rooms)                  |
+-----------------------------------------------------------------------------------+
                                     |
                                     v
+-----------------------------------------------------------------------------------+
|                         DATA & PERSISTENCE LAYER                                  |
|                                                                                   |
|  - Prisma ORM 5.22                                                                |
|  - PostgreSQL 16 (Port 5433: database 'kickbunk360')                              |
|  - 50 Normalized Relational Tables with Foreign Keys & Compound Indexes           |
|  - Local File Storage & Object Storage Hooks (AWS S3 / Cloudinary)                |
+-----------------------------------------------------------------------------------+
```

---

## 2. Component Design

### 2.1 Web Frontend (`/frontend`)
- **Framework:** Next.js 14 App Router with React 18 & TypeScript.
- **Styling:** Tailwind CSS with custom luxury casual dining palette (`#121417` Charcoal, `#D4AF37` Warm Gold, `#2E6F40` Garden Green, `#FBF9F5` Ivory).
- **Icons & Assets:** Lucide React icons.
- **State Management:** React Context API (`CartProvider`) with local storage persistence and branch isolation.

### 2.2 Mobile Application (`/mobile`)
- **Framework:** React Native with Expo SDK and TypeScript.
- **Navigation:** React Navigation (Bottom Tab Navigator + Native Stack Navigator).
- **Network Layer:** Unified Axios/Fetch API client targeting backend endpoint `http://<HOST>:5000/api/v1`.
- **Target OS:** Android (APK/AAB) and iOS (IPA / App Store).

### 2.3 Backend API Server (`/backend`)
- **Runtime:** Node.js v26.7.0 / v20 with TypeScript and Express 4.
- **ORM:** Prisma 5.22 client with connection pooling.
- **Real-Time:** Socket.IO v4 for KDS bump notifications and POS order broadcasts.
- **Authentication:** Stateless JWT tokens containing `userId`, `roles`, and `branchId`.

### 2.4 Database (`PostgreSQL 16`)
- Normalized schema supporting organizations, multiple branches, operational hours, tables, reservations, menu items, variants, add-ons, orders, split payments, GST invoices, kitchen stations, inventory items, recipe bill-of-materials, customer inquiries, and favorites.
