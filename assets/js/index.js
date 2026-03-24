const container = document.querySelector("#products-container");
function fetchProducts() {
  container.innerHTML =
    '<p class="loading-text" style="text-align: center;">Завантажуємо товари...</p>';
  fetch("https://fakestoreapi.com/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Помилка сервера!");
      }
      return response.json();
    })
    .then((products) => {
      renderCards(products);
    })
    .catch((error) => {
      console.error("Сталася помилка:", error);
      container.innerHTML =
        '<p style="color: red; text-align: center;">Помилка завантаження. Спробуйте пізніше.</p>';
    });
}
function renderCards(productsList) {
  container.innerHTML = "";
  productsList.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;
    img.classList.add("product-image");
    const title = document.createElement("div");
    title.classList.add("product-title");
    title.textContent = product.title;
    const info = document.createElement("div");
    info.classList.add("product-info");
    const price = document.createElement("span");
    price.classList.add("product-price");
    price.textContent = `$${product.price}`;
    const rating = document.createElement("span");
    rating.classList.add("product-rating");
    rating.textContent = `⭐ ${product.rating.rate}`;
    info.append(price, rating);
    card.append(img, title, info);
    container.append(card);
  });
}
fetchProducts();
