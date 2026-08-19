class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryContainer = page.locator('.inventory_container');
    this.inventoryList = page.locator('.inventory_list');
    this.products = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.productName = page.locator('.inventory_item_name').first();
    this.productPrice = page.locator('.inventory_item_price').first();
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' }).first();
  }

  async addProductByIndex(index = 0) {
    const product = this.products.nth(index);
    await product.getByRole('button', { name: 'Add to cart' }).click();
  }

  async addFirstProduct() {
    await this.addProductByIndex(0);
  }
}

module.exports = { InventoryPage };
