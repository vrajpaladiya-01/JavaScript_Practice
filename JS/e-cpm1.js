// app.js

// State Variables
let currentUser = null;
let currentCartCount = 0;
let paginationSkip = 0;
const limit = 12;

// DOM Elements
const loginSection = document.getElementById('loginSection');
const mainSection = document.getElementById('mainSection');
const navbar = document.getElementById('navbar');
const loginForm = document.getElementById('loginForm');
const loader = document.getElementById('loader');
const productsContainer = document.getElementById('productsContainer');

// --- Initialization ---
document.addEventListener("DOMContentLoaded", async () => {
    checkAuth();
});

// --- Auth Flow ---
async function checkAuth() {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            // Token verify કરવા /me કોલ
            currentUser = await apiGetMe();
            showDashboard();
        } catch (error) {
            console.log("Session expired. Logging out.");
            logout();
        }
    } else {
        showLogin();
    }
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    const btn = document.getElementById('btnLoginBtn');

    btn.textContent = "Logging in...";
    errorDiv.textContent = "";

    try {
        const data = await apiLogin(user, pass);
        // Store Tokens
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        currentUser = data;
        showDashboard();
    } catch (error) {
        errorDiv.textContent = "Invalid Username or Password!";
    } finally {
        btn.textContent = "Login";
    }
});

document.getElementById('btnLogout').addEventListener('click', logout);

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    currentUser = null;
    showLogin();
}

function showLogin() {
    loginSection.classList.remove('d-none');
    mainSection.classList.add('d-none');
    navbar.classList.add('d-none');
}

async function showDashboard() {
    loginSection.classList.add('d-none');
    mainSection.classList.remove('d-none');
    navbar.classList.remove('d-none');
    
    document.getElementById('userInfo').textContent = `Hello, ${currentUser.firstName}`;
    
    // Load Initial Data
    loadCategories();
    loadProducts();
}

// --- Product Management ---
async function loadProducts(isSearch = false, query = "", isCategory = false, catUrl = "") {
    showLoader(true);
    productsContainer.innerHTML = "";
    
    let data;
    if (isSearch) {
        data = await apiSearchProducts(query);
    } else if (isCategory) {
        data = await apiGetProductsByCategory(catUrl);
    } else {
        data = await apiGetProducts(limit, paginationSkip);
    }

    showLoader(false);
    renderProducts(data.products);
}

function renderProducts(products) {
    if(products.length === 0) {
        productsContainer.innerHTML = "<h5 class='text-center w-100 mt-5'>No products found!</h5>";
        return;
    }

    productsContainer.innerHTML = products.map(product => `
        <div class="col-md-4 col-lg-3">
            <div class="card product-card">
                <img src="${product.thumbnail}" class="card-img-top product-img" alt="${product.title}">
                <div class="card-body d-flex flex-column">
                    <h6 class="card-title text-truncate" title="${product.title}">${product.title}</h6>
                    <p class="card-text text-muted small">${product.category}</p>
                    <div class="mt-auto d-flex justify-content-between align-items-center">
                        <span class="price">$${product.price}</span>
                        <button class="btn btn-sm btn-success" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// --- Category Management ---
async function loadCategories() {
    const categories = await apiGetCategories();
    const select = document.getElementById('categorySelect');
    
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.url; // DummyJSON returns URL in new update
        option.textContent = cat.name;
        select.appendChild(option);
    });
}

document.getElementById('categorySelect').addEventListener('change', (e) => {
    const val = e.target.value;
    if (val === 'all') {
        paginationSkip = 0;
        loadProducts();
    } else {
        loadProducts(false, "", true, val);
    }
});

// --- Search Flow ---
document.getElementById('btnSearch').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value;
    if(query.trim() !== "") {
        loadProducts(true, query);
    } else {
        loadProducts();
    }
});

// --- Pagination Flow ---
document.getElementById('btnNext').addEventListener('click', () => {
    paginationSkip += limit;
    loadProducts();
});

document.getElementById('btnPrev').addEventListener('click', () => {
    if (paginationSkip >= limit) {
        paginationSkip -= limit;
        loadProducts();
    }
});

// --- Cart Management ---
async function addToCart(productId) {
    if(!currentUser) return;
    
    // API Call
    const res = await apiAddToCart(currentUser.id, productId);
    
    if(res) {
        currentCartCount++;
        document.getElementById('cartCount').textContent = currentCartCount;
        alert("Product added to cart successfully!");
    }
}

// --- Utils ---
function showLoader(show) {
    if(show) {
        loader.classList.remove('d-none');
        productsContainer.classList.add('d-none');
    } else {
        loader.classList.add('d-none');
        productsContainer.classList.remove('d-none');
    }
}