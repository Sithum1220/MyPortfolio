
let customerId;
let customerName;
let customerMobile;
let customerCity;
let customerStreet;
let customerNIC;
let selectedId;

S(window).on('load',function () {
    S("#btn-update").prop("disabled", true);
    S("#btn-delete").prop("disabled", true);
});
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
            setDataTableToTextFeild();
            doubleClick();
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
    S('#customerCity').val(city);
    S('#customerStreet').val(street);
    S('#customerNIC').val(nic);
}

function setDataTableToTextFeild() {
    S('#tBody > tr').click(function () {
       let id =  S(this).children(':eq(0)').text();
       let name = S(this).children(':eq(1)').text();
       let address = S(this).children(':eq(2)').text();
       let mobile = S(this).children(':eq(3)').text();
       let nic = S(this).children(':eq(4)').text();

       let splitAddress = address.split(',')

        let street = splitAddress[0];
        let city = splitAddress[1];

       setDataTextFeild(id,name,mobile,nic,city,street);
        S('#customerId').prop('disabled', true);
        selectedId = S('#customerId').val();
        setId(id);
       setBtn();

    });
}

S('#btn-update').click(function () {

   if (checkAll()){
       updateCustomer();
   } else {
       alert('error');
   }
});
function updateCustomer() {
    getAllCustomerForTextFeild();
    Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success');

            let index = -1;

            for (let customerObj of customerDB) {
                if (customerObj.id == selectedId){
                    index = customerDB.indexOf(customerObj);
                }
            }

            customerDB[index].id = customerId;
            customerDB[index].name = customerName;
            customerDB[index].address = customerStreet+", "+customerCity;
            customerDB[index].mobile = customerMobile;
            customerDB[index].nic = customerNIC;
            loadDataTable();
            clearCustomerInputFields();
            S('#customerId').prop('disabled', false);
            setDataTableToTextFeild();
            doubleClick();
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }
    });
}

function disableTextFeild(condition) {
    S('#customerId').prop('disabled',condition);
    S('#customerName').prop('disabled',condition);
    S('#customerMobile').prop('disabled',condition);
    S('#customerCity').prop('disabled',condition);
    S('#customerStreet').prop('disabled',condition);
    S('#customerNIC').prop('disabled',condition);
}
function doubleClick() {
    S('#tBody > tr').on('dblclick',function () {
        disableTextFeild(true);
        S("#btn-delete").prop("disabled", false);
        S("#btn-save").prop("disabled", true);
        S("#btn-update").prop("disabled", true);
    });
}
S('#btn-delete').click(function () {
    deleteCustomer();
});
function deleteCustomer() {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
            customerDB.splice(selectedId,1);
            loadDataTable();
            clearCustomerInputFields();
            setDataTableToTextFeild();
            doubleClick();
            disableTextFeild(false);
        }
    })
}

S('#btn-cleartable').click(function () {
    S('#tBody').empty();
    clearCustomerInputFields();
    disableTextFeild(false);
});

S('#btn-getAll').click(function () {
    loadDataTable();
    setDataTableToTextFeild();
    doubleClick();
});


