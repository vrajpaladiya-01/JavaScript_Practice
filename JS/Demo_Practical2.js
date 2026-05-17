const API_URL = "https://dummyjson.com";

const loginSection = document.getElementById("login-section");
const dashboardSection = document.getElementById("dashboard-section");

const statusDiv = document.getElementById("status");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");

const userProfile = document.getElementById("user-profile");

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const categorySelect = document.getElementById("category-select");

const productsContainer = document.getElementById("products-container");

const singleProductSection = document.getElementById("single-product-section");
const singleProduct = document.getElementById("single-product");

const closeBtn = document.getElementById("close-btn");

function showMessage(message, isError = false) {
    statusDiv.innerHTML = `<p style="color: ${isError ? 'red' : 'green'}; font-weight: bold;">${message}</p>`;
}

function clearMessage() {
    statusDiv.innerHTML = "";
}

function showDashboard() {
    loginSection.style.display = "none";
    dashboardSection.style.display = "block";
}

function showLogin() {
    loginSection.style.display = "block";
    dashboardSection.style.display = "none";
}

async function loginUser() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        showMessage("Please Enter Username & Password", true);
        return;
    }

    try {
        showMessage("Checking Login...");

        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password,
                expiresInMins: 30
            })
        });

        if (!response.ok) {
            throw new Error("Invalid Login Credentials");
        }

        const data = await response.json();

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        usernameInput.value = "";
        passwordInput.value = "";

        showMessage("Login Successful");

        loadDashboard();

    } catch (error) {
        showMessage(error.message, true);
    }
}

async function refreshAccessToken() {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
        throw new Error("No refresh token found");
    }

    const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            refreshToken: refreshToken,
            expiresInMins: 30
        })
    });

    if (!response.ok) {
        throw new Error("Session completely expired. Please login again.");
    }

    const data = await response.json();

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    return data.accessToken;
}

async function getCurrentUser() {
    let token = localStorage.getItem("accessToken");

    let response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (response.status === 401) {
        console.log("Access token expired. Refreshing...");

        token = await refreshAccessToken();

        response = await fetch(`${API_URL}/auth/me`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    if (!response.ok) {
        throw new Error("Session Expired");
    }

    return await response.json();
}

function renderUser(user) {
    userProfile.innerHTML = `
        <h2 style="margin-top: 0;">
            Welcome ${user.firstName} ${user.lastName}
        </h2>

        <img src="${user.image}" width="100" style="border-radius: 50%; border: 2px solid #ccc;">

        <p><strong>Email :</strong> ${user.email}</p>
        <p><strong>Username :</strong> ${user.username}</p>
        <p><strong>Phone :</strong> ${user.phone}</p>
    `;
}

async function loadCategories() {
    try {
        const response = await fetch(`${API_URL}/products/categories`);
        const categories = await response.json();

        categorySelect.innerHTML = `<option value="">All Categories</option>`;

        categories.forEach((category) => {
            const option = document.createElement("option");
            option.value = category.slug || category;
            option.textContent = category.name || category;
            categorySelect.appendChild(option);
        });

    } catch (error) {
        showMessage(error.message, true);
    }
}

async function fetchProducts(endpoint = "/products") {
    try {
        showMessage("Loading Products...");

        const response = await fetch(`${API_URL}${endpoint}`);

        if (!response.ok) {
            throw new Error("Unable To Fetch Products");
        }

        const data = await response.json();

        renderProducts(data.products);
        clearMessage();

    } catch (error) {
        showMessage(error.message, true);
    }
}

function renderProducts(products) {
    productsContainer.innerHTML = "";

    if (products.length === 0) {
        productsContainer.innerHTML = `<h3>No Products Found</h3>`;
        return;
    }

    products.forEach((product) => {
        const div = document.createElement("div");
        div.style.borderBottom = "1px solid #eee";
        div.style.paddingBottom = "15px";
        div.style.marginBottom = "15px";

        div.innerHTML = `
            <h3 style="margin-bottom: 5px;">${product.title}</h3>

            <img src="${product.thumbnail}" width="150" style="border: 1px solid #ddd; padding: 5px;">

            <p><strong>Price :</strong> $${product.price}</p>
            <p><strong>Category :</strong> ${product.category}</p>
            <p><strong>Rating :</strong> ${product.rating}</p>

            <button onclick="viewProduct(${product.id})">
                View Details
            </button>
        `;

        productsContainer.appendChild(div);
    });
}

window.viewProduct = async function(id) {
    try {
        showMessage("Loading Product Details...");

        const response = await fetch(`${API_URL}/products/${id}`);

        if (!response.ok) {
            throw new Error("Unable To Load Product");
        }

        const product = await response.json();

        renderSingleProduct(product);
        clearMessage();

    } catch (error) {
        showMessage(error.message, true);
    }
}

function renderSingleProduct(product) {
    singleProduct.innerHTML = `
        <h2 style="margin-top: 0;">${product.title}</h2>
        <img src="${product.thumbnail}" width="250" style="border: 1px solid #ccc; padding: 5px;">
        <p><strong>Brand :</strong> ${product.brand || "N/A"}</p>
        <p><strong>Category :</strong> ${product.category}</p>
        <p><strong>Price :</strong> $${product.price}</p>
        <p><strong>Rating :</strong> ${product.rating}</p>
        <p><strong>Description :</strong> ${product.description}</p>
    `;

    singleProductSection.style.display = "block";
}

function logoutUser() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    
    showLogin();

    userProfile.innerHTML = "";
    productsContainer.innerHTML = "";
    categorySelect.innerHTML = `<option value="">All Categories</option>`;
    singleProduct.innerHTML = "";
    singleProductSection.style.display = "none";

    showMessage("Logout Successful");
}

async function loadDashboard() {
    try {
        const user = await getCurrentUser();
        renderUser(user);
        showDashboard();
        loadCategories();
        fetchProducts();
    } catch (error) {
        showMessage(error.message, true);
        logoutUser();
    }
}

loginBtn.addEventListener("click", loginUser);
logoutBtn.addEventListener("click", logoutUser);

searchBtn.addEventListener("click", () => {
    const searchValue = searchInput.value.trim();
    if (searchValue) {
        fetchProducts(`/products/search?q=${searchValue}`);
    } else {
        fetchProducts();
    }
});

categorySelect.addEventListener("change", (event) => {
    const category = event.target.value;
    searchInput.value = "";

    if (category) {
        fetchProducts(`/products/category/${category}`);
    } else {
        fetchProducts();
    }
});

closeBtn.addEventListener("click", () => {
    singleProductSection.style.display = "none";
    singleProduct.innerHTML = "";
});

window.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("accessToken");

    if (token) {
        loadDashboard();
    } else {
        showLogin();
    }
});