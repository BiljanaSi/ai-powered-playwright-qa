// spec: tests/login-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');

test.describe('Inventory Page', () => {
  test('@regression TC-024: Product contains required information', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    const firstProduct = inventoryPage.products.first();

    await expect(firstProduct.locator('.inventory_item_name')).toContainText(/.+/);
    await expect(firstProduct.locator('.inventory_item_price')).toContainText(/\$\d+\.\d{2}/);
    await expect(firstProduct.getByRole('button', { name: 'Add to cart' })).toBeVisible();
  });
});
