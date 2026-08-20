// spec: tests/login-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');

test.describe('Inventory Page', () => {
  test('@smoke @regression TC-026: Cart badge increments', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.addProductByIndex(0);
    await inventoryPage.addProductByIndex(1);

    await expect(inventoryPage.cartBadge).toHaveText('2');
  });
});
