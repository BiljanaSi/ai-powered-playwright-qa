// spec: tests/login-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

test.describe('Login Functionality Test Suite', () => {
  test('@regression TC-012: Password Case Sensitivity - Uppercase Password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to https://www.saucedemo.com/
    await loginPage.open();

    // Attempt login with uppercase password (case sensitivity test)
    await loginPage.login('standard_user', 'SECRET_SAUCE');

    // Verify error message displayed for uppercase password
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});
