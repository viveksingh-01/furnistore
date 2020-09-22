let searchText = '';

const navbar = () => {
  return `
  <nav class="navbar navbar-expand-md navbar-light">
    <div class="container">
      <a class="navbar-brand" href="#">FS</a>
      <div class="d-flex d-md-none mr-2">
        <form class="search-bar--form">
          <span class="mr-2 my-auto"><i class="fas fa-search fa-lg"></i></span>
          <input id="searchBarMob" type="search" class="form-control" placeholder="Search" aria-label="Search" />
        </form>
        <div class="mx-1 my-auto cart-btn--container">
          <button class="cart-btn">
            <i class="fas fa-shopping-cart"></i>
          </button>
          <div class="cart-btn--badge"></div>
        </div>
      </div>
      <button
        class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link active" id="home" onclick="navigateTo('home', '/'); return false">HOME<span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="shop" onclick="navigateTo('shop', '/shop'); return false">SHOP</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="magazine" onclick="navigateTo('magazine', '/magazine'); return false">MAGAZINE</a>
          </li>
        </ul>
        <div class="d-none d-md-flex">
          <form class="search-bar--form">
            <span class="mr-2 my-auto"><i class="fas fa-search fa-lg"></i></span>
            <input id="searchBar" type="search" class="form-control" placeholder="Search" aria-label="Search" />
          </form>
          <div class="mx-3 my-auto cart-btn--container">
            <button class="cart-btn">
              <i class="fas fa-shopping-cart"></i>
            </button>
            <div class="cart-btn--badge"></div>
          </div>
        </div>
        <div class="dropdown-divider"></div>
        <div>
          <button class="login-btn">LOGIN</button>
        </div>
      </div>
    </div>
  </nav>`;
};

const updateCartBadge = () => {
  const itemsCount = Cart.items.length;
  const cartBtnBadges = [...document.querySelectorAll('.cart-btn--badge')];
  cartBtnBadges.forEach(cartBtnBadge => {
    cartBtnBadge.textContent = itemsCount;
    if (itemsCount) {
      cartBtnBadge.style.display = 'block';
    } else {
      cartBtnBadge.style.display = 'none';
    }
  });
};

const setupSearchBar = products => {
  const searchBar = document.querySelector('#searchBar');
  searchBar.addEventListener('input', event => {
    searchText = event?.target.value;
    displayProducts(products);
  });
  const searchBarMob = document.querySelector('#searchBarMob');
  searchBarMob.addEventListener('input', event => {
    searchText = event?.target.value;
    displayProducts(products);
  });
};

const navigateTo = (component, pathname) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  mainContainer.innerHTML = routes[pathname]();
  makeNavLinkActive(component);
};

function makeNavLinkActive(component) {
  const navLinks = [...document.querySelectorAll('.nav-link')];
  navLinks.forEach(navLink => navLink.classList.remove('active'));
  const navigatedLink = document.querySelector(`#${component}`);
  navigatedLink.classList.add('active');
}
