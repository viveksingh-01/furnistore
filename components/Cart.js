class Cart {
  static items = [];
  static addItem(product) {
    this.items.push(product);
    updateCartBadge();
    LocalStorage.save('cart', this.items);
  }
  static prepopulateWithItems() {
    const cartItems = LocalStorage.getItems('cart');
    if (cartItems) {
      this.items = cartItems;
      updateCartBadge();
    }
  }
}
