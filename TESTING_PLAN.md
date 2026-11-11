# KICK BUNK 360 — QA Testing & Acceptance Plan

---

## 1. Testing Scope & Methodology

This test plan defines the automated, integration, and user-acceptance validation requirements across all platform components:
1. **API & Unit Testing:** Validating controller endpoints, database transactions, and RBAC rules.
2. **End-to-End Integration Testing:** Executing real dining lifecycles (Customer Order → POS Settlement → KDS Routing → Inventory Deduction → Owner Reporting).
3. **Frontend & Mobile Verification:** Ensuring all screens render correctly, forms submit to PostgreSQL, and native intents function.

---

## 2. Test Execution Matrix

| Test ID | Module | Scenario | Expected Outcome | Status |
|---|---|---|---|---|
| `TC-AUTH-01` | Auth | Login with invalid credentials | HTTP 401 Unauthorized with error message | Pass |
| `TC-AUTH-02` | Auth | Login with Owner credentials (`owner@kickbunk.com`) | HTTP 200 OK with valid JWT token & roles | Pass |
| `TC-ORD-01` | Orders | Create order with items & `WELCOME100` coupon | Subtotal calculated, ₹100 deducted, 5% GST added, HTTP 201 | Pass |
| `TC-ORD-02` | Orders | Verify client price tampering protection | Client prices ignored; prices calculated strictly on backend | Pass |
| `TC-POS-01` | POS | Split payment reconciliation | Reject if tenders != total; approve when matching | Pass |
| `TC-KDS-01` | KDS | New order ticket routing | Order arrives in KDS under correct station with timer | Pass |
| `TC-KDS-02` | KDS | Bump status through full lifecycle | Transitions `RECEIVED` → `ACCEPTED` → `PREPARING` → `READY` → `COMPLETED` | Pass |
| `TC-INV-01` | Inventory | Complete order with recipe mapping | Decrements raw Chicken & Rice from inventory item stock | Pass |
| `TC-RES-01` | Tables | Double booking attempt on same table & slot | First booking confirms; overlapping request returns HTTP 409 | Pass |
| `TC-REP-01` | Analytics | Owner Dashboard financial aggregation | Metrics match sum of persisted database records | Pass |
| `TC-INQ-01` | Contact | Submit website contact form | Record persisted in `contact_inquiries` table | Pass |
