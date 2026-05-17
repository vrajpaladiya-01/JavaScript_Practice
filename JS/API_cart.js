// cart.js

// શરુઆતમાં LocalStorage માંથી ડેટા મેળવો (જો ન હોય તો ખાલી એરે [])
let cartItems = JSON.parse(localStorage.getItem('myCartData')) || [];

const cartContainer = document.getElementById("cartContainer");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");
const shippingEl = document.getElementById("shippingFee");
const cartItemCount = document.getElementById("cartItemCount");

const SHIPPING_COST = 10.00;

document.addEventListener("DOMContentLoaded", () => {
    // ડેમો માટે જો કાર્ટ ખાલી હોય તો એક ડેમો પ્રોડક્ટ ઉમેરીએ (તમે આ કાઢી શકો છો)
    if (cartItems.length === 0) {
        cartItems = [
            { id: 1, title: "Premium Wireless Headphones", price: 120.00, quantity: 1, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80" },
            { id: 2, title: "Smart Fitness Watch", price: 89.00, quantity: 2, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80" }
        ];
        saveCart();
    }
    renderCart();
});

// કાર્ટ UI માં બતાવો
function renderCart() {
    cartContainer.innerHTML = "";
    
    // શરૂઆતની વેલ્યુ 0 સેટ કરવા અને અપડેટ કરવા
    cartItemCount.innerText = cartItems.length; 

    if (cartItems.length === 0) {
        cartContainer.innerHTML = `
            <div class="text-center p-5 bg-white rounded-4 shadow-sm">
                <i class="fa-solid fa-cart-shopping text-muted mb-3" style="font-size: 4rem;"></i>
                <h4 class="fw-bold text-muted">તમારું કાર્ટ ખાલી છે!</h4>
                <p class="text-muted">કૃપા કરીને પ્રોડક્ટ્સ ઉમેરો.</p>
            </div>
        `;
        updateSummary();
        return;
    }

    cartItems.forEach((item, index) => {
        const itemHTML = `
            <div class="cart-card d-flex align-items-center position-relative">
                <div class="cart-img-box me-3">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                
                <div class="flex-grow-1">
                    <h5 class="fw-bold mb-1 text-truncate" style="max-width: 250px;">${item.title}</h5>
                    <h5 class="text-success fw-bold mb-0">$${item.price.toFixed(2)}</h5>
                </div>
                
                <div class="d-flex align-items-center bg-light rounded-pill px-2 py-1 mx-3 border">
                    <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
                    <input type="text" class="qty-input" value="${item.quantity}" readonly>
                    <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
                </div>
                
                <div class="ms-3">
                    <h5 class="fw-bold mb-0" style="width: 80px; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</h5>
                </div>
                
                <button class="delete-btn ms-4" onclick="deleteItem(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        cartContainer.innerHTML += itemHTML;
    });

    updateSummary();
}

// કોન્ટીટી (+ / -) અપડેટ કરવા
function updateQty(index, change) {
    if (cartItems[index].quantity + change > 0) {
        cartItems[index].quantity += change;
        saveCart();
        renderCart();
    } else {
        // જો 1 થી ઓછી થાય તો કાઢી નાખવું હોય તો અહી deleteItem(index) કોલ કરી શકાય
        showNotification("Quantity cannot be less than 1", "warning");
    }
}

// પ્રોડક્ટ ડીલીટ કરવા
function deleteItem(index) {
    cartItems.splice(index, 1);
    saveCart();
    renderCart();
    showNotification("Product removed from cart! 🗑️", "danger");
}

// ભાવ ગણતરી (Subtotal & Total)
function updateSummary() {
    let sub = 0;
    cartItems.forEach(item => {
        sub += item.price * item.quantity;
    });

    subtotalEl.innerText = `$${sub.toFixed(2)}`;
    
    if (sub > 0) {
        shippingEl.innerText = `$${SHIPPING_COST.toFixed(2)}`;
        totalEl.innerText = `$${(sub + SHIPPING_COST).toFixed(2)}`;
    } else {
        shippingEl.innerText = `$0.00`;
        totalEl.innerText = `$0.00`;
    }
}

// LocalStorage માં ડેટા સેવ કરવા
function saveCart() {
    localStorage.setItem('myCartData', JSON.stringify(cartItems));
}

// સુંદર નોટિફિકેશન બતાવવા માટે 
function showNotification(msg, colorType = "dark") {
    const notif = document.createElement("div");
    notif.className = `position-fixed bottom-0 end-0 m-4 p-3 bg-${colorType} text-white rounded-3 shadow-lg`;
    notif.style.zIndex = "9999";
    notif.innerHTML = `<strong>${msg}</strong>`;
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.opacity = "0";
        notif.style.transition = "opacity 0.5s ease";
        setTimeout(() => notif.remove(), 500);
    }, 2000);
}