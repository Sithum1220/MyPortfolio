let orderID;
let orderedCustomerId;
let orderDate;
let orderedItemId;
let price;
let orderQty;
let cash;
let discount;
S('#OrderedCustomerName').prop('disabled', true);
S('#OrderedCustomerAddress').prop('disabled', true);
S('#itemName').prop('disabled', true);
S('#qtyOnHand').prop('disabled', true);
S('#price').prop('disabled', true);

S(window).on('load', function () {
    S('#itemIdSpan').css('display', 'none');
    S('#inputItemCode').css("border", "1px solid #ced4da");
    S('#cusIdSpan').css('display', 'none');
    S('#inputCustomerId').css('border', '1px solid #ced4da');
    S('#dateSpan').css('display', 'none');
    S('#date').css('border', '1px solid #ced4da');
    S('#orderQtySpan').css('display', 'none');
    S('#orderdQTY').css('border', '1px solid #ced4da');
});

function getAllOrderDetailsForTextFeild() {
    cash = S('#cash').val();
    discount = S('#discount').val();
}

function setCustomerId() {
    S('#inputCustomerId').empty();
    S('#inputCustomerId').append('<option selected>Choose...</option>');
    for (let customer of customerDB) {
        let selecter = `<option id="selectOption">${customer.id}</option>`
        S('#inputCustomerId').append(selecter);
    }
}

function setItemId() {
    S('#inputItemCode').empty();
    S('#inputItemCode').append('<option selected>Choose...</option>');
    for (let item of itemDB) {
        let selecter = `<option>${item.id}</option>`
        S('#inputItemCode').append(selecter);
    }
}

S('#inputCustomerId').on('change', function () {
    orderedCustomerId = S('#inputCustomerId').val();
    let index = -1;

    for (let customerObj of customerDB) {
        if (customerObj.id == orderedCustomerId) {
            index = customerDB.indexOf(customerObj);
        }
    }

    if (orderedCustomerId == 'Choose...') {
        S('#OrderedCustomerName').val('');
        S('#OrderedCustomerAddress').val('');
    } else {
        S('#OrderedCustomerName').val(customerDB[index].name);
        S('#OrderedCustomerAddress').val(customerDB[index].address);
        S('#cusIdSpan').css('display', 'none');
        S('#inputCustomerId').css('border', '1px solid #ced4da');
    }
});

S('#inputItemCode').on('change', function () {
    orderedItemId = S('#inputItemCode').val();

    if (orderedItemId == 'Choose...') {
        S('#itemName').val('');
        S('#qtyOnHand').val('');
        S('#price').val('');

    } else {
        S('#itemName').val(getDataById(itemDB, orderedItemId).description);
        S('#qtyOnHand').val(getDataById(itemDB, orderedItemId).qty);
        S('#price').val(getDataById(itemDB, orderedItemId).unitPrice);
        S('#itemIdSpan').css('display', 'none');
        S('#inputItemCode').css("border", "1px solid #ced4da");
        checkOrderedQTY();
    }
});

S('#date').on('change', function () {
    orderDate = S('#date').val();
    S('#dateSpan').css('display', 'none');
    S('#date').css('border', '1px solid #ced4da');
})

S('#btn-add-item').click(function () {
    if (checkAllOrderReg()) {
        if (S('#inputItemCode').val() == 'Choose...') {
            S('#itemIdSpan').css('display', 'block');
            S('#inputItemCode').css('border', '1px solid red');
        }
        if (S('#inputCustomerId').val() == 'Choose...') {
            S('#cusIdSpan').css('display', 'block');
            S('#inputCustomerId').css('border', '1px solid red');
        }
        if (S('#date').val() == '') {
            S('#dateSpan').css('display', 'block');
            S('#date').css('border', '1px solid red');
        }
        if (S('#inputItemCode').val() != 'Choose...' && S('#inputCustomerId').val() != 'Choose...' && S('#date').val() != '') {
            orderAddToCart();
        }
    } else {
        alert('error');
    }
});

S()

function orderAddToCart() {
    orderID = S('#orderId').val();
    orderQty = S('#orderdQTY').val();
    price = S('#price').val();

    let order = Object.assign({}, purchersOrder);
    let orderDetail = Object.assign({}, orderDetails);

    order.oid = orderID;
    order.date = orderDate;
    order.customerID = orderedCustomerId;

    orderDetail.oid = orderID;
    orderDetail.qty = orderQty;
    orderDetail.unitPrice = price;
    orderDetail.code = orderedItemId;

    if (searchExistCartItem(orderedItemId, order)) {

        getDataByItemID(order.orderDetails, orderedItemId).qty = parseInt(getDataByItemID(order.orderDetails, orderedItemId).qty) + parseInt(orderQty);
    } else {
        order.orderDetails.push(orderDetail);
    }

    // let total = parseInt(getDataByItemID(order.orderDetails, orderedItemId).qty) * price;

    let total = 0;
    S('#tBody-order').empty();
    for (let orderElement of order.orderDetails) {
        var row = `<tr><td>${orderElement.code}</td><td>${getDataById(itemDB, orderElement.code).description}</td><td>${order.date}</td><td>${orderElement.unitPrice}</td><td>${orderElement.qty}</td><td>${parseInt(orderElement.unitPrice) * parseInt(orderElement.qty)}</td></tr>`;
        S('#tBody-order').append(row)

        total += parseInt(orderElement.unitPrice) * parseInt(orderElement.qty);
    }
    S('#totalSpan').text(total);
    S('#subTotalSpan').text(total);
    S('#orderdQTY').val('');
    setBtnOrder();
}

function getDataById(arr, id) {
    let index = -1;

    for (let Obj of arr) {
        if (Obj.id == id) {
            index = arr.indexOf(Obj);
            return arr[index];
        }
    }
    return null;
}

function getDataByItemID(arr, id) {
    let index = -1;

    for (let Obj of arr) {
        if (Obj.code == id) {
            index = arr.indexOf(Obj);
            return arr[index];
        }
    }
    return null;
}

function searchExistCartItem(id, obj) {
    return obj.orderDetails.find(function (obj) {
        return obj.code == id;
    });
}



