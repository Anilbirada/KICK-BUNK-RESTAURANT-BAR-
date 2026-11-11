# KICK BUNK 360 — API Documentation
## Base URL: `http://localhost:5000/api/v1`

---

## 1. Authentication & Users (`/auth`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/auth/login` | Public | Authenticate with email/phone & password. Returns JWT token. |
| `POST` | `/auth/register` | Public | Register customer account with 100 welcome loyalty points. |
| `GET` | `/auth/me` | Authenticated | Retrieve current user profile, roles, and branch mapping. |

---

## 2. Branches & Outlets (`/branches`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/branches` | Public | List all active Kick Bunk outlets (Bengaluru & Tirupati). |
| `GET` | `/branches/:id` | Public | Get outlet details including operating hours, tables, and stations. |
| `PUT` | `/branches/:id` | Admin/Manager | Update branch details, contacts, and delivery/takeaway toggles. |

---

## 3. Menu & Catalogs (`/menu`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/menu/categories` | Public | List all active categories with item counts. |
| `GET` | `/menu/items` | Public | Filter menu items by category, veg/non-veg, best-seller, or search. |
| `GET` | `/menu/items/:slug` | Public | Get item details including variants, add-ons, and images. |
| `PATCH` | `/menu/branch/:branchId/items/:menuItemId/availability` | Admin/Manager | Toggle branch-level item availability and price override. |

---

## 4. Orders & POS Billing (`/orders` & `/pos`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/orders` | Public/Staff | Create an order with backend price validation, coupon calculation, and 5% GST. |
| `GET` | `/orders` | Staff/Admin | List orders with pagination, status filters, and branch filtering. |
| `GET` | `/orders/:id` | Public/Staff | Get order details with line items, payments, and GST invoice. |
| `PATCH` | `/orders/:id/status` | Staff/Admin | Update order status; auto-deducts recipe inventory on `COMPLETED`. |
| `POST` | `/pos/:orderId/split-payment` | Cashier/Manager | Split order total across multiple payment tenders (UPI + Cash + Card). |
| `POST` | `/pos/:orderId/void` | Manager/Owner | Void order with supervisor reason and audit logging. |

---

## 5. Kitchen Display System (`/kitchen`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/kitchen/tickets` | Kitchen/Staff | Retrieve active kitchen tickets filtered by branch or kitchen station. |
| `PATCH` | `/kitchen/tickets/:id/status` | Kitchen Staff | Bump ticket status (`RECEIVED` → `ACCEPTED` → `PREPARING` → `READY` → `COMPLETED`). |

---

## 6. Tables & Reservations (`/tables`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/tables/branch/:branchId` | Public/Staff | Get branch floor plan tables with live status (`AVAILABLE`, `OCCUPIED`, `RESERVED`). |
| `PATCH` | `/tables/:id/status` | Staff | Update table occupancy status. |
| `POST` | `/tables/reservations` | Public | Request a table reservation with backend double-booking prevention. |
| `GET` | `/tables/reservations` | Staff/Admin | List reservations with date and status filters. |

---

## 7. Inventory & Recipe Costing (`/inventory`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/inventory/items` | Manager/Owner | List inventory items with stock levels and low-stock alert flags. |
| `POST` | `/inventory/items/:id/adjust` | Manager | Record manual stock adjustment, receipt, or wastage. |
| `GET` | `/inventory/recipes` | Manager/Owner | Get recipe bill of materials, ingredient costs, and food cost %. |

---

## 8. Loyalty, Feedback & Inquiries (`/loyalty` & `/inquiries`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/loyalty/coupons/validate` | Public | Validate coupon code against minimum order amount and usage limits. |
| `GET` | `/loyalty/customer/:customerId` | Authenticated | Retrieve loyalty points balance and transaction history. |
| `POST` | `/loyalty/feedback` | Public | Submit verified customer review with ratings. |
| `GET` | `/loyalty/feedback` | Public | Retrieve public customer testimonials. |
| `POST` | `/inquiries` | Public | Submit website/mobile contact form to database. |
| `GET` | `/inquiries` | Admin/Manager | List customer inquiries with status filters. |
| `PATCH` | `/inquiries/:id/status` | Admin/Manager | Update inquiry status and log admin response. |

---

## 9. Executive Reporting (`/reports`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/reports/dashboard` | Owner/Manager | Retrieve live aggregated metrics (Gross sales, net revenue, AOV, top dishes, outlet comparison). |
