

S('#orderId').on('keydown keyup', function (e) {
    if (e.key == 'Enter'){

    }
});

function searchOrders() {
    S('#search').on('keydown keyup', function (e) {
            let oId = S('#orderId').val()
        if (e.key == 'Enter'){
            if (S('#search').val() != ''){
                if (searchExistOrder(oId.trim())){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'This Order is Not Exist.'
                    });

                }else {


                    S('#orderId').val(S('#search').val());
                    S('#date').val(getDataByOrderId(orderDB,oId).date);
                    S('#inputCustomerId').val(getDataByOrderId(orderDB,oId).customerID);
                    S('#OrderedCustomerName').val(getDataByCustomerID(customerDB,S('#inputCustomerId').val()).name);
                    S('#OrderedCustomerAddress').val(getDataByCustomerID(customerDB,S('#inputCustomerId').val()).address);
                    S('#tBody-order').empty();
                    for (let orderDBElement of orderDB) {
                        for (let i = 0; i < orderDBElement.orderDetails.length; i++) {
                            var row = `<tr><td>${orderDBElement.orderDetails[i].code}</td><td>${getDataByCustomerID(itemDB, orderDBElement.orderDetails[i].code).description}</td><td>${orderDBElement.date}</td><td>${orderDBElement.orderDetails[i].unitPrice}</td><td>${orderDBElement.orderDetails[i].qty}</td><td>${parseInt(orderDBElement.orderDetails[i].unitPrice) * parseInt(orderDBElement.orderDetails[i].qty)}</td></tr>`;
                            S('#tBody-order').append(row)
                        }
                    }
                }
            }
        }

    });
}

function searchOrders() {
    S('#search').on('keyup', function () {
        S('#tBody-order').empty();
        let index = -1;

        for (let orderObj of orderDB) {
            if (orderObj.oid == S('#search').val()) {
                index = orderDB.indexOf(orderObj);
            }else {
                S('#tBody-order').empty();
                S('#orderId').val('');
                S('#date').val('');
                S('#inputCustomerId').val('Choose...');
                S('#OrderedCustomerName').val('');
                S('#OrderedCustomerAddress').val('');
            }
        }
        S('#orderId').val(orderDB[index].oid);
        S('#date').val(orderDB[index].date);
        S('#inputCustomerId').val(orderDB[index].customerID);
        S('#OrderedCustomerName').val(getDataByCustomerID(customerDB,S('#inputCustomerId').val()).name);
        S('#OrderedCustomerAddress').val(getDataByCustomerID(customerDB,S('#inputCustomerId').val()).address);

        S('#tBody-order').empty();
            for (let i = 0; i < orderDB[index].orderDetails.length; i++) {
                var row = `<tr><td>${orderDB[index].orderDetails[i].code}</td><td>${getDataByCustomerID(itemDB, orderDB[index].orderDetails[i].code).description}</td><td>${orderDB[index].date}</td><td>${orderDB[index].orderDetails[i].unitPrice}</td><td>${orderDB[index].orderDetails[i].qty}</td><td>${parseInt(orderDB[index].orderDetails[i].unitPrice) * parseInt(orderDB[index].orderDetails[i].qty)}</td></tr>`;
                S('#tBody-order').append(row)
            }
    });

}
function getDataByOrderId(arr, id) {
    let index = -1;

    for (let Obj of arr) {
        if (Obj.oid == id) {
            index = arr.indexOf(Obj);
            return arr[index];
        }
    }
    return null;
}

function getDataByCustomerID(arr, id) {
    let index = -1;

    for (let Obj of arr) {
        if (Obj.id == id) {
            index = arr.indexOf(Obj);
            return arr[index];
        }
    }
    return null;
}