let marks = [];

// ================= ADD MARK =================
function addMark() {
  const input = document.getElementById("markInput").value.trim();
  const errorBox = document.getElementById("error");

  errorBox.innerText = "";

  const mark = Number(input);

  if (!input) {
    errorBox.innerText = "Mark is required";
    return;
  }

  if (isNaN(mark) || mark < 0 || mark > 100) {
    errorBox.innerText = "Enter valid mark (0-100)";
    return;
  }

  marks.push(mark);

  document.getElementById("markInput").value = "";
  alert("Mark Added ✅");
}

// ================= VIEW MARKS =================
function viewMarks() {
  const output = document.getElementById("output");

  if (marks.length === 0) {
    output.innerHTML = "<p>No marks available</p>";
    return;
  }

  let list = "<ul>";
  for (let mark of marks) {
    list += `<li>${mark}</li>`;
  }
  list += "</ul>";

  output.innerHTML = list;
}

// ================= REMOVE LAST MARK =================
function removeMark() {
  if (marks.length === 0) {
    alert("No marks to remove ❗");
    return;
  }

  const removed = marks.pop();
  alert(`Removed: ${removed}`);
}

// ================= FIND MARK =================
function findMark() {
  if (marks.length === 0) {
    alert("No marks available ❗");
    return;
  }

  const value = Number(prompt("Enter mark to find:"));

  if (isNaN(value)) {
    alert("Invalid input ❗");
    return;
  }

  if (marks.includes(value)) {
    alert("Mark Found ✅");
  } else {
    alert("Mark Not Found ❌");
  }
}

// ================= SHOW RESULT =================
function showResult() {
  if (marks.length === 0) {
    alert("No marks available ❗");
    return;
  }

  let total = 0;

  for (let m of marks) {
    total += m;
  }

  const avg = total / marks.length;

  const result = avg >= 40 ? "Pass ✅" : "Fail ❌";

  document.getElementById("output").innerHTML = `
    <p><b>Total:</b> ${total}</p>
    <p><b>Average:</b> ${avg.toFixed(2)}</p>
    <p><b>Result:</b> ${result}</p>
  `;
}

// ================= EXIT =================
function exitApp() {
  marks = [];
  document.getElementById("output").innerHTML = "";
  document.getElementById("markInput").value = "";
  document.getElementById("error").innerText = "";

  alert("System Reset 🔄");
}