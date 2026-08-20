// spec: tests/cart-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CartPage } = require('../../pages/CartPage');

test.describe('Cart Functionality', () => {
  test('TC-029: Remove product from cart and verify it is deleted', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // Setup: Login and add products to cart
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/\/inventory\.html$/);

    // Add two products
    await inventoryPage.addProductByIndex(0);
    await inventoryPage.addProductByIndex(1);

    // Navigate to cart
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/\/cart\.html$/);

    // Verify 2 products in cart initially
    let cartCount = await cartPage.getCartItemCount();
    expect(cartCount).toBe(2);

    // Remove first product
    await cartPage.removeProductByIndex(0);

    // Verify only 1 product remains
    cartCount = await cartPage.getCartItemCount();
    expect(cartCount).toBe(1);
  });
});
