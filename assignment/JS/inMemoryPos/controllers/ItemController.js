let itemId;
let itemCategory;
let itemUnitPrice;
let itemQTY;
let itemDescription;
let selectedItemId;

S(window).on('load', function () {
    S("#btn-update-item").prop("disabled", true);
    S("#btn-delete-item").prop("disabled", true);
});

function getAllItemForTextFeild() {
    itemId = S('#itemId').val();
    itemCategory = S('#itemCategory').val();
    itemUnitPrice = S('#itemUnitPrice').val();
    itemQTY = S('#itemQTY').val();
    itemDescription = S('#itemDescription').val();
}
S('#btn-save-item').click(function () {
    if (checkAllItemReg()) {
        saveItem();
    } else {
        alert("Error");
    }
});


function saveItem() {
    getAllItemForTextFeild();
    let itemIds = S('#itemId').val();
    if (searchExistItem(itemIds.trim())) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'This Item Already Exist.'
        });
    } else {
        let newItem = Object.assign({}, item);

        newItem.id = itemId;
        newItem.category = itemCategory;

        newItem.qty = itemQTY;
        newItem.unitPrice = itemUnitPrice;
        newItem.description = itemDescription;

        itemDB.push(newItem);

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Item has been saved',
            showConfirmButton: false,
            timer: 1500
        })

        loadItemDataTable();
        clearItemInputFields();
        setItemDataTableToTextFeild();
        itemRowdoubleClick();
        S('#search').val("");
    }
}

function searchExistItem(id) {
    return itemDB.find(function (item) {
        return item.id == id;
    });
}

function loadItemDataTable() {
    S('#tBody-item').empty();
    for (var item of itemDB) {
        var row = `<tr><td>${item.id}</td><td>${item.description}</td><td>${item.category}</td><td>${item.unitPrice}</td><td>${item.qty}</td></tr>`;
        S('#tBody-item').append(row)
    }
}

function setItemDataTextFeild(id, description, category, unitPrice, qty) {
    S('#itemId').val(id);
    S('#itemCategory').val(category);
    S('#itemUnitPrice').val(unitPrice);
    S('#itemQTY').val(qty);
    S('#itemDescription').val(description);
}

function setItemDataTableToTextFeild() {
    S('#tBody-item > tr').click(function () {
        let id = S(this).children(':eq(0)').text();
        let category = S(this).children(':eq(1)').text();
        let description = S(this).children(':eq(2)').text();
        let unitPrice = S(this).children(':eq(3)').text();
        let qty = S(this).children(':eq(4)').text();

        setItemDataTextFeild(id, description, category, unitPrice, qty);
        S('#itemId').prop('disabled', true);
        selectedItemId = S('#itemId').val();
        // setId(id);
        setBtnItem();
        S('#search').val("");
    });
}
S('#btn-update-item').click(function () {

    if (checkAllItemReg()) {
        updateItem();
    } else {
        alert('error');
    }
});

function updateItem() {
    getAllItemForTextFeild();
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

            for (let itemObj of itemDB) {
                if (itemObj.id == selectedItemId) {
                    index = itemDB.indexOf(itemObj);
                }
            }

            itemDB[index].id = itemId;
            itemDB[index].category = itemCategory;
            itemDB[index].description = itemDescription;
            itemDB[index].unitPrice = itemUnitPrice;
            itemDB[index].qty = itemQTY;
            loadItemDataTable();
            clearItemInputFields();
            S('#itemId').prop('disabled', false);
            setItemDataTableToTextFeild();
            itemRowdoubleClick();
            S('#search').val("");

        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }
    });
}

function disableItemTextFeild(condition) {
    S('#itemId').prop('disabled', condition);
    S('#itemCategory').prop('disabled', condition);
    S('#itemUnitPrice').prop('disabled', condition);
    S('#itemQTY').prop('disabled', condition);
    S('#itemDescription').prop('disabled', condition);
}

function itemRowdoubleClick() {
    S('#tBody-item > tr').on('dblclick', function () {
        disableItemTextFeild(true);
        S("#btn-delete-item").prop("disabled", false);
        S("#btn-save-item").prop("disabled", true);
        S("#btn-update-item").prop("disabled", true);
    });
}
S('#btn-delete-item').click(function () {
    deleteItem();
});

function deleteItem() {
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
            itemDB.splice(selectedItemId, 1);
            loadItemDataTable();
            clearItemInputFields();
            setItemDataTableToTextFeild();
            itemRowdoubleClick();
            disableItemTextFeild(false);
            S('#search').val("");
        }
    })
}

S('#btn-cleartable-item').click(function () {
    S('#tBody').empty();
    clearCustomerInputFields();
    disableTextFeild(false);
    S('#search').val("");
});

S('#btn-getAll-item').click(function () {
    loadDataTable();
    setDataTableToTextFeild();
    itemRowdoubleClick();
    S('#search').val("");
});

S('#search').on('keyup', function () {
    S('#tBody-item').empty();
    let index = -1;

    for (let itemObj of itemDB) {
        if (itemObj.id == S('#search').val()) {
            index = itemDB.indexOf(itemObj);
        }
    }
    var row = `<tr><td>${itemDB[index].id}</td><td>${itemDB[index].description}</td><td>${itemDB[index].category}</td><td>${itemDB[index].unitPrice}</td><td>${itemDB[index].qty}</td></tr>`;
    S('#tBody-item').append(row)
    setItemDataTableToTextFeild();
    itemRowdoubleClick();
});