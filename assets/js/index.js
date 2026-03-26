const container = document.getElementById("products-container");
function fetchProducts() {
  container.textContent = "";

  const loadingMsg = document.createElement("p");
  loadingMsg.classList.add("status-message");
  loadingMsg.textContent = "Завантажуємо товари...";
  container.append(loadingMsg);

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

      container.textContent = "";

      const errorMsg = document.createElement("p");
      errorMsg.classList.add("status-message", "error-message");
      errorMsg.textContent = "Помилка завантаження. Спробуйте пізніше.";
      container.append(errorMsg);
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
if (container) {
  fetchProducts();
} else {
  console.warn("Увага: Контейнер #products-container не знайдено на сторінці.");
}
