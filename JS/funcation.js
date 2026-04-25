function printPoem() {
    console.log("Twinkle Twinkle, little star");
    console.log("how T wounder what you are!");
    console.log("Up above the world do high");
    console.log("Like a dimond in the sky");
}

function dices(){
    let random = Math.floor(Math.random() * 6) + 1;
    console.log(`DICES VALUE : ${random}`);
}

function printName(name) {
    console.log(`Hello ${name}`);
}

function avg(a, b, c) {
    console.log(`Average ${(a+b+c)/3}`);
}

function table(no) {
    for(let i=1; i<=10; i++){
        let mul = no * i;
        console.log(`${no} * ${i} = ${mul}`);
    }
}



// String Concat
let str = ["Uttsav", " ", " ", "Parekhya"];

function arr(str){
    let result = "";

    for(let i=0; i<str.length; i++){
        result += str[i];
    }

    return result;
}

// Sum of 1 to n
function sum(n){
    let s = 0;
    for(let i=1; i<=n; i++){
        s += i;
    }

    return s;
}


// Scope

let sum1 = 54;  // Global scope

function calSum(a, b){
    let sum1 = a + b;   // Funcation scope
    console.log(sum1);
}
calSum(2, 4);
console.log(sum1);




// console.log(sum(10));
// printPoem();
// dices();
// printName("Karan");
// avg(3, 5, 7);
// table(6);