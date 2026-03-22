
const container = document.querySelector("#products-container");
async function fetchProducts() {
  try {
    container.innerHTML =
      '<p style="text-align: center;">Завантажуємо товари...</p>';
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    renderCards(products);
  } catch (error) {
    console.error("Сталася помилка:", error);
    container.innerHTML =
      '<p style="color: red; text-align: center;">Помилка завантаження. Спробуйте пізніше.</p>';
  }
}
function renderCards(productsList) {
  container.innerHTML = "";
  productsList.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card"); 
    card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-title">${product.title}</div>
            <div class="product-info">
                <span class="product-price">$${product.price}</span>
                <span class="product-rating">⭐ ${product.rating.rate}</span>
            </div>
        `;
    container.append(card);
  });
}
fetchProducts();
