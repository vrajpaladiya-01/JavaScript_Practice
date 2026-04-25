let product = null;
let bill = null;

// ================= ADD PRODUCT =================
function addProduct() {
  const name = document.getElementById("name").value.trim();
  const priceInput = document.getElementById("price").value.trim();
  const quantityInput = document.getElementById("quantity").value.trim();

  const errorBox = document.getElementById("productError");
  errorBox.innerText = "";

  let errors = [];

  // Name Validation
  if (!name) {
    errors.push("Product name is required");
  }

  // Price Validation
  const price = Number(priceInput);
  if (!priceInput) {
    errors.push("Price is required");
  } else if (isNaN(price) || price <= 0) {
    errors.push("Enter valid price (> 0)");
  }

  // Quantity Validation
  const quantity = Number(quantityInput);
  if (!quantityInput) {
    errors.push("Quantity is required");
  } else if (isNaN(quantity) || quantity <= 0) {
    errors.push("Enter valid quantity (> 0)");
  }

  // Show Errors
  if (errors.length > 0) {
    errorBox.innerText = errors.join("\n");
    return;
  }

  // Create Product Object
  product = {
    name: name.toUpperCase(),
    price,
    quantity
  };

  // Clear Inputs
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("quantity").value = "";

  alert("Product Added Successfully ✅");
}

// ================= CALCULATE BILL =================
function calculateBill() {
  if (!product) {
    alert("Please add product first ❗");
    return;
  }

  // Total
  let total = product.price * product.quantity;
  total = Number(total.toFixed(2));

  // Discount Calculation
  let discount = 0;

  if (total > 5000) {
    discount = total * 0.20;
  } else if (total > 2000) {
    discount = total * 0.10;
  }

  discount = Math.round(discount);

  const afterDiscount = total - discount;

  // Tax Calculation (18% GST)
  let tax = afterDiscount * 0.18;
  tax = Math.ceil(tax);

  const finalAmount = afterDiscount + tax;

  // Bill Object
  bill = {
    productName: product.name,
    total,
    discount,
    tax,
    finalAmount
  };

  alert("Bill Calculated Successfully ✅");
}

// ================= SHOW BILL =================
function showBill() {
  if (!bill) {
    alert("Please calculate bill first ❗");
    return;
  }

  document.getElementById("output").innerHTML = `
    <p><strong>Product:</strong> ${bill.productName}</p>
    <p><strong>Total:</strong> ₹${bill.total}</p>
    <p><strong>Discount:</strong> ₹${bill.discount}</p>
    <p><strong>Tax (18%):</strong> ₹${bill.tax}</p>
    <hr>
    <p><strong>Final Amount:</strong> ₹${bill.finalAmount}</p>
  `;
}

// ================= EXIT =================
function exitApp() {
  product = null;
  bill = null;

  // Clear UI
  document.getElementById("output").innerHTML = "";
  document.getElementById("productError").innerText = "";

  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("quantity").value = "";

  alert("System Reset 🔄");
}