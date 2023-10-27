

S('#orderId').on('keydown keyup', function (e) {
    if (e.key == 'Enter'){
        if (S('#orderId').val().length != 0){
            let oId = S('#orderId').val()

            if (searchExistOrder(oId.trim())){

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
            }else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'This Order is Not Exist.'
                });
            }

        }
    }
});
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