class CartPage {
  constructor(page) {
    this.page = page;
    
    // Cart container and items
    this.cartContainer = page.locator('.cart_contents');
    this.cartItems = page.locator('.cart_item');
    
    // Cart item details
    this.cartItemNames = page.locator('.inventory_item_name');
    this.cartItemPrices = page.locator('.inventory_item_price');
    this.cartItemQuantities = page.locator('.cart_quantity');
    
    // Action buttons
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    
    // Summary section
    this.cartSummary = page.locator('.summary_info');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
  }

  /**
   * Remove a product from cart by index
   * @param {number} index - Index of product to remove (0-based)
   */
  async removeProductByIndex(index = 0) {
    const cartItem = this.cartItems.nth(index);
    const removeButton = cartItem.getByRole('button', { name: /Remove/i });
    await removeButton.click();
  }

  /**
   * Remove a product from cart by name
   * @param {string} productName - Name of product to remove
   */
  async removeProductByName(productName) {
    const cartItem = this.cartItems.filter({ has: this.page.getByText(productName) }).first();
    const removeButton = cartItem.getByRole('button', { name: /Remove/i });
    await removeButton.click();
  }

  /**
   * Get product name at specific index in cart
   * @param {number} index - Product index (0-based)
   * @returns {Promise<string>} Product name
   */
  async getProductNameByIndex(index = 0) {
    const cartItem = this.cartItems.nth(index);
    const nameElement = cartItem.locator('.inventory_item_name');
    return nameElement.textContent();
  }

  /**
   * Get product price at specific index in cart
   * @param {number} index - Product index (0-based)
   * @returns {Promise<string>} Product price as string (e.g., "$29.99")
   */
  async getProductPriceByIndex(index = 0) {
    const cartItem = this.cartItems.nth(index);
    const priceElement = cartItem.locator('.inventory_item_price');
    return priceElement.textContent();
  }

  /**
   * Get quantity of product at specific index in cart
   * @param {number} index - Product index (0-based)
   * @returns {Promise<number>} Quantity as number
   */
  async getProductQuantityByIndex(index = 0) {
    const cartItem = this.cartItems.nth(index);
    const quantityElement = cartItem.locator('.cart_quantity');
    const text = await quantityElement.textContent();
    return parseInt(text, 10);
  }

  /**
   * Get total number of items in cart
   * @returns {Promise<number>} Number of cart items
   */
  async getCartItemCount() {
    return this.cartItems.count();
  }

  /**
   * Proceed to checkout
   */
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  /**
   * Continue shopping (return to inventory)
   */
  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  /**
   * Get subtotal text from summary
   * @returns {Promise<string>} Subtotal label text
   */
  async getSubtotal() {
    return this.subtotalLabel.textContent();
  }

  /**
   * Get tax text from summary
   * @returns {Promise<string>} Tax label text
   */
  async getTax() {
    return this.taxLabel.textContent();
  }

  /**
   * Get total price text from summary
   * @returns {Promise<string>} Total label text
   */
  async getTotal() {
    return this.totalLabel.textContent();
  }
}

module.exports = { CartPage };
