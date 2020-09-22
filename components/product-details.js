const productDetails = () => {
  const product = window.history.state?.product;
  return `
    <section id="productDetailsSection" class="product-details--section">
      <div class="product-carousel">
        <img src=${product?.imageUrl} alt=${product?.name} />
      </div>
      <article class="product-details">
        <header>
          <h3>${product?.name}</h3>
          <h6>${product?.category}</h6>
        </header>
        <p>${product?.description}</p>
        <div class="d-flex align-items-center">
          <div class="d-flex flex-column mr-5">
            <span class="price-per-unit--text">Price per unit</span>
            <h5 class="font-weight-bold">$${product?.price}</h5>
          </div>
          <button class="buy-now--btn mr-4">Buy Now</button>
          <button id="addToCartBtn" class="add-to-cart--btn"><i class="fas fa-cart-plus"></i></button>
        </div>
      </article>
    </section>
  `;
};
