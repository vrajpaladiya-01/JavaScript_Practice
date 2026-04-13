let todo = [];

let req = prompt("Please entre your request");

while (true) {
    if(req == "quit"){
        console.log("Quit todo");
        break;
    }

    if(req == "list"){
        console.log("-------------------------------");
        for(let i=0; i<todo.length; i++){
            console.log(i, todo[i]);
        }
        console.log("-------------------------------");
    } else if(req == "add"){
        let task = prompt("Please enter your task you want to add");
        todo.push(task);
        console.log("task added");
    } else if(req == "delete"){
        let idx = prompt("Please enter the task index");
        todo.splice(idx, 1);
        console.log("task is delete");
    } else {
        console.log("Wrong Request");
    }
    
    req = prompt("Please entre your request");
}