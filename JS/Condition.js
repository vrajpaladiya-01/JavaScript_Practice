function marksheet() {

    let name = document.getElementById("nm").value;

    let maths = Number(document.getElementById("sub1").value);
    let chemi = Number(document.getElementById("sub2").value);
    let physics = Number(document.getElementById("sub3").value);
    let engl = Number(document.getElementById("sub4").value);
    let computer = Number(document.getElementById("sub5").value);

    let resultBox = document.getElementById("result");

    let total = maths + chemi + physics + engl + computer;
    let per = total / 5;

    let grade;
    let result;

    if(per > 90 && per <= 100){
        grade = "A+";
        result = "PASS";
    } else if(per > 80 && per <= 90){
        grade = "A";
        result = "PASS";
    }
    else if(per > 70 && per <= 80){
        grade = "B+";
        result = "PASS";
    }
    else if(per > 60 && per <= 70){
        grade = "B";
        result = "PASS";
    }
    else if(per > 40 && per <= 60){
        grade = "C";
        result = "PASS";
    }
    else {
        grade = "F";
        result = "Fail";
    }

    resultBox.innerHTML = `
        <h3> Marksheet <h3>
        Name: ${name} <br><br>

        Maths: ${maths} <br>
        Chemistry: ${chemi} <br>
        Physics: ${physics} <br>
        English: ${engl} <br>
        Computer: ${computer} <br><br>

        Total: ${total} <br>
        Percentage: ${per.toFixed(2)}% <br>
        Grade: ${grade} <br>
        Result: ${result}
    `;
}