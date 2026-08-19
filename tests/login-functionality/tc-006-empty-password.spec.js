// spec: tests/login-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

test.describe('Login Functionality Test Suite', () => {
  test('TC-006: Empty Password Field Error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to https://www.saucedemo.com/
    await loginPage.open();

    // Enter 'standard_user' in the Username field
    await loginPage.usernameInput.fill('standard_user');

    // Leave Password field empty and click the Login button
    await loginPage.loginButton.click();

    // Verify error message displayed
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Password is required');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});