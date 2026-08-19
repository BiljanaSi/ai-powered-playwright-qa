// spec: tests/login-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');

test.describe('Inventory Page', () => {
  test('TC-023: Products are displayed', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.inventoryList).toBeVisible();
    await expect(inventoryPage.products.first()).toBeVisible();

    const productCount = await inventoryPage.products.count();
    expect(productCount).toBeGreaterThan(0);
  });
});
