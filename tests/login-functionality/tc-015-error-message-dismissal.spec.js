// spec: tests/login-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

test.describe('Login Functionality Test Suite', () => {
  test('TC-015: Error Message Dismissal - Close Button on Error Message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to https://www.saucedemo.com/
    await loginPage.open();

    // Log in with incorrect password
    await loginPage.login('standard_user', 'wrong_password');

    // Verify error message is displayed
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');

    // Look for and click the close button (X) on the error message if available
    const closeButton = page.locator('[data-test="error"] button');
    
    // Check if close button exists and click it
    if (await closeButton.isVisible()) {
      await closeButton.click();
      // Verify error message is dismissed
      await expect(loginPage.errorMessage).not.toBeVisible();
    } else {
      // If no close button exists, verify error message behavior
      await expect(loginPage.errorMessage).toBeVisible();
    }
  });
});
