// spec: tests/cart-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CartPage } = require('../../pages/CartPage');

test.describe('Cart Functionality', () => {
  test('@smoke @regression TC-027: Add single product to cart and verify in cart page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // Setup: Login and navigate to inventory
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/\/inventory\.html$/);

    // Add first product to cart
    await inventoryPage.addFirstProduct();

    // Navigate to cart
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/\/cart\.html$/);

    // Verify product appears in cart
    const cartCount = await cartPage.getCartItemCount();
    expect(cartCount).toBe(1);

    // Verify product details
    const productName = await cartPage.getProductNameByIndex(0);
    expect(productName).toBeTruthy();
  });
});
