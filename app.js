const DATA_URL = 'http://localhost:8000';

const routes = {
  '/': home,
  '/shop': shop,
  '/magazine': magazine
};

const appHTML = `
  ${navbar()}
  <main id="mainContainer" class="container d-flex flex-column flex-lg-row my-3">
    ${home()}
  </main>
`;

const rootDiv = document.getElementById('root');
rootDiv.innerHTML = appHTML;

window.onpopstate = () => {
  const mainContainer = document.querySelector('#mainContainer');
  mainContainer.innerHTML = routes[window.location.pathname]();
};

document.addEventListener('DOMContentLoaded', () => {
  Cart.prepopulateWithItems();
  updateCartBadge();
});
