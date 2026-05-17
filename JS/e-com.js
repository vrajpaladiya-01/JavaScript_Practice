// api.js

const BASE_URL = 'https://dummyjson.com';

// ----------------------------------------------------
// 🔐 AUTHENTICATION FLOW
// ----------------------------------------------------

async function apiLogin(username, password) {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password,
                expiresInMins: 60, // Refresh token flow માટે
            })
        });
        
        if (!response.ok) throw new Error("Invalid credentials");
        return await response.json();
    } catch (error) {
        throw error;
    }
}

async function apiGetMe() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${BASE_URL}/auth/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });
        if (!response.ok) throw new Error("Token expired or invalid");
        return await response.json();
    } catch (error) {
        throw error;
    }
}

// ----------------------------------------------------
// 🛍️ PRODUCTS & CATEGORIES
// ----------------------------------------------------

async function apiGetProducts(limit = 10, skip = 0) {
    try {
        const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

async function apiSearchProducts(query) {
    try {
        const response = await fetch(`${BASE_URL}/products/search?q=${query}`);
        return await response.json();
    } catch (error) {
        console.error("Error searching products:", error);
    }
}

async function apiGetCategories() {
    try {
        const response = await fetch(`${BASE_URL}/products/categories`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

async function apiGetProductsByCategory(categoryUrl) {
    try {
        const response = await fetch(categoryUrl);
        return await response.json();
    } catch (error) {
        console.error("Error fetching category products:", error);
    }
}

// ----------------------------------------------------
// 🛒 CART MANAGEMENT (Simulation)
// ----------------------------------------------------

async function apiAddToCart(userId, productId) {
    try {
        const response = await fetch(`${BASE_URL}/carts/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: userId,
                products: [{ id: productId, quantity: 1 }]
            })
        });
        return await response.json();
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
}