let h1 = document.querySelector("h1");

function changeColor(color, delay){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            h1.style.color = color;
            resolve("Color change");
        }, delay);
    });
}

changeColor("red", 1000)
.then(() => {
    console.log("change to red");
    return changeColor("orange", 1000);
})
.then(() => {
    console.log("Change to orange");
    return changeColor("lightgreen", 1000);
})
.then(() => {
    console.log("Change to lightgreen");
    return changeColor("green", 1000);
})
.then(() => {
    console.log("Change to green");
    return changeColor("blue", 1000);
})
.then(() => {
    console.log("Change to blue");
});
// function saveDB(data, success, failure){
//     let internetSpeed = Math.floor(Math.random() * 10 + 1);

//     if(internetSpeed > 4){
//         success();
//     } else {
//         failure();
//     }
// }

// saveDB("Gujrat", () => {
//     console.log("Success: data is save");
//     saveDB("Maharastra", () => {
//         console.log("Success2: data is save");
//         saveDB("North India", () => {
//             console.log("Success3: data is save");
//         }, () => {
//             console.log("Failure3: weak connection");
//         });
//     }, () => {
//         console.log("Failure2: weak connection");
//     });
// }, () => {
//     console.log("Failure: weak connection");
// });

// function saveDB(data) {
//     return new Promise((resolve, reject) => {
//         let internetSpeed = Math.floor(Math.random() * 10 + 1);
//         if (internetSpeed > 4) {
//             resolve("Success");
//         } else {
//             reject("Failure");
//         }
//     })
// }



//Nested callback 

// saveDB("Gujrat")
//     .then(() => {
//         console.log("Data1 Saved");
//         saveDB("Surat")
//             .then(() => {
//                 console.log("Data2 Saved");
//             });
//     })
//     .catch(() => {
//         console.log("Promise was rejected");
//     })




// Using Promises

// saveDB("Gujrat")
//     .then(() => {
//         console.log("Data1 Saved");
//         return saveDB("Surat");
//     })
//     .then(() => {
//         console.log("Data2 Saved");
//         return saveDB("Katargam");
//     })
//     .then(() => {
//         console.log("Data3 Saved");
//     })
//     .catch(() => {
//         console.log("Promise was rejected");
//     })