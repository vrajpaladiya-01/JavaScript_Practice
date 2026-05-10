let h1 = document.querySelector("h1");
let h3 = document.querySelector("h3");
let p = document.querySelector("p");
let btn = document.querySelector("button");
let inp = document.querySelector("input");

function changeColor(){
    console.dir(this.innerText);
    this.style.backgroundColor = "lightgreen";
}

btn.addEventListener("click", changeColor);
p.addEventListener("click", changeColor);
h1.addEventListener("click", changeColor);
h3.addEventListener("click", changeColor);

inp.addEventListener("keyup", function(event){
    console.log(event);
    console.log("Key release");
})