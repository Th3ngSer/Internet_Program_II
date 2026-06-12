# TP06 — End-to-End Testing with Playwright

## 📖 Overview

This project is a **Test Automation Suite** built with **Playwright** and **TypeScript** to perform E2E (End-to-End) testing on the **Sauce Demo** website ([saucedemo.com](https://www.saucedemo.com/)). It validates core e-commerce functionalities: user authentication, cart management, sorting algorithms, checkout workflows, and multi-browser execution.

| Technology | Role |
|---|---|
| **Playwright Test** | Test runner and assertion library |
| **TypeScript** | Type-safe scripting language for test definitions |
| **Chromium, Firefox, WebKit** | Simulated web browsers for cross-browser testing |
| **HTML Reporter** | Test report generation |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────┐
│              Playwright Test Runner              │
│                                                  │
│   ┌──────────────┐ ┌──────────────┐ ┌────────┐   │
│   │   Chromium   │ │   Firefox    │ │ WebKit │   │
│   └──────┬───────┘ └──────┬───────┘ └───┬────┘   │
│          │                │             │        │
└──────────┼────────────────┼─────────────┼────────┘
           │                │             │
           └──────────────┬─┴─────────────┘
                          │ (HTTPS)
                          ▼
            ┌───────────────────────────┐
            │   saucedemo.com Website   │
            │   (React-based Frontend)  │
            └───────────────────────────┘
```

**Data Flow:**
1. Playwright launches browser context instances (Chromium, Firefox, WebKit) headless or headed.
2. Playwright navigates to `saucedemo.com`.
3. Test files locate elements using selectors (IDs, placeholders, roles) and perform user actions (clicks, keyboard fills).
4. Assertions check the browser state (URLs, text presence, element visibility).
5. A summary report is outputted to terminal and HTML.

---

## 📁 Project Structure

```
playwright-saucedemo/
├── playwright.config.ts                # Main Playwright configuration
├── package.json                        # Dependencies & Scripts
├── package-lock.json                   # Locked dependency tree
├── playwright-report/                  # Auto-generated HTML reports
└── tests/
    ├── smoke.spec.ts                   # Basic homepage loading smoke test
    ├── login.spec.ts                   # Login validations & Logout tests
    ├── cart.spec.ts                    # Add, remove, and view cart tests
    ├── checkout.spec.ts                # Checkout flow & field validations
    └── products.spec.ts                # Product sorting behavior tests
```

---

## ⚙️ Playwright Configuration

**File:** `playwright.config.ts`

The config file defines browser target details, parallelization, retry parameters, and reporting options:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

---

## 📝 Test Suites

### Part A — Smoke Tests
**File:** `tests/smoke.spec.ts`

Verifies that the website is online and responsive.

```typescript
import { test, expect } from '@playwright/test';

test('Sauce Demo homepage loads', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle(/Swag Labs/);
});
```

---

### Part B — Authentication & Login Validations
**File:** `tests/login.spec.ts`

Tests login scenarios (both happy path and validation errors) and logout functionalities.

* **Happy Path Login:** Signs in with standard user credentials and asserts URL redirects to `/inventory.html`.
* **Failed Login (Wrong Password):** Inputs wrong password and asserts the display of the error banner: `"Username and password do not match any user in this service"`.
* **Validation for Empty Fields:** Clicks login without inputs and asserts `'Username is required'` validation message.

---

### Part C — Cart Operations
**File:** `tests/cart.spec.ts`

Validates cart state preservation and item modifications.

* **Add Product to Cart:** Verifies that clicking "Add to Cart" increments the cart badge value to `1`.
* **View Cart Page:** Adds an item and navigates to the cart to verify the URL points to `/cart.html` and shows `"Your Cart"`.
* **Remove Item from Cart:** Adds an item, navigates to the cart, clicks "Remove", and verifies the cart badge counter goes down to `0` / disappears.

---

### Part D — Checkout Flow
**File:** `tests/checkout.spec.ts`

Validates billing information validation checks and successful order completion.

* **Complete Checkout Successfully:** Checks flow from cart -> checkout -> filling out First Name, Last Name, Zip Code -> clicking continue and finish -> asserting ordering completion screen `"Thank you for your order!"`.
* **Checkout Info Validation:** Clicks continue on checkout info page without filling form fields and asserts that error validation banner appears.

---

## 🏆 Part E — Challenges Completed

### ✅ Challenge 1 — Locked User
* **Test Location:** `tests/login.spec.ts`
* **Details:** Attempts to log in using the locked user account details (`locked_out_user`). Asserts that an error message is visible and matches the text:
  `'Sorry, this user has been locked out.'`

### ✅ Challenge 2 — Sorting Products
* **Test Location:** `tests/products.spec.ts`
* **Details:** Logs in and updates sorting dropdown values to evaluate price organization.
  * **Price (Low → High):** Selects `'lohi'`, extracts all prices, parses them, and asserts the first item price is equivalent to the minimum price.
  * **Price (High → Low):** Selects `'hilo'`, extracts all prices, parses them, and asserts the first item price is equivalent to the maximum price.

### ✅ Challenge 3 — Logout
* **Test Location:** `tests/login.spec.ts`
* **Details:** Logs in, clicks the burger menu button (`#react-burger-menu-btn`) to expand the navigation panel, clicks `#logout_sidebar_link`, and asserts redirection to the landing page URL and visibility of the login button.

### ✅ Challenge 4 — Multi-Browser run
* **Details:** Executed the test suite concurrently across multiple selected browser targets:
  ```bash
  npx playwright test --project=chromium --project=firefox
  ```

---

## ▶️ How to Run

```bash
# 1. Install dependencies
npm install

# 2. Run all tests in headless mode
npx playwright test

# 3. Run on specific browser projects (Challenge 4)
npx playwright test --project=chromium --project=firefox

# 4. Open Playwright UI mode (Interactive debugging)
npx playwright test --ui

# 5. Open HTML Test Execution Report
npx playwright show-report
```
