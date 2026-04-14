const dice = Math.floor(Math.random() * 6) + 1;
console.log(dice);

let Driving = {
    car1: {
        nm: "BMW",
        Model: "X5",
        color: "White"
    }
};
console.log(Driving.car1.nm);

const person = {
    std1: {
        nam: "Uttsav Parekhya",
        age: 20,
        city: "Surat"
    }
};

console.log(person.std1);
person.std1.Country = "India";
console.log(person.std1);
person.std1.Country = "United State";
person.std1.city = "New Yourk";
console.log(person.std1);