# Test Cases & Execution Report

## Overview

This document lists all automated test cases currently implemented for the SauceDemo web application. The suite covers smoke, functional, regression, security, and performance testing. Tests are written in JavaScript using Playwright (UI) and K6 (load testing), and run automatically via GitHub Actions.

## Test Environment

| Parameter         | Value                              |
| ----------------- | ---------------------------------- |
| Application URL   | `https://www.saucedemo.com`        |
| Browser           | Firefox (Viewport: 390x844)        |
| Valid Credentials | `standard_user` / `secret_sauce`   |
| Locked Account    | `locked_out_user` / `secret_sauce` |
| Test Framework    | Playwright 1.59.1                  |
| Performance Tool  | K6 v0.52.0                         |

## Test Cases

### 🔹 Smoke Testing

Basic checks to ensure the application is stable enough for further testing.

| ID    | Scenario                     | Steps                                                                                              | Expected Result                                                     | Mapped Script                       | Status    |
| ----- | ---------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------- | --------- |
| TC-01 | Login with valid credentials | 1. Navigate to login page<br>2. Enter `standard_user`<br>3. Enter `secret_sauce`<br>4. Click Login | Redirect to `/inventory.html`, product list loads, no error banners | `tests/smoke/login-success.spec.js` | ✅ Passed |
| TC-02 | Login with locked account    | 1. Navigate to login page<br>2. Enter `locked_out_user`<br>3. Enter any password<br>4. Click Login | Stay on login page, error message appears, no redirect              | `tests/smoke/login-invalid.spec.js` | ✅ Passed |

### 🔹 Functional Testing

Verifies specific user features work as intended.

| ID    | Scenario              | Steps                                                                                    | Expected Result                             | Mapped Script                               | Status    |
| ----- | --------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------- | --------- |
| TC-03 | Add item to cart      | 1. Log in successfully<br>2. Click "Add to cart" on any product<br>3. Check cart badge   | Badge updates to `1`, item state is stored  | `tests/functional/add-to-cart.spec.js`      | ✅ Passed |
| TC-04 | Remove item from cart | 1. Add one item to cart<br>2. Open cart page<br>3. Click "Remove"<br>4. Check cart badge | Badge disappears, item count returns to `0` | `tests/functional/remove-from-cart.spec.js` | ✅ Passed |

### 🔹 Regression Testing

Ensures core user flows remain intact after changes.

| ID    | Scenario                | Steps                                                                                                      | Expected Result                                                                   | Mapped Script                              | Status    |
| ----- | ----------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------ | --------- |
| TC-05 | Complete checkout flow  | 1. Log in & add product<br>2. Go to cart → Checkout<br>3. Fill shipping info → Continue<br>4. Click Finish | Redirect to success page, title shows "Checkout: Complete!", no console errors    | `tests/regression/checkout-flow.spec.js`   | ✅ Passed |
| TC-06 | Cancel checkout process | 1. Log in & add product<br>2. Go to cart → Checkout<br>3. Click "Cancel"<br>4. Check URL & page content    | Returns to cart page (`/cart.html`), title shows "Your Cart", cart data preserved | `tests/regression/checkout-cancel.spec.js` | ✅ Passed |

### 🔹 Security Testing

Basic validation for common input vulnerabilities.

| ID    | Scenario                       | Steps                                                                                                | Expected Result                                                                           | Mapped Script                          | Status    |
| ----- | ------------------------------ | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------- | --------- |
| TC-07 | SQL injection attempt on login | 1. Open login page<br>2. Enter username: `' OR '1'='1`<br>3. Enter random password<br>4. Click Login | Authentication fails, no dashboard access, error message does not expose database details | `tests/security/sql-injection.spec.js` | ✅ Passed |

### 🔹 Performance Testing

Non-UI load testing using K6 to validate baseline response times.

| ID    | Scenario           | Configuration                                 | Measured Metrics                               | Mapped Script              | Status    |
| ----- | ------------------ | --------------------------------------------- | ---------------------------------------------- | -------------------------- | --------- |
| TC-08 | Homepage load test | 5 virtual users, 1 min duration, ramp up/down | p95 < 5s, error rate < 50%, 0% actual failures | `performance/load-test.js` | ✅ Passed |

### 🔹 System Integration Testing (SIT Pattern)

Simulasi alur integrasi sistem menggunakan pola perbankan (Create => Read => Update => Delete => Verify).
Data flow divalidasi secara berurutan untuk memastikan konsistensi state antar endpoint.

| ID     | Scenario                               | Steps                                                                  | Expected Result                                | Mapped Script                                   | Status    |
| ------ | -------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------- | --------- |
| SIT-01 | Open Account & Validate Creation       | 1. POST request to create account<br>2. Validate response structure    | Status 200, `accountType=Savings`, `balance=0` | `tests/integration/banking-integration.spec.js` | ✅ Passed |
| SIT-02 | KYC Data Consistency Check             | 1. GET request by ID<br>2. Cross-validate fields with creation payload | All fields match, status `Active`              | `tests/integration/banking-integration.spec.js` | ✅ Passed |
| SIT-03 | Process Deposit & Verify State         | 1. PUT request with new balance<br>2. GET request to confirm update    | Balance updated to `7500000`, no data loss     | `tests/integration/banking-integration.spec.js` | ✅ Passed |
| SIT-04 | Account Closure & Cleanup Verification | 1. DELETE request<br>2. GET request to verify removal                  | Status 404, system consistent                  | `tests/integration/banking-integration.spec.js` | ✅ Passed |

---

## Execution & Maintenance

... (biarkan bagian ini tetap sama)

## Execution & Maintenance

- Tests run automatically on every push to `main` via GitHub Actions.
- Playwright generates an HTML report on each run; artifacts are saved for 7 days.
- K6 thresholds are set to baseline values suitable for a demo application.
- This document is updated manually whenever new tests are added or application behavior changes.

_Last updated: April 2026_
