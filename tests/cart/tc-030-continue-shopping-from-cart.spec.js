// spec: tests/cart-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CartPage } = require('../../pages/CartPage');

test.describe('Cart Functionality', () => {
  test('TC-030: Continue shopping from cart returns to inventory', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // Setup: Login and add product to cart
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/\/inventory\.html$/);

    // Add one product
    await inventoryPage.addFirstProduct();

    // Navigate to cart
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/\/cart\.html$/);

    // Verify we're on cart page
    const cartCount = await cartPage.getCartItemCount();
    expect(cartCount).toBe(1);

    // Continue shopping
    await cartPage.continueShopping();

    // Verify back on inventory page
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.inventoryContainer).toBeVisible();
  });
});
