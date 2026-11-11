# KICK BUNK 360 — Database Schema Blueprint
## PostgreSQL 16 & Prisma Relational Entities

---

## 1. Relational Entities Matrix (50 Entities)

| # | Entity / Table | Description | Key Relationships |
|---|---|---|---|
| 1 | `organizations` | Root enterprise tenant (`Kick Bunk Hospitality Group`) | Has many `branches`, `users` |
| 2 | `branches` | Multi-branch locations (Bengaluru Flagship, Tirupati Outlet) | Belongs to `organization`; Has many `tables`, `orders`, `inventoryItems`, `inquiries` |
| 3 | `branch_hours` | Operational timings per day of the week | Belongs to `branch` |
| 4 | `users` | System accounts (Admins, Staff, Customers) | Has many `user_roles`, one `employee` or `customer` |
| 5 | `roles` | RBAC role definitions (`SUPER_ADMIN`, `BUSINESS_OWNER`, `CASHIER`, `KITCHEN_STAFF`, etc.) | Has many `user_roles`, `role_permissions` |
| 6 | `permissions` | Granular capability flags | Linked to `roles` via `role_permissions` |
| 7 | `user_roles` | User-to-Role junction mapping | Links `users` and `roles` |
| 8 | `employees` | Staff profile with employee code, salary, and designation | Belongs to `branch` and `user` |
| 9 | `customers` | Customer profiles with loyalty balance and visit counters | Belongs to `user`; Has many `orders`, `reservations`, `favorites` |
| 10 | `customer_addresses` | Saved delivery and billing addresses | Belongs to `customer` |
| 11 | `menu_categories` | Categories (Tandoori, Chinese, Biryani, Gravies, Breads, Mocktails) | Has many `menu_items` |
| 12 | `menu_items` | Master dishes with spice levels, veg flag, prep time | Belongs to `menu_category`; Has many `images`, `variants`, `addons`, `branch_menu_items`, `favorites` |
| 13 | `menu_item_images` | Gallery of dish photography with primary flag | Belongs to `menu_item` |
| 14 | `menu_variants` | Portions (Regular, Large, Half, Full) | Belongs to `menu_item` |
| 15 | `menu_addons` | Customizable extras (Extra gravy, mint chutney, cheese) | Belongs to `menu_item` |
| 16 | `branch_menu_items` | Branch-specific pricing overrides and live stock toggles | Junction between `branch` and `menu_item` |
| 17 | `tables` | Dining tables with zone (Garden, Cabana, Hall, Lounge) and capacity | Belongs to `branch`; Has many `orders`, `reservations` |
| 18 | `table_reservations` | Booking requests with guest count, slot, deposit, and status | Belongs to `branch`, `table`, `customer` |
| 19 | `orders` | Master order headers (`DINE_IN`, `TAKEAWAY`, `DELIVERY`) | Belongs to `branch`, `table`, `customer`; Has many `order_items`, `payments` |
| 20 | `order_items` | Line items with quantity and unit price | Belongs to `order`, `menu_item`, `menu_variant` |
| 21 | `order_item_modifiers` | Selected add-ons for an order item | Belongs to `order_item`, `menu_addon` |
| 22 | `payments` | Tender transactions (`CASH`, `UPI`, `CARD`, `ONLINE`) | Belongs to `order`; Has many `refunds` |
| 23 | `refunds` | Payment refund records with supervisor approval notes | Belongs to `payment` |
| 24 | `invoices` | Formal GST invoice records with CGST & SGST breakdown | Belongs to `order` |
| 25 | `kitchen_stations` | Stations (`ST-TANDOOR`, `ST-CHINESE`, `ST-CURRY`, `ST-BEVERAGE`) | Belongs to `branch`; Has many `kitchen_orders` |
| 26 | `kitchen_orders` | Real-time KDS tickets with timers and bump statuses | Belongs to `order`, `kitchen_station` |
| 27 | `inventory_items` | Raw ingredients (Chicken, Paneer, Rice, Butter, Spices) | Belongs to `branch`; Has many `inventory_transactions`, `recipe_ingredients` |
| 28 | `inventory_transactions` | Audit log of stock receipts, consumption, and wastage | Belongs to `inventory_item` |
| 29 | `suppliers` | Vendor directory with GSTIN and contact info | Has many `purchase_orders` |
| 30 | `purchase_orders` | PO generation for raw supplies | Belongs to `supplier`; Has many `purchase_order_items`, `goods_received_notes` |
| 31 | `purchase_order_items` | PO line items with quantities and unit costs | Belongs to `purchase_order`, `inventory_item` |
| 32 | `goods_received_notes` | Physical receiving records and delivery logs | Belongs to `purchase_order` |
| 33 | `recipes` | Bill of materials per menu item | Belongs to `menu_item`; Has many `recipe_ingredients` |
| 34 | `recipe_ingredients` | Quantity required per portion for inventory deduction | Belongs to `recipe`, `inventory_item` |
| 35 | `loyalty_accounts` | Loyalty point balances and membership tiers (`SILVER`, `GOLD`, `PLATINUM`) | Belongs to `customer`; Has many `loyalty_transactions` |
| 36 | `loyalty_transactions` | Points earn and burn history | Belongs to `loyalty_account`, `order` |
| 37 | `coupons` | Promo codes with min order value, discount % / flat, and usage limits | System promo rules |
| 38 | `customer_feedback` | Star ratings, food quality scores, and reviews | Belongs to `customer` |
| 39 | `marketing_campaigns` | WhatsApp, SMS, and Email promotional campaigns | Has many `marketing_events` |
| 40 | `marketing_events` | Campaign event logs (delivered, opened, clicked) | Belongs to `marketing_campaign` |
| 41 | `notifications` | In-app alerts for orders and reservations | Target recipient alerts |
| 42 | `expenses` | Operating expenses (utilities, supplies, maintenance) | Belongs to `branch` |
| 43 | `staff_shifts` | Shift schedules and staff assignments | Belongs to `branch`, `employee` |
| 44 | `attendance` | Clock-in and clock-out logs | Belongs to `employee` |
| 45 | `audit_logs` | Immutable audit trail for voids, discounts, deletions | Belongs to `user` |
| 46 | `media_assets` | Managed photography, hero videos, and logos | System media library |
| 47 | `system_settings` | Key-value application configurations | Global settings |
| 48 | `integration_settings` | API keys for payment gateways, WhatsApp, and Google Maps | Integration configs |
| 49 | `contact_inquiries` | Inquiries submitted via website and mobile contact forms | Belongs to `branch` |
| 50 | `favorites` | Customer saved favorite dishes across web and mobile | Junction between `customer` and `menu_item` |
