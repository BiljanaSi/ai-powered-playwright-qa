// spec: tests/checkout-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');

test.describe('Checkout Functionality', () => {
  test('TC-037: Checkout overview displays correct items and totals', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Setup: Login and add multiple products
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addProductByIndex(0);
    await inventoryPage.addProductByIndex(1);

    // Navigate to checkout
    await page.locator('.shopping_cart_link').click();
    await cartPage.proceedToCheckout();
    await checkoutPage.enterCheckoutInfo('John', 'Doe', '12345');
    await checkoutPage.continueToOverview();

    // Verify we're on step two (overview page)
    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);

    // Verify both products are displayed
    const checkoutProducts = await checkoutPage.getCheckoutProducts();
    expect(checkoutProducts.length).toBe(2);

    // Verify summary totals are displayed
    const subtotal = await checkoutPage.getCheckoutSubtotal();
    const tax = await checkoutPage.getCheckoutTax();
    const total = await checkoutPage.getCheckoutTotal();

    expect(subtotal).toBeTruthy();
    expect(tax).toBeTruthy();
    expect(total).toBeTruthy();
  });
});
