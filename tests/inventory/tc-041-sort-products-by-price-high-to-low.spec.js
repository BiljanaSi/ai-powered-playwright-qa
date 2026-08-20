const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');

test.describe('Inventory Sorting', () => {
  test('@regression TC-041: Products can be sorted by price high to low', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // Login
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    // Verify inventory page
    await expect(page).toHaveURL(/\/inventory\.html$/);

    // Sort products by price high to low
    await inventoryPage.sortProductsBy('hilo');

    // Get product prices
    const priceTexts = await inventoryPage.products
      .locator('.inventory_item_price')
      .allTextContents();

    // Convert prices to numbers
    const prices = priceTexts.map(price =>
      parseFloat(price.replace('$', ''))
    );

    // Verify descending order
    const sortedPrices = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sortedPrices);
  });
});