const productSection = document.querySelector('.products--section');

const getProducts = async () => {
  try {
    const response = await fetch('./product-data.json');
    const { products } = await response.json();
    return products;
  } catch (error) {
    console.log(error);
  }
};

const getRatingsHTML = ({ rating }) => {
  let ratingsHTML = '';
  for (let i = 1; i <= rating; i++) {
    ratingsHTML += '<i class="fas fa-star"></i>';
  }
  for (let j = 1; j <= 5 - rating; j++) {
    ratingsHTML += '<i class="far fa-star"></i>';
  }
  return ratingsHTML;
};

const displayProducts = async () => {
  const products = await getProducts();
  let productSectionHTML = '';
  products.forEach(product => {
    productSectionHTML += `<article class="product">
      <div class="product__image" title=${product.name}>
        <img src=${product.imageUrl} alt=${product.name} />
      </div>
      <div class="product__details">
        <div class="d-flex justify-content-between">
          <div class="product__info">
            <h5 class="product__name">${product.name}</h5>
            <h6 class="text-muted product__category">${product.category}</h6>
          </div>
          <h6 class="product__price">$${product.price}</h6>
        </div>
        <div class="d-flex justify-content-between">
          <div class="mt-auto product__rating">${getRatingsHTML(product)}</div>
          <button class="add-to-cart__btn" data-id=${product.id}><i class="fas fa-cart-plus"></i></button>
        </div>
      </div>
    </article>`;
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
      checkIfItemInCartAndModifyBtn(addToCartBtn, btnId);
    });
  });
};

const checkIfItemInCartAndModifyBtn = (addToCartBtn, btnId) => {
  const isItemInCart = Cart.items.find(item => item.id === btnId);
  if (isItemInCart) {
    addToCartBtn.innerHTML = '<span style="font-size: 1rem">IN CART</span>';
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
  displayProducts();
});
