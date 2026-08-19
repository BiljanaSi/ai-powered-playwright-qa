const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('user can login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory/);
  await expect(page.getByText('Products')).toBeVisible();
});