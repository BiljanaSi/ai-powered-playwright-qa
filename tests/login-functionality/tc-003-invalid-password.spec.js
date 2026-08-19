// spec: tests/login-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

test.describe('Login Functionality Test Suite', () => {
  test('TC-003: Invalid Password Error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to https://www.saucedemo.com/
    await loginPage.open();

    await loginPage.login('standard_user', 'wrong_password');

    // Verify error message displayed
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});