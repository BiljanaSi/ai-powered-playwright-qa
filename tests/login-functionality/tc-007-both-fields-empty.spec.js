// spec: tests/login-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

test.describe('Login Functionality Test Suite', () => {
  test('TC-007: Both Fields Empty Error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to https://www.saucedemo.com/
    await loginPage.open();

    // Click the Login button without entering any credentials
    await loginPage.loginButton.click();

    // Verify error message displayed (Username is validated first)
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username is required');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});