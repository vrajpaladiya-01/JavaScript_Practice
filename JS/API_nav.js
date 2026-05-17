/* =========================================
            DOM ELEMENTS
========================================= */
const productContainer = document.getElementById("productContainer");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const sortSelect = document.getElementById("sortSelect"); // New Sort Dropdown
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageNumber = document.getElementById("pageNumber");
const cartCount = document.getElementById("cartCount");
const logoutBtn = document.getElementById("logoutBtn");

/* =========================================
            GLOBAL VARIABLES
========================================= */
let currentPage = 1;
let productsPerPage = 8;
let totalProducts = 0;
let currentSearchText = "";
let selectedCategory = "all";
let currentSort = "default"; // New Sort Variable
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================================
            UPDATE CART COUNT
========================================= */
function updateCartCount() {
    if (cartCount) cartCount.innerText = cart.length;
}
updateCartCount();

/* =========================================
            LOGOUT FUNCTION
========================================= */
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "../HTML/API_login.html";
    });
}

/* =========================================
            FETCH PRODUCTS (With Sorting)
========================================= */
async function fetchProducts() {
    try {
        productContainer.innerHTML = `
            <div class="text-center mt-5 w-100">
                <div class="spinner-border text-primary" role="status"></div>
                <h4 class="mt-2">Loading Products...</h4>
            </div>
        `;

        let skip = (currentPage - 1) * productsPerPage;
        
        // Define base path based on search/category
        let basePath = "https://dummyjson.com/products";
        if (currentSearchText !== "") {
            basePath = "https://dummyjson.com/products/search";
        } else if (selectedCategory !== "all") {
            basePath = `https://dummyjson.com/products/category/${selectedCategory}`;
        }

        // Build URL parameters smoothly
        let url = new URL(basePath);
        
        if (currentSearchText !== "") {
            url.searchParams.append("q", currentSearchText);
        }
        
        url.searchParams.append("limit", productsPerPage);
        url.searchParams.append("skip", skip);

        // Append Sorting Parameters if selected
        if (currentSort !== "default") {
            const [sortBy, order] = currentSort.split("-"); // example: "price-asc" -> ["price", "asc"]
            url.searchParams.append("sortBy", sortBy);
            url.searchParams.append("order", order);
        }

        const response = await fetch(url.toString());
        const data = await response.json();

        totalProducts = data.total;
        displayProducts(data.products);
        updatePagination();

    } catch (error) {
        console.error(error);
        productContainer.innerHTML = `
            <div class="text-center mt-5 text-danger w-100">
                <h3>Failed To Load Products</h3>
            </div>
        `;
    }
}

/* =========================================
            DISPLAY PRODUCTS
========================================= */
function displayProducts(products) {
    productContainer.innerHTML = "";

    if (products.length === 0) {
        productContainer.innerHTML = `
            <div class="text-center mt-5 w-100">
                <h3>No Products Found</h3>
            </div>
        `;
        return;
    }

    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("col-lg-3", "col-md-4", "col-sm-6");

        productCard.innerHTML = `
            <div class="card border-0 shadow-sm h-100">
                <img src="${product.thumbnail}" class="card-img-top p-3" height="250" style="object-fit: contain;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-truncate" title="${product.title}">${product.title}</h5>
                    <p class="text-muted mb-1">${product.category}</p>
                    <p class="mb-1 text-warning">⭐ ${product.rating.toFixed(1)}</p>
                    <p class="mb-2">Stock : ${product.stock}</p>
                    <h4 class="text-primary mb-3">$${product.price}</h4>
                    <button class="btn btn-success mt-auto add-cart-btn" data-id="${product.id}">
                        Add To Cart
                    </button>
                </div>
            </div>
        `;
        productContainer.appendChild(productCard);
    });

    // Add To Cart Event
    document.querySelectorAll(".add-cart-btn").forEach((button) => {
        button.addEventListener("click", () => {
            addToCart(button.dataset.id);
        });
    });
}

/* =========================================
            ADD TO CART
========================================= */
function addToCart(productId) {
    cart.push(productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

/* =========================================
            PAGINATION LOGIC
========================================= */
function updatePagination() {
    pageNumber.innerText = `Page ${currentPage}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage * productsPerPage >= totalProducts;
}

prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        fetchProducts();
    }
});

nextBtn.addEventListener("click", () => {
    if (currentPage * productsPerPage < totalProducts) {
        currentPage++;
        fetchProducts();
    }
});

/* =========================================
            SEARCH LOGIC
========================================= */
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    currentSearchText = searchInput.value.trim();
    currentPage = 1; // Reset to page 1 on new search
    fetchProducts();
});

/* =========================================
            CATEGORY FILTER
========================================= */
async function fetchCategories() {
    try {
        const response = await fetch("https://dummyjson.com/products/categories");
        const categories = await response.json();

        categories.forEach((category) => {
            const option = document.createElement("option");
            option.value = category.slug; // DummyJSON updated to use slug
            option.innerText = category.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error("Category fetch error:", error);
    }
}

categorySelect.addEventListener("change", () => {
    selectedCategory = categorySelect.value;
    currentSearchText = ""; // Clear search when category changes
    searchInput.value = "";
    currentPage = 1;
    fetchProducts();
});

/* =========================================
            SORTING LOGIC
========================================= */
sortSelect.addEventListener("change", () => {
    currentSort = sortSelect.value;
    currentPage = 1; // Reset to page 1 on new sort
    fetchProducts();
});

/* =========================================
            INITIAL LOAD
========================================= */
fetchProducts();
fetchCategories();