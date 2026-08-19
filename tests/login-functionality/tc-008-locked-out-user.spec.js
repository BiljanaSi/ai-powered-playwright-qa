// spec: tests/login-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

test.describe('Login Functionality Test Suite', () => {
  test('TC-008: Locked Out User Error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to https://www.saucedemo.com/
    await loginPage.open();

    // Attempt login with locked out user
    await loginPage.login('locked_out_user', 'secret_sauce');

    // Verify error message displayed
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});