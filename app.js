const routes = {
  '/': homepageHTML
};

const appHTML = `
  ${navbarHTML}
  <main id="mainContainer" class="container d-flex flex-column flex-lg-row my-3">
    ${homepageHTML}
  </main>
`;

const rootDiv = document.getElementById('root');
rootDiv.innerHTML = appHTML;

const searchBar = document.querySelector('#searchBar');
const searchBarMob = document.querySelector('#searchBarMob');
const categoryFilterSection = document.querySelector('#categoryFilterSection');
const categoryFilterToggler = document.querySelector('#categoryFilterToggler');
const priceRangeFilter = document.querySelector('#priceRangeFilter');
const priceFilterValue = document.querySelector('#priceFilterValue');
const cartBtnBadges = [...document.querySelectorAll('.cart-btn--badge')];
const productSection = document.querySelector('.products--section');
const mainContainer = document.querySelector('#mainContainer');
const productDetailsSection = document.querySelector('#productDetailsSection');
const addToCartBtn = document.querySelector('#addToCartBtn');

const navigateTo = pathname => {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  mainContainer.innerHTML = routes[pathname];
};

window.onpopstate = () => {
  mainContainer.innerHTML = routes[window.location.pathname];
};

const updateCartBadge = () => {
  const itemsCount = Cart.items.length;
  cartBtnBadges.forEach(cartBtnBadge => {
    cartBtnBadge.textContent = itemsCount;
    if (itemsCount) {
      cartBtnBadge.style.display = 'block';
    } else {
      cartBtnBadge.style.display = 'none';
    }
  });
};

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

class LocalStorage {
  static save(key, item) {
    localStorage.setItem(key, JSON.stringify(item));
  }
  static getItems(key) {
    return JSON.parse(localStorage.getItem(key));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  Cart.prepopulateWithItems();
  updateCartBadge();
});
