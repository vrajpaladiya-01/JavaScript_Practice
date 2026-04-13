const favMovie = "avatar";
let guess = prompt("Guess my favourite movie");

while( (guess != favMovie) && (guess != "quit") ){
    guess = prompt("Wrog guess. Please try again");
}

if(guess == favMovie){
    console.log("Congrats!");
}
else{
    console.log("you quit the game");
}