const div = document.querySelector("div");
const ul = document.querySelector("ul");
const lis = document.querySelectorAll("li");

div.addEventListener("click", function(){
    console.log("div was click");
});

ul.addEventListener("click", function(event){
    event.stopPropagation();
    console.log("ul was click");
});

for (li of lis){
    li.addEventListener("click", function(event){
        event.stopPropagation();
        console.log("li was click");
    });
}