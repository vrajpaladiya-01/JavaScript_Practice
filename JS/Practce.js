// ==========================================
// 🍕 VS PIZZA HUT: FOOD ORDER SYSTEM
// ==========================================

// ------------------------------------------
// 👉 PART 1: CALLBACK IMPLEMENTATION
// ------------------------------------------

function placeOrder(item, callback) {
  // Basic Validation: જો આઇટમ ખાલી હોય તો
  if (!item || item.trim() === "") {
    console.log("Invalid Order");
    return; // ઓર્ડર પ્રોસેસ નહીં થાય
  }

  // 2 સેકન્ડનો ડીલે
  setTimeout(() => {
    console.log(`Order Placed for ${item} at VS Pizza Hut`);
    callback(item);
  }, 2000); 
}

function prepareOrder(item, callback) {
  // 3 સેકન્ડનો ડીલે
  setTimeout(() => {
    console.log(`Preparing ${item}...`);
    callback(item);
  }, 3000); 
}

function deliverOrder(item) {
  // 2 સેકન્ડનો ડીલે
  setTimeout(() => {
    console.log(`${item} Delivered 🚀`);
  }, 2000); 
}

// --- Callback Execution Flow ---
console.log("--- Starting Callback Flow ---");

// ખાલી આઇટમ ચેક કરવા (આનાથી "Invalid Order" પ્રિન્ટ થશે)
// placeOrder("", (item) => { prepareOrder(item, (item) => { deliverOrder(item); }); });

placeOrder("Pizza", (item) => {
  prepareOrder(item, (item) => {
    deliverOrder(item);
  });
});


// ------------------------------------------
// 👉 PART 2: PROMISE IMPLEMENTATION
// ------------------------------------------

function placeOrderPromise(item) {
  return new Promise((resolve) => {
    // Basic Validation
    if (!item || item.trim() === "") {
      console.log("Invalid Order");
      return; // .catch() નો ઉપયોગ નથી કરવાનો એટલે માત્ર return કર્યું છે
    }

    setTimeout(() => {
      console.log(`Order Placed for ${item} at VS Pizza Hut`);
      resolve(item);
    }, 2000);
  });
}

function prepareOrderPromise(item) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Preparing ${item}...`);
      resolve(item);
    }, 3000);
  });
}

function deliverOrderPromise(item) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`${item} Delivered 🚀`);
      resolve(item); // ભવિષ્યમાં આગળ ચેઇનિંગ કરવું હોય તો 
    }, 2000);
  });
}

// --- Promise Execution Flow ---
// Callback ફ્લો પૂરો થાય (લગભગ 7 સેકન્ડ) ત્યારબાદ Promise ફ્લો શરૂ થાય તે માટે મેં તેને setTimeout માં મૂક્યું છે.
setTimeout(() => {
  console.log("\n--- Starting Promise Flow ---");
  
  placeOrderPromise("Pizza")
    .then((item) => prepareOrderPromise(item))
    .then((item) => deliverOrderPromise(item));

}, 8000);