function submit() {
    const name = document.getElementById("nm").value.trim().toUpperCase();
    const email = document.getElementById("mail").value.trim().toLowerCase();
    const pass = document.getElementById("pw").value.trim();
    const string = document.getElementById("str").value.trim();
    const result = document.getElementById("ans");

    let strlen = string.length;
    let rev = "";
    let vowels = 0;

    // Count vowels
    for (let ch of string.toLowerCase()) {
        if ("aeiou".includes(ch)) {
            vowels++;
        }
    }

    // Word count
    let words = string === "" ? 0 : string.split(" ").length;

    // Password must contain at least 1 number
    let hasNumber = /\d/.test(pass);    

    // Validation
    if (!name || !email || !pass || !string) {
        result.innerHTML = "❌ Please fill all details";
        return;
    }

    if (!email.includes("@gmail.com") || email.includes(" ")) {
        result.innerHTML = "❌ Invalid Email";
        return;
    }

    if (pass.length < 8 || pass.includes(" ") || !hasNumber) {
        result.innerHTML = "❌ Password must be 8+ chars & contain 1 number";
        return;
    }

    // Reverse string
    for (let i = string.length - 1; i >= 0; i--) {
        rev += string[i];
    }

    // Output
    result.innerHTML = `
        <b>Hello ${name}</b> 👋 <br><br>
        ✅ Email Verified <br>
        🔐 Password: Strong <br><br>

        <b>Sentence Analysis:</b><br>
        🔤 Characters: ${strlen} <br>
        📝 Words: ${words} <br>
        🔡 Vowels: ${vowels} <br>
        🔁 Reverse: ${rev} <br><br>

        <button onclick="showMenu()">Menu</button>
    `;
}

// MENU FUNCTION
function showMenu() {
    let str = document.getElementById("str").value;
    let choice;

    do {
        choice = Number(prompt(
            "Menu:\n" +
            "1. Convert to Uppercase\n" +
            "2. Convert to Lowercase\n" +
            "3. Replace a word\n" +
            "4. Check word exists\n" +
            "5. Exit\n\n" +
            "Enter choice:"
        ));

        switch (choice) {
            case 1:
                alert("Uppercase: " + str.toUpperCase());
                break;

            case 2:
                alert("Lowercase: " + str.toLowerCase());
                break;

            case 3:
                let oldWord = prompt("Enter word to replace:");
                let newWord = prompt("Enter new word:");
                str = str.replace(oldWord, newWord);
                alert("Updated String: " + str);
                break;

            case 4:
                let checkWord = prompt("Enter word to check:");
                if (str.includes(checkWord)) {
                    alert("✅ Word exists");
                } else {
                    alert("❌ Word not found");
                }
                break;

            case 5:
                alert("Exit...");
                break;

            default:
                alert("Invalid choice");
        }

    } while (choice !== 5);
}