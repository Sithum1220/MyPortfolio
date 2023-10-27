const ORDER_ID_REGEX = /^(OR00-)[0-9]{3}$/;
const PRICE_REGEX = /^[0-9]{2,}([.][0-9]{2})?$/;
const  DISCOUNT_REGEX = /^[0-9]{1,}([.][0-9]{2})?$/;
const QTY_REGEX = /[0-9]{1,9}/;

let o_vArray = new Array();
o_vArray.push({field: S("#orderId"), regEx: ORDER_ID_REGEX});
o_vArray.push({field: S("#orderdQTY"), regEx: QTY_REGEX});

let place_order_vArray = new Array();
place_order_vArray.push({field: S("#cash"), regEx: PRICE_REGEX});
place_order_vArray.push({field: S("#discount"), regEx: DISCOUNT_REGEX});
place_order_vArray.push({field: S("#orderId"), regEx: ORDER_ID_REGEX});
S(window).on('load', function () {
    S("#btn-add-item").prop("disabled", true);
    S("#btn-placeOrder").prop("disabled", true);
    S("#balance").prop("disabled", true);
    S("#cashSpan").css("display", 'none');
});

function checkOrderValidation(object) {
    if (object.regEx.test(object.field.val())) {
        setOrderTextBorder(true, object);
        return true;
    }
    setOrderTextBorder(false, object);
    return false;
}

function checkPlacOrdereValidation(object) {
    if (object.regEx.test(object.field.val())) {
        setOrderTextBorder(true, object);
        return true;
    }
    setOrderTextBorder(false, object);
    return false;
}

function setOrderTextBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    } else {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid green");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    }
}

function checkAllOrderReg() {
    for (let i = 0; i < o_vArray.length; i++) {
        if (!checkOrderValidation(o_vArray[i])) {
            return false;
        }
    }
    return true;
}

function checkAllPlaceOrderReg() {
    for (let i = 0; i < place_order_vArray.length; i++) {
        if (!checkPlacOrdereValidation(place_order_vArray[i])) {
            return false;
        }
    }
    return true;
}

focusNextOrderTextFeild();
setBtnOrder();
setBtnPlaceOrder()
focusNextPlaceOrderTextFeild();

function focusNextOrderTextFeild() {
    S('#orderdQTY,#orderId').on('keyup', function (e) {
        let indexNo = o_vArray.indexOf(o_vArray.find((c) => c.field.attr("id") == e.target.id));

        if (e.key == "Tab") {
            e.preventDefault();
        }

        setBtnOrder();
    });
}

function focusNextPlaceOrderTextFeild() {
    S('#cash,#discount,#orderId').on('keyup', function (e) {
        let indexNo = place_order_vArray.indexOf(place_order_vArray.find((c) => c.field.attr("id") == e.target.id));

        if (e.key == "Tab") {
            e.preventDefault();
        }
        let checker = checkOrderValidation(place_order_vArray[indexNo]);

        if (e.key == "Enter") {


            // if (searchExistItem(selectedItemId)){
            //     if (checkAllItemReg()) {
            //         S("#itemId").focus();
            //         S('#btn-update-item').click();
            //     }
            // }else {
            //     if (checkAllItemReg()) {
            //         S("#itemId").focus();
            //         S('#btn-save-item').click();
            //     }
            // }
        }
        setBtnPlaceOrder();
    });
}

function setBtnOrder() {

    if (checkAllOrderReg() && parseInt(S('#orderdQTY').val()) <= parseInt(S('#qtyOnHand').val())) {
        S("#btn-add-item").prop("disabled", false);
    } else {
        S("#btn-add-item").prop("disabled", true);
    }
}

function setBtnPlaceOrder() {

    if (checkAllPlaceOrderReg()) {
        if (finalBalance.startsWith('-')){
            // S("#cashSpan").css("display", 'block');
            S("#btn-placeOrder").prop("disabled", true);
        }else {
            // S("#cashSpan").css("display", 'none');
            S("#btn-placeOrder").prop("disabled", false);
        }

    } else {
        S("#btn-placeOrder").prop("disabled", true);
    }
}


function checkOrderedQTY() {

    if (S('#qtyOnHand').val() != '') {
        if (parseInt(S('#orderdQTY').val()) <= parseInt(S('#qtyOnHand').val()) && parseInt(S('#orderdQTY').val()) != 0) {
            S('#orderQtySpan').css('display', 'none');
            S('#orderdQTY').css('border', '1px solid #ced4da');
        } else {
            S('#orderQtySpan').text('Please Enter a Amount lower than: ' + parseInt(S('#qtyOnHand').val()));

            S('#orderQtySpan').css('display', 'block');
            S('#orderdQTY').css('border', '1px solid red');
        }
    } else {
        S('#orderQtySpan').text('Please select item');
        S('#orderQtySpan').css('display', 'block');
        S('#orderdQTY').css('border', '1px solid red');
    }

    if (S('#orderdQTY').val() == '') {
        S('#orderQtySpan').css('display', 'none');
        S('#orderdQTY').css('border', '1px solid #ced4da');
    }
}

S('#orderdQTY').on('keyup', function () {
    checkOrderedQTY();
});

