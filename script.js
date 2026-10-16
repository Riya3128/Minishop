
const products = [
  {
    id: 1,
    name: "Daily Glow Serum",
    category: "Skincare",
    price: 499,
    tag: "BESTSELLER",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Hydrating Face Cream",
    category: "Skincare",
    price: 349,
    tag: "DAILY CARE",
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Soft Matte Lipstick",
    category: "Makeup",
    price: 299,
    tag: "POPULAR",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Everyday Face Serum",
    category: "Skincare",
    price: 599,
    tag: "NEW",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Nourishing Hair Oil",
    category: "Haircare",
    price: 279,
    tag: "HAIR CARE",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Classic Sunglasses",
    category: "Accessories",
    price: 799,
    tag: "TRENDING",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    name: "Gentle Face Cleanser",
    category: "Skincare",
    price: 249,
    tag: "GENTLE CARE",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    name: "Makeup Brush Set",
    category: "Makeup",
    price: 449,
    tag: "ESSENTIAL",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80"
  }
];

const productGrid = document.getElementById("product-grid");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const sortFilter = document.getElementById("sort-filter");
const resultCount = document.getElementById("result-count");
const emptyMessage = document.getElementById("empty-message");
const resetButton = document.getElementById("reset-button");
const emptyReset = document.getElementById("empty-reset");
const cartCount = document.getElementById("cart-count");

let cartItems = 0;

// Format prices in Indian rupees.
function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);
}

// Display the products as cards.
function displayProducts(items) {
  productGrid.innerHTML = items.map(product => `
    <article class="product-card">
      <div class="product-image">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >
        <span class="product-tag">${product.tag}</span>
      </div>

      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>

        <div class="product-bottom">
          <span class="product-price">
            ${formatPrice(product.price)}
          </span>
          <button
            class="add-button"
            type="button"
            data-product-id="${product.id}"
          >
            + Add
          </button>
        </div>
      </div>
    </article>
  `).join("");

  resultCount.textContent =
    `${items.length} ${items.length === 1 ? "product" : "products"} found`;

  emptyMessage.hidden = items.length !== 0;
  productGrid.hidden = items.length === 0;
}

// Apply search, category and price sorting.
function filterProducts() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;
  const sortOrder = sortFilter.value;

  let filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm);

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (sortOrder === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  displayProducts(filteredProducts);
}

// Restore the default shop view.
function resetFilters() {
  searchInput.value = "";
  categoryFilter.value = "all";
  sortFilter.value = "default";
  filterProducts();
}

// Update the bag counter when Add is clicked.
productGrid.addEventListener("click", event => {
  const button = event.target.closest(".add-button");

  if (!button) return;

  cartItems++;
  cartCount.textContent = cartItems;
  button.textContent = "Added ✓";

  setTimeout(() => {
    button.textContent = "+ Add";
  }, 800);
});

// Listen for user interactions.
searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);
sortFilter.addEventListener("change", filterProducts);
resetButton.addEventListener("click", resetFilters);
emptyReset.addEventListener("click", resetFilters);

// Show all products when the page first opens.
filterProducts();
