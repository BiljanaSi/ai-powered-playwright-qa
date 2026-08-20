// spec: tests/checkout-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');
const { users } = require('../../test-data/users');
const { checkoutData } = require('../../test-data/checkout-data');

test.describe('Checkout Functionality', () => {
  test('@smoke @regression TC-033: Complete checkout with valid information', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Setup: Login and add product to cart
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.addFirstProduct();

    // Navigate to cart and checkout
    await page.locator('.shopping_cart_link').click();
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);

    // Enter checkout information
    await checkoutPage.enterCheckoutInfo(
   checkoutData.validCustomer.firstName,
   checkoutData.validCustomer.lastName,
   checkoutData.validCustomer.postalCode
);
    await checkoutPage.continueToOverview();

    // Verify overview page
    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);

    // Finish order
    await checkoutPage.finishOrder();

    // Verify order completion
    await expect(page).toHaveURL(/\/checkout-complete\.html$/);
    const isConfirmed = await checkoutPage.isOrderConfirmed();
    expect(isConfirmed).toBe(true);
  });
});
