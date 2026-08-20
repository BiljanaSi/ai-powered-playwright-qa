const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');

test.describe('Inventory Sorting', () => {
  test('@regression TC-038: Products can be sorted by name A to Z', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // Login
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    // Verify inventory page
    await expect(page).toHaveURL(/\/inventory\.html$/);

    // Sort products by name A to Z
    await inventoryPage.sortProductsBy('az');

    // Get product names
    const productNames = await inventoryPage.getProductNames();

    // Verify products are sorted alphabetically
    const sortedNames = [...productNames].sort((a, b) =>
      a.localeCompare(b)
    );

    expect(productNames).toEqual(sortedNames);
  });
});