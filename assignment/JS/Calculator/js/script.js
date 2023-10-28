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

// $('#num1').click(function () {
//     // newNum.push(1)
//     setNumberForInput(1);
//
// });