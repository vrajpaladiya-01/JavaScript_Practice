function validateEmail(email) {
  return email.includes("@") && email.includes(".") && !email.includes(" ");
}

function checkPasswordStrength(password) {
  let hasNumber = false;

  for (let i = 0; i < password.length; i++) {
    if (!isNaN(password[i])) {
      hasNumber = true;
      break;
    }
  }

  return (password.length >= 8 && hasNumber);
}

function formatName(name) {
  return name.trim().toUpperCase();
}

function analyzeText(text) {
  let characters = text.length;
  let words = text.trim().split(/\s+/).filter(w => w !== "").length;

  let vowels = 0;
  let vowelSet = "aeiouAEIOU";

  for (let i = 0; i < text.length; i++) {
    if (vowelSet.includes(text[i])) vowels++;
  }

  let reversed = text.split("").reverse().join("");

  return { characters, words, vowels, reversed };
}

function calculator(num1, num2, operator) {
  switch (operator) {
    case "+": return num1 + num2;
    case "-": return num1 - num2;
    case "*": return num1 * num2;
    case "/": return num2 === 0 ? "Cannot divide by zero" : num1 / num2;
    default: return "Invalid Operator";
  }
}

// 🔐 LOGIN
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const output = document.getElementById("output");

  if (!validateEmail(email)) {
    output.innerText = "Invalid Email";
    return;
  }

  if (!checkPasswordStrength(password)) {
    output.innerText = "Weak Password (min 8 chars + number)";
    return;
  }

  output.innerText = "Login Successful";

  // SHOW MAIN MENU
  document.getElementById("mainMenu").style.display = "block";
}

// 🔁 MENU LOOP SYSTEM
function runOption(choice) {
  const input1 = document.getElementById("input1").value;
  const input2 = document.getElementById("input2").value;
  const operator = document.getElementById("operator").value;
  const output = document.getElementById("output");

  let result;

  switch (choice) {

    case 1:
      result = formatName(input1);
      output.innerText = "Formatted Name: " + result;
      break;

    case 2:
      result = validateEmail(input1);
      output.innerText = result ? "Valid Email" : "Invalid Email";
      break;

    case 3:
      result = checkPasswordStrength(input1);
      output.innerText = result ? "Strong Password" : "Weak Password";
      break;

    case 4:
      result = analyzeText(input1);
      output.innerText =
        `Characters: ${result.characters}
Words: ${result.words}
Vowels: ${result.vowels}
Reversed: ${result.reversed}`;
      break;

    case 5:
      result = calculator(Number(input1), Number(input2), operator);
      output.innerText = "Result: " + result;
      break;

    default:
      output.innerText = "Invalid Choice";
  }
}

// 🚪 EXIT
function exitApp() {
  document.getElementById("mainMenu").style.display = "none";
  document.getElementById("output").innerText = "You exited the menu.";
}