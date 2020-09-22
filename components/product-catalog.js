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
            <h5 id="productName" class="product__name" data-id=${id}>${name}</h5>
            <h6 class="text-muted product__category">${category}</h6>
          </div>
          <h6 class="product__price">$${price}</h6>
        </div>
        <div class="d-flex justify-content-between">
          <div class="mt-auto py-1 product__rating">${getRatingsHTML(rating)}</div>
          <button class="add-to-cart--btn" data-id=${id}><i class="fas fa-cart-plus"></i></button>
        </div>
      </div>
    </article>`;
    }
  });
  productSection.innerHTML = productSectionHTML;
  addEventListenerOnProduct(products);
  addEventListenerOnCartBtns(products);
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

const addEventListenerOnProduct = products => {
  const productNameList = [...document.querySelectorAll('#productName')];
  productNameList.forEach(productName => {
    const productId = +productName.dataset.id;
    productName.addEventListener('click', event => {
      const product = products.find(product => product.id === productId);
      navigateToProductDetails(product);
      // navigateTo(`/product/${product.id}`, product);
    });
  });
};

const navigateToProductDetails = product => {
  const path = `/products/${product?.id}`;
  window.history.pushState({ product }, path, window.location.origin + path);
  mainContainer.innerHTML = productDetails();
};

const addEventListenerOnCartBtns = products => {
  const addToCartBtnList = [...document.querySelectorAll('.add-to-cart--btn')];
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
    addToCartBtn.innerHTML = '<span class="add-to-cart--text">ADDED TO CART</span>';
    addToCartBtn.disabled = true;
  }
};
