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
  const addToCartBtnList = [...document.querySelectorAll('.add-to-cart__btn')];
  addToCartBtnList.forEach(addToCartBtn => {
    addToCartBtn.addEventListener('click', () => {
      const btnId = +addToCartBtn.dataset.id;
      const productToAdd = products.find(product => product.id === btnId);
      Cart.addItem(productToAdd);
    });
  });
};

class Cart {
  static items = [];
  static addItem(product) {
    this.items.push(product);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  displayProducts();
});
