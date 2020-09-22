const homepageHTML = `
  <aside class="filters--section">${filterSectionHTML}</aside>
  <section class="products--section"></section>
`;

const getProducts = async () => {
  try {
    const response = await fetch('./../product-data.json');
    const { products } = await response.json();
    return products;
  } catch (error) {
    console.log(error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  getProducts().then(products => {
    displayProducts(products);
    setupCategoryFilterToggler();
    setupCategoryFilter(products);
    setupPriceRangeFilter(products);
    setupSearchBar(products);
  });
});
