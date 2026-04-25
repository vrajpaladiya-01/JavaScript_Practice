let user = null;

// Section Control
function showSection(id) {
  document.getElementById("registerSection").classList.add("hidden");
  document.getElementById("loginSection").classList.add("hidden");
  document.getElementById("menuSection").classList.add("hidden");

  document.getElementById(id).classList.remove("hidden");
}

// ================= REGISTER =================
function registerUser() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let age = document.getElementById("age").value.trim();

  // Reset errors
  document.querySelectorAll(".error").forEach(e => e.innerText = "");

  let valid = true;

  if (!name) {
    document.getElementById("nameError").innerText = "Name is required";
    valid = false;
  }

  if (!email) {
    document.getElementById("emailError").innerText = "Email is required";
    valid = false;
  } else if (!email.includes("@") || !email.includes(".")) {
    document.getElementById("emailError").innerText = "Invalid Email";
    valid = false;
  }

  if (!password) {
    document.getElementById("passwordError").innerText = "Password is required";
    valid = false;
  } else if (password.length < 8 || !/\d/.test(password)) {
    document.getElementById("passwordError").innerText =
      "Password must be 8 chars & include number";
    valid = false;
  }

  if (!age) {
    document.getElementById("ageError").innerText = "Age is required";
    valid = false;
  } else if (age <= 0) {
    document.getElementById("ageError").innerText = "Invalid Age";
    valid = false;
  }

  if (!valid) return;

  user = {
    name,
    email,
    password,
    age,
    isLoggedIn: false
  };

  alert("User Registered Successfully ✅");
  showSection("loginSection");
}

// ================= LOGIN =================
function loginUser() {
  let email = document.getElementById("loginEmail").value.trim();
  let password = document.getElementById("loginPassword").value.trim();

  document.getElementById("loginEmailError").innerText = "";
  document.getElementById("loginPasswordError").innerText = "";

  if (!email) {
    document.getElementById("loginEmailError").innerText = "Email required";
    return;
  }

  if (!password) {
    document.getElementById("loginPasswordError").innerText = "Password required";
    return;
  }

  if (email !== user.email) {
    document.getElementById("loginEmailError").innerText = "Email not valid";
    return;
  }

  if (password !== user.password) {
    document.getElementById("loginPasswordError").innerText = "Password not valid";
    return;
  }

  user.isLoggedIn = true;
  alert("Login Successful ✅");

  showSection("menuSection");
}

// ================= MENU =================
function showProfile() {
  document.getElementById("output").innerHTML = `
    <p><b>Name:</b> ${user.name}</p>
    <p><b>Email:</b> ${user.email}</p>
    <p><b>Age:</b> ${user.age}</p>
    <p><b>Status:</b> Logged In</p>
  `;
}

function updateUser() {
  let field = prompt("Enter field (name/email/password/age):");
  let value = prompt("Enter new value:");

  if (!field || !value) return;

  user[field] = value;
  alert("Updated Successfully");
}

function deleteProperty() {
  let key = prompt("Enter property to delete:");
  if (!key) return;

  delete user[key];
  alert("Deleted Successfully");
}

function textAnalysis() {
  let text = prompt("Enter text:");
  if (!text) return;

  let vowels = text.match(/[aeiou]/gi);
  let result = {
    characters: text.length,
    words: text.split(" ").length,
    vowels: vowels ? vowels.length : 0
  };

  document.getElementById("output").innerHTML = `
    <p>Characters: ${result.characters}</p>
    <p>Words: ${result.words}</p>
    <p>Vowels: ${result.vowels}</p>
  `;
}

// ================= EXIT =================
function exitApp() {
  user.isLoggedIn = false;
  user = null;

  showSection("registerSection");
}