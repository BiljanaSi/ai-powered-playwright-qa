// spec: tests/login-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

test.describe('Login Functionality Test Suite', () => {
  test('TC-011: Special Characters in Username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to https://www.saucedemo.com/
    await loginPage.open();

    // Attempt login with special characters in username
    await loginPage.login('standard_user@#$', 'secret_sauce');

    // Verify error message displayed for username with special characters
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});
