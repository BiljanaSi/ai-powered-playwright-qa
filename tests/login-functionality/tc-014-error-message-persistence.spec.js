// spec: tests/login-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

test.describe('Login Functionality Test Suite', () => {
  test('@regression TC-014: Error Message Persistence', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to https://www.saucedemo.com/
    await loginPage.open();

    // Log in with incorrect password
    await loginPage.login('standard_user', 'wrong_password');

    // Verify error message is displayed
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');

    // Wait for 2 seconds without performing any action
    await page.waitForTimeout(2000);

    // Verify error message persists and does not auto-dismiss
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');

    // Click in the Username field
    await loginPage.usernameInput.click();

    // Verify error message remains visible after clicking in the input field
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
  });
});
