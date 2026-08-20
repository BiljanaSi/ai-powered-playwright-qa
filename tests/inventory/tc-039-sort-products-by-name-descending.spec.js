const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');

test.describe('Inventory Sorting', () => {
  test('@regression TC-039: Products can be sorted by name Z to A', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // Login
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    // Verify inventory page
    await expect(page).toHaveURL(/\/inventory\.html$/);

    // Sort products by name Z to A
    await inventoryPage.sortProductsBy('za');

    // Get product names
    const productNames = await inventoryPage.getProductNames();

    // Verify products are sorted descending alphabetically
    const sortedNames = [...productNames].sort((a, b) =>
      b.localeCompare(a)
    );

    expect(productNames).toEqual(sortedNames);
  });
});