function submit(){
    const name = document.getElementById("nm").value.trim().toUpperCase();
    const email = document.getElementById("mail").value.trim().toLowerCase();
    const pass = document.getElementById("pw").value.trim();
    const string = document.getElementById("str").value.trim();
    let strlen = string.length;
    const result = document.getElementById("ans");
    let rev = "";
    let count = 0;

    if(!name || !email || !pass || ! string){
        result.innerHTML = "Please fill up the form details";
        return;
    }
    else if(!email.includes("@gmail.com") || email.includes(" ")){
        result.innerHTML = "Please enter the valid email address";
        return false;
    }
    else if(pass.length < 8 || pass.includes(" ")){
        result.innerHTML = "Weak Password";
        return false;
    }
    else {
        result.innerHTML = "Submit your form";
    }

    for(let i=string.length-1; i>=0; i--){
        rev += string[i];
    }                        

    result.innerHTML = `
        <b>Hello ${name}</b> 👋 <br><br>
        ✅ Email Verified <br>
        🔐 Password: Strong <br><br>

        <b>Sentence Analysis:</b><br>
        Characters: ${strlen} <br>
        Reverse: ${rev} <br><br>

        <button onclick="showMenu()">Menu</button>
    `;
}

function showMenu(){
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

        switch(choice){
            case 1:
                alert("Uppercase : " + str.toUpperCase());
                break;
            case 2:
                alert("Lowercase : " + str.toLowerCase());
                break;
            case 3:
                let oldWord = prompt("Enter word to replace");
                let newWord = prompt("Enter new word");
                str = str.replace(oldWord, newWord);
                alert("Updated String : " + str);
                break;
            case 4:
                let checkWord = prompt("Enter word to check");
                if(str.includes(checkWord)){
                    alert("Word is exist");
                }
                else {
                    alert("Word not found");
                }
                break;
            case 5:
                alert("Exit...");
                break;
            default:
                alert("Invalid choice");
        }
    }while(choice != 5);
}