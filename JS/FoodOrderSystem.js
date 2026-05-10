// --- DOM Elements ---
const foodInput = document.getElementById('foodInput');
const outputSection = document.getElementById('outputSection');
const btnCallback = document.getElementById('btnCallback');
const btnPromise = document.getElementById('btnPromise');
const btnReset = document.getElementById('btnReset');

// --- Helper Functions ---

// Renders a message to the UI with optional loading spinners
function renderMessage(message, type, icon, isLoading = false) {
    const alertDiv = document.createElement('div');
    const borderClass = `border-${type}-custom`;
    
    alertDiv.className = `alert status-alert ${borderClass} d-flex align-items-center shadow-sm p-3 m-0 rounded-3`;
    
    let spinnerHtml = isLoading 
        ? `<div class="spinner-border spinner-border-sm text-${type} ms-auto" role="status"></div>` 
        : '';

    alertDiv.innerHTML = `
        <span class="fs-4 me-3">${icon}</span>
        <strong class="text-dark m-0 fs-6">${message}</strong>
        ${spinnerHtml}
    `;
    
    outputSection.appendChild(alertDiv);
    return alertDiv; // Return element so we can remove the spinner later if needed
}

// Clears the UI
function resetUI() {
    foodInput.value = '';
    outputSection.innerHTML = '';
}

// Validation logic
function getValidItem() {
    const item = foodInput.value.trim();
    if (!item) {
        renderMessage("Invalid Order", "danger", "❌");
        return null;
    }
    return item;
}

// ==========================================
// ⚙️ 1. CALLBACK VERSION
// ==========================================

function placeOrder(item, callback) {
    const alertBox = renderMessage(`Order Placed for ${item}`, "info", "📝", true);
    
    setTimeout(() => {
        alertBox.querySelector('.spinner-border').remove(); // Remove spinner when done
        callback(item);
    }, 2000);
}

function prepareOrder(item, callback) {
    const alertBox = renderMessage(`Preparing ${item}...`, "warning", "👨‍🍳", true);
    
    setTimeout(() => {
        alertBox.querySelector('.spinner-border').remove();
        callback(item);
    }, 3000);
}

function deliverOrder(item) {
    setTimeout(() => {
        renderMessage(`${item} Delivered 🚀`, "success", "📦");
    }, 2000);
}

// Trigger Callback Flow
btnCallback.addEventListener('click', () => {
    outputSection.innerHTML = ''; // Clear previous
    const item = getValidItem();
    if (!item) return; // Stop execution if invalid

    // Nested callback flow (Callback Hell structure)
    placeOrder(item, function(passedItem) {
        prepareOrder(passedItem, function(readyItem) {
            deliverOrder(readyItem);
        });
    });
});

// ==========================================
// 🚀 2. PROMISE VERSION
// ==========================================

function placeOrderPromise(item) {
    return new Promise((resolve) => {
        const alertBox = renderMessage(`Order Placed for ${item}`, "info", "📝", true);
        setTimeout(() => {
            alertBox.querySelector('.spinner-border').remove();
            resolve(item);
        }, 2000);
    });
}

function prepareOrderPromise(item) {
    return new Promise((resolve) => {
        const alertBox = renderMessage(`Preparing ${item}...`, "warning", "👨‍🍳", true);
        setTimeout(() => {
            alertBox.querySelector('.spinner-border').remove();
            resolve(item);
        }, 3000);
    });
}

function deliverOrderPromise(item) {
    return new Promise((resolve) => {
        setTimeout(() => {
            renderMessage(`${item} Delivered 🚀`, "success", "📦");
            resolve();
        }, 2000);
    });
}

// Trigger Promise Flow
btnPromise.addEventListener('click', () => {
    outputSection.innerHTML = ''; // Clear previous
    const item = getValidItem();
    if (!item) return; // Stop execution if invalid

    // .then() Chaining without .catch() as requested
    placeOrderPromise(item)
        .then(() => prepareOrderPromise(item))
        .then(() => deliverOrderPromise(item));
});

// --- Reset Button ---
btnReset.addEventListener('click', resetUI);