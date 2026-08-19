// spec: tests/login-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

test.describe('Login Functionality Test Suite', () => {
  test('TC-010: Mixed Case Username Test', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to https://www.saucedemo.com/
    await loginPage.open();

    // Attempt login with mixed case username
    await loginPage.login('Standard_User', 'secret_sauce');

    // Verify error message displayed for mixed case username
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});
