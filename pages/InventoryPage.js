class InventoryPage {
  constructor(page) {
    this.page = page;

    // Inventory
    this.inventoryContainer = page.locator('.inventory_container');
    this.inventoryList = page.locator('.inventory_list');
    this.products = page.locator('.inventory_item');

    // Cart
    this.cartBadge = page.locator('.shopping_cart_badge');

    // Product
    this.productName = page.locator('.inventory_item_name').first();
    this.productPrice = page.locator('.inventory_item_price').first();
    this.addToCartButton = page
      .getByRole('button', { name: 'Add to cart' })
      .first();

    // Sorting
    this.sortDropdown = page.locator('.product_sort_container');
  }

  /**
   * Add product to cart by index
   * @param {number} index - Product index (0-based)
   */
  async addProductByIndex(index = 0) {
    const product = this.products.nth(index);
    await product.getByRole('button', { name: 'Add to cart' }).click();
  }

  /**
   * Add first product to cart
   */
  async addFirstProduct() {
    await this.addProductByIndex(0);
  }

  /**
   * Sort products
   * @param {string} option - Sorting option
   * az = Name A to Z
   * za = Name Z to A
   * lohi = Price low to high
   * hilo = Price high to low
   */
  async sortProductsBy(option) {
    await this.sortDropdown.selectOption(option);
  }

  /**
   * Get all product names in current order
   * @returns {Promise<Array<string>>}
   */
  async getProductNames() {
    return this.products
      .locator('.inventory_item_name')
      .allTextContents();
  }
}

module.exports = { InventoryPage };