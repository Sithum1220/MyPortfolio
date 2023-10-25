
let customerId;
let customerName;
let customerMobile;
let customerCity;
let customerStreet;
let customerNIC;


function getAllCustomerForTextFeild() {
    customerId = S('#customerId').val();
    customerName = S('#customerName').val();
    customerMobile = S('#customerMobile').val();
    customerCity = S('#customerCity').val();
    customerStreet = S('#customerStreet').val();
    customerNIC = S('#customerNIC').val();
}

S('#btn-save').click(function () {
    if (checkAll()){
        saveCustomer();
    }else{
        alert("Error");
    }
});
function saveCustomer() {
        let customerIds = S('#customerId').val();
        if (searchExistCustomer(customerIds.trim())) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'This Customer Already Exist.'
            });
        } else {
            getAllCustomerForTextFeild();
            let newCustomer = Object.assign({}, customer);

            newCustomer.id = customerId;
            newCustomer.name = customerName;
            newCustomer.mobile = customerMobile;
            newCustomer.nic = customerNIC;
            newCustomer.address = customerStreet + ", " + customerCity;

            customerDB.push(newCustomer);

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Customer has been saved',
                showConfirmButton: false,
                timer: 1500
            })

            loadDataTable();
            clearCustomerInputFields();
        }
}

function searchExistCustomer(id) {
    return customerDB.find(function (customer) {
        return customer.id == id;
    });
}

function loadDataTable() {
    S('#tBody').empty();
    for (var customer of customerDB) {
        var row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.mobile}</td><td>${customer.nic}</td></tr>`;
        S('#tBody').append(row)
    }
}

function setDataTextFeild(id, name, mobile, nic, city, street) {
    S('#customerId').val(id);
    S('#customerName').val(name);
    S('#customerMobile').val(mobile);
    S('#customerCity').val(nic);
    S('#customerStreet').val(city);
    S('#customerNIC').val(street);
}


