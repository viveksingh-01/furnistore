let showCategoryFilter = false;
let maxPriceFilterValue = 1000;
let selectedFilterCategories = [];

const filterSection = () => {
  selectedFilterCategories = [];
  return `
    <h6 class="text-muted filters--section__header">FILTER BY</h6>
    <section class="filters--container">
      <article class="mb-2 filter__category">
        <div class="d-flex justify-content-between">
          <h6>Category</h6>
          <span id="categoryFilterToggler"><i class="fas fa-chevron-down fa-lg"></i></span>
        </div>
        <section id="categoryFilterSection" class="m-2"></section>
      </article>
      <hr />
      <article class="filter__price-range">
        <h6>Price Range</h6>
        <input type="range" min="0" max="10000" step="500" id="priceRangeFilter" />
        <div class="d-flex justify-content-between">
          <span id="priceFilterValue" class="range-value__text"></span>
          <span class="range-value__text">$10000</span>
        </div>
      </article>
    </section>
  `;
};

const setupFilters = products => {
  setupCategoryFilter(products);
  setupCategoryFilterToggler();
  setupPriceRangeFilter(products);
};

const setupCategoryFilterToggler = () => {
  const categoryFilterToggler = document.querySelector('#categoryFilterToggler');
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
    categoryFilterHTML += `
    <article>
      <input type="checkbox" class="category--checkbox" name=${category} value=${category} />
      <label for=${category}>${category}</label>
    </article>
    `;
  });
  const categoryFilterSection = document.querySelector('#categoryFilterSection');
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
  const priceRangeFilter = document.querySelector('#priceRangeFilter');
  priceRangeFilter.value = maxPriceFilterValue;
  const priceFilterValue = document.querySelector('#priceFilterValue');
  priceFilterValue.textContent = `$${maxPriceFilterValue}`;
  priceRangeFilter.addEventListener('input', event => {
    maxPriceFilterValue = event?.target.value;
    priceFilterValue.textContent = `$${maxPriceFilterValue}`;
    displayProducts(products);
  });
};
