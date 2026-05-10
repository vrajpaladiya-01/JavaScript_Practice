let form = document.querySelector("form");

form.addEventListener("submit", function(event){
    event.preventDefault();
    
    let inp = document.querySelector("input");
    console.dir(inp);
    console.log(inp.value);
    
});

let inp = document.querySelector("#text");
let p = document.querySelector("p");

inp.addEventListener("input", function(){
    console.log(inp.value);
    p.innerHTML = inp.value;
});