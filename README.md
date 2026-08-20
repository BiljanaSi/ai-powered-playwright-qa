# AI-Powered Playwright QA

AI-assisted end-to-end test automation project built with Playwright.

This project demonstrates how AI agents can support the complete QA automation lifecycle — from test planning and test generation to refactoring, execution, and automated test healing.

## Tech Stack

- Playwright
- JavaScript
- Node.js
- Page Object Model (POM)
- Git
- GitHub Copilot / Playwright Agents

## AI-Powered QA Workflow

The project demonstrates the following workflow:

1. **Playwright Test Planner**
   - Explores the application
   - Identifies user flows
   - Creates a comprehensive test plan

2. **Playwright Test Generator**
   - Converts the test plan into automated Playwright tests
   - Generates JavaScript test cases
   - Uses the existing Page Object Model

3. **AI Code Review & Refactoring**
   - Reviews generated tests
   - Reuses existing Page Object methods
   - Removes unnecessary duplication
   - Preserves test behavior

4. **Playwright Test Execution**
   - Tests run across Chromium, Firefox and WebKit
   - 18 login test cases
   - 54 browser test executions

5. **Playwright Test Healer**
   - Detects a simulated selector failure
   - Investigates the browser state
   - Identifies the root cause
   - Repairs the Page Object selector
   - Re-runs the tests to verify the fix

## Test Coverage

The login test suite covers:

- Successful login
- Invalid username
- Invalid password
- Locked out user
- Empty username
- Empty password
- Empty credentials
- Username case sensitivity
- Password case sensitivity
- Special characters
- Leading whitespace
- Error message persistence
- Error message dismissal
- Performance glitch user
- Error user
- Visual user
- Field clearing
- Retry after failed login
- Keyboard navigation

## Test Results

Current automated test suite:

```text
42 test files
3 browsers
126 test executions

Browsers:
- Chromium
- Firefox
- WebKit



## Project Structure
```text
ai-powered-playwright-qa/
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── pages/
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
│
├── test-data/
│   ├── users.js
│   └── checkout-data.js
│
├── tests/
│   ├── login-functionality/
│   │   ├── tc-001-*.spec.js
│   │   └── ...
│   │
│   ├── inventory/
│   │   ├── tc-022-*.spec.js
│   │   ├── ...
│   │   └── tc-041-*.spec.js
│   │
│   ├── cart/
│   │   ├── tc-027-*.spec.js
│   │   ├── ...
│   │   └── tc-031-*.spec.js
│   │
│   ├── checkout/
│   │   ├── tc-032-*.spec.js
│   │   ├── ...
│   │   └── tc-037-*.spec.js
│   │
│   ├── example.spec.js
│   └── home-page.spec.js
│
├── playwright.config.js
├── package.json
├── package-lock.json
└── README.md

Page Object Model

The project uses the Page Object Model to centralize page locators and common actions.

Example:

async login(username, password) {
  await this.usernameInput.fill(username);
  await this.passwordInput.fill(password);
  await this.loginButton.click();
}

Tests can therefore remain simple and readable:

await loginPage.login('standard_user', 'secret_sauce');
AI Test Healing Example

A selector failure was intentionally introduced into LoginPage.js.

Original selector:

page.locator('[data-test="error"]');

The AI Healer investigated the failure and replaced it with a semantic locator:

page.getByText(/Epic sadface:/);

The healed implementation was then verified across the configured browsers.

Git Workflow

The healing demonstration was protected with Git checkpoints:

6c17a1f  Initial Playwright project setup
bb58e25  CHECKPOINT: Before TC-014 healing demonstration
ba9d063  HEALED: TC-014 - Fix error message selector...

This makes the AI-assisted changes traceable and reversible.

Running the Tests

Install dependencies:

npm install

Install Playwright browsers:

npx playwright install

Run the complete test suite:

npx playwright test

Run the login suite:

npx playwright test tests/login-functionality

Run a single test:

npx playwright test tests/login-functionality/tc-001-successful-login-standard-user.spec.js

Run tests with the HTML report:

npx playwright test
npx playwright show-report
Project Goal

The goal of this project is to demonstrate practical usage of AI agents in modern QA automation.

Instead of using AI only to generate code, the project demonstrates an AI-assisted workflow covering:

Plan → Generate → Refactor → Execute → Diagnose → Heal → Verify

# All tests
npx playwright test

# Smoke
npx playwright test --grep @smoke --project=chromium

# Regression
npx playwright test --grep @regression --project=chromium

# Inventory
npx playwright test tests/inventory --project=chromium

# Cart
npx playwright test tests/cart --project=chromium

# Checkout
npx playwright test tests/checkout --project=chromium

| Module    | Smoke | Regression |
|-----------|------:|-----------:|
| Login     |     4 |         18 |
| Inventory |     4 |          9 |
| Cart      |     2 |          5 |
| Checkout  |     3 |          6 |
| **Total** | **13** |     **38** |

Smoke tests:
- 13 tests
- 39 browser executions across Chromium, Firefox and WebKit
- 39 passed

Regression tests:
- 38 tests
- 114 browser executions across Chromium, Firefox and WebKit
- 114 passed