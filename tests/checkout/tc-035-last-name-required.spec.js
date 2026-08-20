// spec: tests/checkout-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');

test.describe('Checkout Functionality', () => {
  test('TC-035: Checkout validation - last name is required', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Setup: Login and add product to cart
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addFirstProduct();

    // Navigate to checkout
    await page.locator('.shopping_cart_link').click();
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);

    // Fill only first name and postal code (skip last name)
    await checkoutPage.firstNameInput.fill('John');
    await checkoutPage.postalCodeInput.fill('12345');
    await checkoutPage.continueButton.click();

    // Verify error message appears
    const isErrorVisible = await checkoutPage.isErrorMessageVisible();
    expect(isErrorVisible).toBe(true);

    // Verify still on checkout step one
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  });
});
