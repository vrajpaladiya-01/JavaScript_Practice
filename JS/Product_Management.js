/** * Product Management System Core Logic 
 */

// 1. Array to store products
let products = [];
let nextId = 1;

// Bonus: Add sample data for testing
function loadSampleData() {
    addProduct("Laptop", 1200, 5);
    addProduct("Smartphone", 800, 10);
    addProduct("Headphones", 150, 20);
    addProduct("Gaming Monitor", 1050, 8);
    viewProducts();
}

// -----------------------------------------------------------------
// CORE FEATURES (Array Methods)
// -----------------------------------------------------------------

// Add Product -> push()
function addProduct(name, price, quantity) {
    const newProduct = {
        id: nextId++,
        name: name.trim(),
        price: parseFloat(price),
        quantity: parseInt(quantity)
    };
    products.push(newProduct);
    return true;
}

// View Products -> forEach() (Used inside renderTable function)
function viewProducts() {
    renderTable(products);
    showMessage("Showing all products ✅", "success");
}

// Search Product by Name -> includes() and filter()
function searchProduct(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    const results = products.filter(product => 
        product.name.toLowerCase().includes(term)
    );
    renderTable(results);
    
    if (results.length > 0) {
        showMessage(`Found ${results.length} product(s) ✅`, "success");
    } else {
        showMessage("Product Not Found ❌", "danger");
    }
}

// Find Product by ID -> find()
function findProduct(id) {
    const product = products.find(p => p.id === parseInt(id));
    if (product) {
        renderTable([product]);
        showMessage(`Product Found: ${product.name} ✅`, "success");
    } else {
        showMessage("Product Not Found ❌", "danger");
    }
}

// Filter Expensive Products -> filter()
function filterExpensiveProducts() {
    const expensiveProducts = products.filter(p => p.price > 1000);
    renderTable(expensiveProducts);
    showMessage("Showing expensive products (> $1000) ✅", "success");
}

// Update Product Price -> find()
function updateProduct(id, newPrice) {
    const product = products.find(p => p.id === parseInt(id));
    if (product) {
        product.price = parseFloat(newPrice);
        viewProducts();
        showMessage("Product Updated Successfully ✅", "success");
    } else {
        showMessage("Product Not Found ❌", "danger");
    }
}

// Delete Product -> filter()
function deleteProduct(id) {
    const initialLength = products.length;
    products = products.filter(p => p.id !== parseInt(id));
    
    if (products.length < initialLength) {
        viewProducts();
        showMessage("Product Deleted Successfully ✅", "success");
    } else {
        showMessage("Product Not Found ❌", "danger");
    }
}

// Transform Product Names -> map()
function getUppercaseNames() {
    const uppercaseProducts = products.map(p => ({
        ...p, // keep other properties
        name: p.name.toUpperCase()
    }));
    renderTable(uppercaseProducts);
    showMessage("Showing Uppercase Names ✅", "success");
}

// Calculate Total Inventory Value -> reduce()
function getTotalInventoryValue() {
    const totalValue = products.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    document.getElementById("totalValueBadge").innerText = `Total: $${totalValue.toFixed(2)}`;
    showMessage(`Total Inventory Value Calculated ✅`, "success");
}

// -----------------------------------------------------------------
// UI HANDLERS & VALIDATION
// -----------------------------------------------------------------

function handleAddProduct() {
    const name = document.getElementById("addName").value;
    const price = document.getElementById("addPrice").value;
    const qty = document.getElementById("addQty").value;

    // Validation
    if (!name || isNaN(price) || isNaN(qty) || price <= 0 || qty < 0) {
        showMessage("Invalid input. Please provide valid name, price, and quantity ❌", "danger");
        return;
    }

    addProduct(name, price, qty);
    
    // Clear inputs
    document.getElementById("addName").value = "";
    document.getElementById("addPrice").value = "";
    document.getElementById("addQty").value = "";

    viewProducts();
    showMessage("Product Added Successfully ✅", "success");
}

function handleFindProduct() {
    const id = document.getElementById("targetId").value;
    if (!id) return showMessage("Please enter an ID ❌", "warning");
    findProduct(id);
}

function handleUpdateProduct() {
    const id = document.getElementById("targetId").value;
    const price = document.getElementById("updatePrice").value;
    
    if (!id || !price || isNaN(price) || price <= 0) {
        return showMessage("Please enter a valid ID and new Price ❌", "warning");
    }
    updateProduct(id, price);
}

function handleDeleteProduct() {
    const id = document.getElementById("targetId").value;
    if (!id) return showMessage("Please enter an ID ❌", "warning");
    deleteProduct(id);
}

function handleSearchProduct() {
    const term = document.getElementById("searchInput").value;
    if (!term) return showMessage("Please enter a search term ❌", "warning");
    searchProduct(term);
}

// -----------------------------------------------------------------
// DOM UTILITIES
// -----------------------------------------------------------------

// Renders the array to the HTML table using forEach()
function renderTable(productArray) {
    const tbody = document.getElementById("productTableBody");
    tbody.innerHTML = ""; // Clear existing rows

    if (productArray.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="text-center text-muted">No products to display.</td></tr>`;
        return;
    }

    productArray.forEach(product => {
        const row = `<tr>
            <td>${product.id}</td>
            <td class="fw-bold">${product.name}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.quantity}</td>
        </tr>`;
        tbody.innerHTML += row;
    });

    // Automatically update the total value badge whenever we render
    getTotalInventoryValue();
}

// Displays user-friendly Bootstrap alerts
function showMessage(message, type) {
    const msgBox = document.getElementById("messageBox");
    msgBox.className = `alert alert-${type} alert-dismissible fade show`;
    msgBox.innerHTML = message;
    msgBox.classList.remove("d-none");

    // Auto-hide after 3 seconds
    setTimeout(() => {
        msgBox.classList.add("d-none");
    }, 3000);
}

// Initialize application
window.onload = loadSampleData;