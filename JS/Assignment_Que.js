//Arrays Elemets Larger than numbers
let arr = [8, 9, 10, 1, 2, 3, 4, 5, 6, 7];
let num = 5;

function getElements(arr, num){
    for(let i=0; i<arr.length; i++){
        if(arr[i] > num){
            console.log(arr[i]);
        }
    }
}

getElements(arr, num);


// Extract Uniq Character From String
let str = "abcdabcdefgggh";

function getUniq(str){
    let ans = "";

    for(let i=0; i<str.length; i++){
        let currChar = str[i];
        if(ans.indexOf(currChar) == -1){
            ans += currChar;
        }
    }

    return ans;
}

console.log(getUniq(str));



// Largest Name Of Country
let country = ["Australia", "Germany", "United State Of America"];

function logestName(country){
    let ansIdx = 0;
    for(let i=0; i<country.length; i++){
        let ansLen = country[ansIdx].length;
        let currLen = country[i].length;
        if(currLen > ansLen){
            ansIdx = i;
        }
    }
    return country[ansIdx];
}

console.log(logestName(country));


//Count Number Of Vowels
let str1 = "helloworld";

function countVowels(str1){
    let count = 0;
    for(let i=0; i<str1.length; i++){
        if(str1.charAt(i) == 'a' ||str1.charAt(i) == 'e' ||str1.charAt(i) == 'i' ||str1.charAt(i) == 'o' ||str1.charAt(i) == 'u'){
            count++;
        }
    }
    return count;
}

console.log(countVowels(str1));




//Random number generate with start and end
let start = 100;
let end = 200;

function generateRandom(start, end){
    let diff = end - start;
    return Math.floor(Math.random() * diff) + start;
}

console.log(generateRandom(start, end));