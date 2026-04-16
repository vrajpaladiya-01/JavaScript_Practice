// let x = 10;
// let y = "Vraj Paladiya";
// let z = 2;
// let a = null;
// let b;
// let c = " ";
// let f = "";
// const d = true;
// const e = false;
// const g = {
//     s1: {
//         name: "Vraj",
//         rollno: 11,
//     },
//     s2: {
//         name: "Raj",
//         rollno: 12,
//     },

// }

// console.log(typeof(x));
// console.log(typeof(y));
// console.log(typeof(z));
// console.log(typeof(a));
// console.log(typeof(b));
// console.log(typeof(c));
// console.log(typeof(d));
// console.log(typeof(e));
// console.log(typeof(f));
// console.log(typeof(g));

// const add = x + z;
// const sub = x - z;
// const mul = x * z;
// const div = x / z;
// const mod = x % z;

// console.log("Addition : " + add + "\nSubtracation : " + sub + "\nMultiplication : " + mul + "\nDivision : " + div + "\nModulo : " + mod);

// const n = "3";
// const h = n%2 == 0;

// console.log(h ? "Even" : "Odd");

const price = 100;
const quantity = 5;
const discount = 10;
const gst = 18;

const str = price.toString();
const tbill = price * quantity;
const bill = tbill*discount/100;

const total = tbill - bill;
const tgst = total * gst / 100;
const final = total + tgst;

console.log(str);
console.log(typeof str);
console.log(bill);
console.log(total);
console.log(final);
