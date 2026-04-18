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

printPoem();
dices();
printName("Karan");
avg(3, 5, 7);
table(6);