let attempts = 0;

function atmMenu(){
    let balance = 5000;
    let choice;

    do{
        choice = Number(prompt(
            "ATM menu: \n" + 
            "1. Check Balance: \n" +
            "2. Deposite Money: \n" +
            "3. Withdraw Money: \n" +
            "4. Exit \n\n" +
            "Enter your chice: "
        ));

        switch(choice){
            case 1:
                alert(`Your balance : ${balance}`);
                break;
            case 2:
                let deposite = Number(prompt("Enter your deposite amount :"));
                if(deposite > 0){
                    balance += deposite;
                    alert("Deposite Successfull");
                } else {
                    alert("Insufficient Amount");
                }
                break;
            case 3:
                let withdraw = Number(prompt(`Enter the withdraw amount : `));
                if(withdraw > 0 && withdraw <= balance){
                    balance -= withdraw;
                    alert("Withdraw Sucessfull");
                }
                else {
                    alert("Invalid amount");
                }
                break;
            case 4:
                alert("Thank you for using atm");
                break;
            default:
                alert("Please enter the 1 to 4 number");
        }
    } while(choice !== 4)
}

function atm(){
    let AC = 1234509876;
    let PIN = 1234;

    let accountNumber = Number(document.getElementById("ac").value);
    let Pin = Number(document.getElementById("pin").value);
    let result = document.getElementById("ans");

    while(attempts >= 3){
        result.innerHTML = "Your account is temporary block";
        return;
    }

    if(!accountNumber || !Pin){
        result.innerHTML = "Please enter AC.no or Pin";
        return;
    }
    else if(accountNumber === AC && Pin === PIN){
        result.innerHTML = "Login Successful";
        attempts = 0;
        atmMenu();
    }
     else {
        attempts++;

        if(attempts >= 3){
            result.innerHTML = "Your account is temporary block";
        }
        else {
            result.innerHTML = `Wrong details. Attempts left ${3 - attempts}`;
        }
    }
}