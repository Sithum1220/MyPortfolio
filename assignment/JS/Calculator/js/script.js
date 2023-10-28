let newNum=[];
var process=[];

function clearInput() {
    $('#input').val("");
}

$('#clear').click(function () {
    clearInput();
});

function setNumberForInput(number) {
    let val1 = $('#input').val();
    val1=val1+""+number;
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

function getTotal(num1,num2) {
    let total=0;
    total=parseFloat(num1)+parseFloat(num2);
    newNum.unshift(total)
    process.splice(0,1)
    newNum.splice(1,2)
    $('#input').val(total);
}