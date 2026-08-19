// spec: tests/login-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

test.describe('Login Functionality Test Suite', () => {
  test('TC-005: Empty Username Field Error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to https://www.saucedemo.com/
    await loginPage.open();

    // Enter 'secret_sauce' in the Password field (leaving Username field empty)
    await loginPage.passwordInput.fill('secret_sauce');

    // Click the Login button
    await loginPage.loginButton.click();

    // Verify error message displayed
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username is required');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});