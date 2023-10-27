
function viewOrders() {
    let oId = S('orderId').val()

}

function searchExistCustomer(id) {
    return order.find(function (purchersOrder) {
        return customer.id == id;
    });
}