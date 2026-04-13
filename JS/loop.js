// for(let i=0; i<5; i++){
//     if(i == 3){
//         console.log("Break statement");
//         break;
//     }
//     console.log(i);
// }

// console.log("Array with Loops");
// const arr = [10, 20, 30];
// for(let i=0; i<arr.length; i++){
//     console.log(arr[i]);
// }

// let heros = [["tronman", "spiderman", "thor"], ["superman", "wonder woman", "flash"]];

// for(let i=0; i<heros.length; i++){
//     for(let j=0; j<heros[i].length; j++){
//         console.log(`j = ${j}, ${heros[i][j]}`);
//     }
// }


// let fruits = ["Mango", "Apple", "Banana", "Litchi", "Orange"];

// for(fruit of fruits){
//     console.log(fruit);
// }

// for(char of "HelloWorld"){
//     console.log(char);
// }

// let ani = [["dog", "cat", "rabbit"], ["wolf", "tiger", "lion"]];

// for(list of ani){
//     for(nm of list){
//         console.log(nm);
//     }
// }



// Remove Element

// let arr1 = [1, 2, 3, 4, 5, 6, 2, 3];
// let num = 2;

// for(let i=0; i<arr1.length; i++){
//     if(arr1[i] == num){
//         arr1.splice(i, 1);
//     }
// }

// console.log(arr1);


// Count Digit

// let number = 287152;
// let count = 0;

// let copy = number;

// while(copy > 0){
//     count++;
//     copy = Math.floor(copy/10);
// }
// console.log(count);




// Sum of Number

// let number1 = 287152;
// let sum = 0;

// let copy1 = number1;

// while(number1 > 0){
//     digit = copy1 % 10;
//     sum = sum + digit;
//     copy1 = Math.floor(copy1/10);
// }

// console.log(sum);



// Factorial

// let n = 5;
// let fact = 1;

// for(let i=1; i<=n; i++){
//     fact = fact * i;
// }

// console.log(fact);




// Largest number

// let num1 = [2, 5, 10, 4, 2, 7, 1, 19];
// let Largest = 0;

// for(let i=0; i<num1.length; i++){
//     if(Largest < num1[i]){
//         Largest = num1[i];
//     }
// }

// console.log(Largest);