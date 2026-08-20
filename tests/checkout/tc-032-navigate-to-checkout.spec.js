// spec: tests/checkout-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');
const { users } = require('../../test-data/users');

test.describe('Checkout Functionality', () => {
  test('@smoke @regression TC-032: Navigate to checkout with product in cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Setup: Login and add product to cart
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.addFirstProduct();

    // Navigate to cart
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/\/cart\.html$/);

    // Proceed to checkout
    await cartPage.proceedToCheckout();

    // Verify checkout page displayed
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(checkoutPage.checkoutContainer).toBeVisible();
    await expect(checkoutPage.firstNameInput).toBeVisible();
    await expect(checkoutPage.lastNameInput).toBeVisible();
    await expect(checkoutPage.postalCodeInput).toBeVisible();
  });
});
