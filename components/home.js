const getProducts = async () => {
  try {
    const response = await fetch(`${DATA_URL}/products`);
    const { products } = await response.json();
    return products;
  } catch (error) {
    console.log(error);
  }
};

const home = () => {
  getProducts().then(products => {
    displayProducts(products);
    setupFilters(products);
    setupSearchBar(products);
  });

  return `
    <aside class="filters--section">${filterSection()}</aside>
    <section class="products--section"></section>
  `;
};
