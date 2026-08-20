// spec: tests/cart-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CartPage } = require('../../pages/CartPage');

test.describe('Cart Functionality', () => {
  test('@regression TC-028: Add multiple products to cart and verify all appear', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // Setup: Login and navigate to inventory
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/\/inventory\.html$/);

    // Add multiple products (first 3)
    await inventoryPage.addProductByIndex(0);
    await inventoryPage.addProductByIndex(1);
    await inventoryPage.addProductByIndex(2);

    // Navigate to cart
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/\/cart\.html$/);

    // Verify all 3 products appear in cart
    const cartCount = await cartPage.getCartItemCount();
    expect(cartCount).toBe(3);

    // Verify first product details
    const firstProductName = await cartPage.getProductNameByIndex(0);
    const firstProductPrice = await cartPage.getProductPriceByIndex(0);
    expect(firstProductName).toBeTruthy();
    expect(firstProductPrice).toContain('$');
  });
});
