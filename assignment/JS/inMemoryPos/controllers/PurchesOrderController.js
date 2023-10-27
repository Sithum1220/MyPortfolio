let orderID;
let orderedCustomerId;
let orderDate;
let orderedItemId;
let price;
let orderQty;
let cash;
let discount;
let order;
let orderDetail;
let finalBalance;
let typeCash;
let subTotal;
let balance;
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
    }
    checkOrderedQTY();
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

S('#btn-placeOrder').click(function () {
    if (checkAllPlaceOrderReg()) {
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
            placeOrder();
        }
    } else {
        alert('error');
    }
});

function placeOrder() {
    cash = S('#cash').val();
    discount = S('#discount').val();


    if (searchExistOrder(orderID.trim())) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'This Order Already Exist.'
        });
    } else {
        orderDB.push(order);
        purchersOrder.orderDetails = [];
        S('#orderId').val('');
        S('#date').val('');
        S('#OrderedCustomerName').val('');
        S('#OrderedCustomerAddress').val('');
        S('#itemName').val('');
        S('#price').val('');
        S('#qtyOnHand').val('');
        S('#cash').val('');
        S('#discount').val('');
        S('#balance').val('');
        S('#inputItemCode').val('Choose...');
        S('#inputCustomerId').val('Choose...');
        S('#btn-placeOrder').prop('disabled', true);
        S('#totalSpan').text('00.00');
        S('#subTotalSpan').text('00.00');
        S('#tBody-order').empty();


        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Customer has been saved',
            showConfirmButton: false,
            timer: 1500
        })
    }

}

function orderAddToCart() {
    orderID = S('#orderId').val();
    orderQty = S('#orderdQTY').val();
    price = S('#price').val();

    order = Object.assign({}, purchersOrder);
    orderDetail = Object.assign({}, orderDetails);

    if (searchExistOrder(orderID.trim())) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'This Order Already Exist.'
        });
    } else {
        order.oid = orderID;
        order.date = orderDate;
        order.customerID = orderedCustomerId;

        orderDetail.oid = orderID;
        orderDetail.qty = orderQty;
        orderDetail.unitPrice = price;
        orderDetail.code = orderedItemId;

        if (searchExistCartItem(orderedItemId)) {
            alert('if')
                getDataByItemID(order.orderDetails, orderedItemId).qty = parseInt(getDataByItemID(order.orderDetails, orderedItemId).qty) + parseInt(orderQty);
        } else {
            alert('else')
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

function searchExistCartItem(id) {
    return order.orderDetails.find(function (orderDetail) {
        return orderDetail.code == id;
    });
}

S('#cash').on('keydown keyup', function () {
    balance = parseInt(S('#cash').val()) - parseInt(S('#totalSpan').text());
    S('#balance').val(balance);
    if (S('#balance').val() == 'NaN') {
        S('#balance').val(0);
    }
    finalBalance = S('#balance').val();
    typeCash = S('#cash').val();
    if (S('#discount').val() != '') {
        S('#balance').val(typeCash - subTotal);
    }
    insufficient();
});
S('#discount').on('keyup', function () {
    let discount = parseInt(S('#discount').val()) / 100 * parseInt(S('#totalSpan').text());
    subTotal = parseInt(S('#totalSpan').text()) - discount;
    S('#subTotalSpan').text(subTotal);

    if (S('#subTotalSpan').text() == 'NaN') {
        S('#subTotalSpan').text(S('#totalSpan').text());
    }
    S('#balance').val(typeCash - subTotal);

    if (S('#balance').val() == 'NaN') {
        S('#balance').val(balance);
    }
    finalBalance = S('#balance').val();
    insufficient();
});

function searchExistOrder(id) {
    return orderDB.find(function (purchersOrder) {
        return purchersOrder.oid == id;
    });
}

function insufficient() {
    if (finalBalance.startsWith('-')) {
        S("#cashSpan").css("display", 'block');
    } else {
        S("#cashSpan").css("display", 'none');
    }
}


