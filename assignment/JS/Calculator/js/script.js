let newNum = [];
var process = [];
function clearInput() {
    $('#input').val("");
}

$('#clear').click(function () {
    clearInput();
});

function setNumberForInput(number) {
    let val1 = $('#input').val();
    val1 = val1 + "" + number;
    $('#input').val(val1);
}

$('#addition').click(function () {
    let val1 = $('#input').val();
    newNum.push(val1)
    process.push("+")
    clearInput();
});

$('#Multi').click(function () {
    let val1 = $('#input').val();
    newNum.push(val1)
    process.push("*")
    clearInput();
});

$('#M').click(function () {
    let val1 = $('#input').val();
    newNum.push(val1)
    process.push("-")
    clearInput();
});

$('#D').click(function () {
    let val1 = $('#input').val();
    newNum.push(val1)
    process.push("/")
    clearInput();
});

$('#P').click(function () {
    let val1 = $('#input').val();
    newNum.push(val1)
    process.push("%")
    // clearInput();
    percentage(val1);
});

function getTotal(num1, num2) {
    let total = 0;
    total = parseFloat(num1) + parseFloat(num2);
    newNum.unshift(total)
    process.splice(0, 1)
    newNum.splice(1, 2)
    $('#input').val(total);
}

function getMultiple(num1, num2) {

    let total = 0;
    total = parseFloat(num1) * parseFloat(num2);
    newNum.unshift(total)
    process.splice(0, 1)
    newNum.splice(1, 2)
    $('#input').val(total);
}

function getDivide(num1, num2) {
    let total = parseFloat(num1) / parseFloat(num2);
    newNum.unshift(total)
    process.splice(0, 1)
    newNum.splice(1, 2)
    $('#input').val(total);
}

function getMinus(num1, num2) {
    /* let total=newNum[0];
     for (let i = 1; i < newNum.length; i++) {
         console.log(parseFloat(newNum[i]))
         console.log(parseFloat(total))
         total=parseFloat(total)-parseFloat(newNum[i]);
     }
     console.log(total)
     $('#input').val(total);*/
    let total = 0;
    total = parseFloat(num1) - parseFloat(num2);
    newNum.unshift(total)
    process.splice(0, 1)
    newNum.splice(1, 2)
    $('#input').val(total);
}

function percentage(num1) {
    let total = 0;
    total = parseFloat(num1)/100;
    newNum.unshift(total)
    process.splice(0, 1)
    newNum.splice(1, 2)
    $('#input').val(total);
}

$('#Eq').click(function () {
    let val1 = $('#input').val();
    newNum.push(val1)
    clearInput();

    for (let i = 0; i < process.length; (process.length == 1 ? i = 1 : i)) {
        for (let j = 0; j < newNum.length; (newNum.length == 1 ? j = 1 : j)) {
            if (process[i] == "+") {
                console.log(newNum[j] + " " + newNum[j + 1]);
                getTotal(newNum[j], newNum[j + 1]);
            }
            if (process[i] == "*") {
                getMultiple(newNum[j], newNum[j + 1]);
            }
            if (process[i] == "/") {
                getDivide(newNum[j], newNum[j + 1]);
            }
            if (process[i] == "-") {
                getMinus(newNum[j], newNum[j + 1]);
            }
            // if (process[i] == '%'){
            //     percentage(newNum[j]);
            // }
        }
    }
    $('#input').val(newNum[0]);
    newNum = [];
    process = [];
});

$('#C').click(function () {
    let numbers = $('#input').val();
    newNumber = numbers.slice(0,-1);
    clearInput();
    $('#input').val(newNumber);
});