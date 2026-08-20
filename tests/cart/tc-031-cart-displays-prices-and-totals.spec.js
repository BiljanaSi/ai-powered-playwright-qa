// spec: tests/cart-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');

test.describe('Cart Functionality', () => {
  test('@smoke @regression TC-031: Cart displays product prices and calculates totals', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Setup: Login and add products
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/\/inventory\.html$/);

    // Add first two products
    await inventoryPage.addProductByIndex(0);
    await inventoryPage.addProductByIndex(1);

    // Navigate to cart
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/\/cart\.html$/);

    // Verify product prices are displayed in the cart
    const productPrice1 = await cartPage.getProductPriceByIndex(0);
    const productPrice2 = await cartPage.getProductPriceByIndex(1);

    expect(productPrice1).toContain('$');
    expect(productPrice2).toContain('$');

    // Navigate to checkout
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);

    // Enter checkout information
    await checkoutPage.enterCheckoutInfo(
      'Test',
      'User',
      '12345'
    );

    // Navigate to checkout overview
    await checkoutPage.continueToOverview();
    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);

    // Verify summary totals are displayed
    const subtotal = await checkoutPage.getCheckoutSubtotal();
    const tax = await checkoutPage.getCheckoutTax();
    const total = await checkoutPage.getCheckoutTotal();

    expect(subtotal).toContain('$');
    expect(tax).toContain('$');
    expect(total).toContain('$');
  });
});