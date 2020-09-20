const searchBar = document.querySelector('#searchBar');
const searchBarMob = document.querySelector('#searchBarMob');
const categoryFilterSection = document.querySelector('#categoryFilterSection');
const categoryFilterToggler = document.querySelector('#categoryFilterToggler');
const priceRangeFilter = document.querySelector('#priceRangeFilter');
const priceFilterValue = document.querySelector('#priceFilterValue');
const cartBtnBadges = [...document.querySelectorAll('.cart-btn__badge')];
const productSection = document.querySelector('.products--section');

let searchText = '';
let showCategoryFilter = false;
const selectedFilterCategories = [];
let maxPriceFilterValue = 1000;

const setupSearchBar = products => {
  searchBar.addEventListener('input', event => {
    searchText = event?.target.value;
    displayProducts(products);
  });
  searchBarMob.addEventListener('input', event => {
    searchText = event?.target.value;
    displayProducts(products);
  });
};

const setupCategoryFilterToggler = () => {
  toggleCategoryFilterDisplay();
  categoryFilterToggler.addEventListener('click', () => {
    showCategoryFilter = !showCategoryFilter;
    toggleCategoryFilterDisplay();
  });
};

const toggleCategoryFilterDisplay = () => {
  if (showCategoryFilter) {
    categoryFilterToggler.innerHTML = '<i class="fas fa-chevron-up fa-lg"></i>';
    categoryFilterSection.style.display = 'block';
  } else {
    categoryFilterToggler.innerHTML = '<i class="fas fa-chevron-down fa-lg"></i>';
    categoryFilterSection.style.display = 'none';
  }
};

const setupCategoryFilter = products => {
  const categories = [...new Set(products.map(({ category }) => category))];
  let categoryFilterHTML = '';
  categories.forEach(category => {
    categoryFilterHTML += `<article>
      <input type="checkbox" class="category--checkbox" name=${category} value=${category} />
      <label for=${category}>${category}</label>
    </article>`;
  });
  categoryFilterSection.innerHTML = categoryFilterHTML;
  addEventListenerOnCategoryCheckBoxes(products);
};

const addEventListenerOnCategoryCheckBoxes = products => {
  const categoryCBs = [...document.querySelectorAll('.category--checkbox')];
  categoryCBs.forEach(categoryCB => {
    categoryCB.addEventListener('change', event => {
      const { checked, value } = event.target;
      if (checked) {
        selectedFilterCategories.push(value);
      } else {
        const index = selectedFilterCategories.indexOf(value);
        if (index > -1) {
          selectedFilterCategories.splice(index, 1);
        }
      }
      displayProducts(products);
    });
  });
};

const setupPriceRangeFilter = products => {
  priceRangeFilter.value = maxPriceFilterValue;
  priceFilterValue.textContent = `$${maxPriceFilterValue}`;
  priceRangeFilter.addEventListener('input', event => {
    maxPriceFilterValue = event?.target.value;
    priceFilterValue.textContent = `$${maxPriceFilterValue}`;
    displayProducts(products);
  });
};

const getProducts = async () => {
  try {
    const response = await fetch('./product-data.json');
    const { products } = await response.json();
    return products;
  } catch (error) {
    console.log(error);
  }
};

const getRatingsHTML = rating => {
  let ratingsHTML = '';
  for (let i = 1; i <= rating; i++) {
    ratingsHTML += '<i class="fas fa-star"></i>';
  }
  for (let j = 1; j <= 5 - rating; j++) {
    ratingsHTML += '<i class="far fa-star"></i>';
  }
  return ratingsHTML;
};

const displayProducts = products => {
  let productSectionHTML = '';
  if (selectedFilterCategories.length) {
    products = products.filter(({ category }) => selectedFilterCategories.includes(category));
  }
  products.forEach(product => {
    const { id, name, category, price, rating, imageUrl } = product;
    if (price <= maxPriceFilterValue && name.toLowerCase().includes(searchText)) {
      productSectionHTML += `<article class="product">
      <div class="product__image" title=${name}>
        <img src=${imageUrl} alt=${name} />
      </div>
      <div class="product__details">
        <div class="d-flex justify-content-between">
          <div class="product__info">
            <h5 class="product__name">${name}</h5>
            <h6 class="text-muted product__category">${category}</h6>
          </div>
          <h6 class="product__price">$${price}</h6>
        </div>
        <div class="d-flex justify-content-between">
          <div class="mt-auto py-1 product__rating">${getRatingsHTML(rating)}</div>
          <button class="add-to-cart__btn" data-id=${id}><i class="fas fa-cart-plus"></i></button>
        </div>
      </div>
    </article>`;
    }
  });
  productSection.innerHTML = productSectionHTML;
  addEventListenerOnCartBtns(products);
};

const addEventListenerOnCartBtns = products => {
  const addToCartBtnList = [...document.querySelectorAll('.add-to-cart__btn')];
  addToCartBtnList.forEach(addToCartBtn => {
    const btnId = +addToCartBtn.dataset.id;
    checkIfItemInCartAndModifyBtn(addToCartBtn, btnId);
    addToCartBtn.addEventListener('click', () => {
      const productToAdd = products.find(product => product.id === btnId);
      Cart.addItem(productToAdd);
      updateCartBadge();
      checkIfItemInCartAndModifyBtn(addToCartBtn, btnId);
    });
  });
};

const updateCartBadge = () => {
  cartBtnBadges.forEach(cartBtnBadge => {
    cartBtnBadge.textContent = Cart.items.length;
  });
};

const checkIfItemInCartAndModifyBtn = (addToCartBtn, btnId) => {
  const isItemInCart = Cart.items.find(item => item.id === btnId);
  if (isItemInCart) {
    addToCartBtn.innerHTML = '<span class="add-to-cart__text">ADDED TO CART</span>';
    addToCartBtn.disabled = true;
  }
};

class Cart {
  static items = [];
  static addItem(product) {
    this.items.push(product);
    LocalStorage.save('cart', this.items);
  }
  static prepopulateWithItems() {
    const cartItems = LocalStorage.getItems('cart');
    if (cartItems) {
      this.items = cartItems;
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
  getProducts().then(products => {
    displayProducts(products);
    setupSearchBar(products);
    setupCategoryFilterToggler();
    setupCategoryFilter(products);
    setupPriceRangeFilter(products);
  });
});
