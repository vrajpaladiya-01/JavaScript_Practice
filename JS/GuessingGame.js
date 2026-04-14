const max = prompt("Enter the maximum number ");

const random = Math.floor(Math.random() * max) + 1;

let guess = prompt("Guess the number");

while(true){
    if(guess == "quit"){
        console.log("User quit game");
        break;
    }
    
    if(guess == random){
        console.log("Congrates! Number is " + random);
        break;
    } else if(guess < random){
        guess = prompt("hint: Guessing number is too small. Please try again...");
    } else if(guess > random){
        guess = prompt("hint: Guessing number is too large. Please try again...");
    }
}