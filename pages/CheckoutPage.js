class CheckoutPage {
  constructor(page) {
    this.page = page;

    // Page sections
    this.checkoutContainer = page.locator('.checkout_info_container');
    this.checkoutForm = page.locator('.form_group');

    // Checkout information form - Step 1
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');

    // Form buttons
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });

    // Error message
    this.errorMessage = page.getByText(/error/i);

    // Checkout overview
    this.checkoutSummary = page.locator('.summary_info');
    this.checkoutItemsList = page.locator('.cart_item');
    this.checkoutSubtotalLabel = page.locator('.summary_subtotal_label');
    this.checkoutTaxLabel = page.locator('.summary_tax_label');
    this.checkoutTotalLabel = page.locator('.summary_total_label');

    // Checkout overview buttons
    this.finishButton = page.getByRole('button', { name: 'Finish' });

    // Confirmation page
    this.confirmationMessage = page.getByText(/Thank you for your order/i);
    this.confirmationContainer = page.locator('.pony_express');
    this.orderBackButton = page.getByRole('button', { name: 'Back Home' });
  }

  async enterCheckoutInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
  }

  async cancelCheckout() {
    await this.cancelButton.click();
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async completeCheckout(firstName, lastName, postalCode) {
    await this.enterCheckoutInfo(firstName, lastName, postalCode);
    await this.continueToOverview();
    await this.finishOrder();
  }

  async getCheckoutProducts() {
    const count = await this.checkoutItemsList.count();
    const products = [];

    for (let i = 0; i < count; i++) {
      const item = this.checkoutItemsList.nth(i);
      const name = await item.locator('.inventory_item_name').textContent();
      products.push(name);
    }

    return products;
  }

  async getCheckoutSubtotal() {
    return this.checkoutSubtotalLabel.textContent();
  }

  async getCheckoutTax() {
    return this.checkoutTaxLabel.textContent();
  }

  async getCheckoutTotal() {
    return this.checkoutTotalLabel.textContent();
  }

  async isErrorMessageVisible() {
    return this.errorMessage.isVisible().catch(() => false);
  }

  async getErrorMessage() {
    return this.errorMessage.textContent().catch(() => '');
  }

  async isOrderConfirmed() {
    return this.confirmationMessage.isVisible().catch(() => false);
  }

  async backToHome() {
    await this.orderBackButton.click();
  }
}

module.exports = { CheckoutPage };