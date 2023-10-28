const ITEM_ID_REGEX = /^(I00-)[0-9]{3}$/;
const ITEM_PRICE_REGEX = /^[0-9]{2,}([.][0-9]{2})?$/;
const ITEM_QTY_REGEX =  /[0-9]{1,9}/;
const ITEM_CATEGORY_REGEX = /^[A-Za-z ]{5,}$/;
const ITEM_DESCRIPTION_REGEX = /^[A-Za-z ]{5,}$/;

let i_vArray = new Array();
i_vArray.push({field: S("#itemId"), regEx: ITEM_ID_REGEX});
i_vArray.push({field: S("#itemCategory"), regEx: ITEM_CATEGORY_REGEX});
i_vArray.push({field: S("#itemUnitPrice"), regEx: ITEM_PRICE_REGEX});
i_vArray.push({field: S("#itemQTY"), regEx: ITEM_QTY_REGEX});
i_vArray.push({field: S("#itemDescription"), regEx: ITEM_DESCRIPTION_REGEX});

function checkItemValidation(object) {
    if (object.regEx.test(object.field.val())) {
        setItemTextBorder(true, object);
        return true;
    }
    setItemTextBorder(false, object);
    return false;
}

function setItemTextBorder(bol, ob) {
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

function checkAllItemReg() {
    for (let i = 0; i < i_vArray.length; i++) {
        if (!checkItemValidation(i_vArray[i])) {
            return false;
        }
    }
    return true;
}

focusNextItemTextFeild();
setBtnItem();

function focusNextItemTextFeild() {
    S('#itemId,#itemCategory,#itemUnitPrice,#itemQTY,#itemDescription').on('keyup', function (e) {
        let indexNo = i_vArray.indexOf(i_vArray.find((c) => c.field.attr("id") == e.target.id));

        if (e.key == "Tab") {
            e.preventDefault();
        }
        let checker = checkItemValidation(i_vArray[indexNo]);

        if (e.key == "Enter") {
            if (S('#itemId').val() != "" && checker) {
                S('#itemCategory').focus();
            }

            if (S('#itemCategory').val() != "" && checker) {
                S('#itemUnitPrice').focus();
            }

            if (S('#itemUnitPrice').val() != "" && checker) {
                S('#itemQTY').focus();
            }

            if (S('#itemQTY').val() != "" && checker) {
                S('#itemDescription').focus();
            }

            if (searchExistItem(selectedItemId)){
                if (checkAllItemReg()) {
                    S("#itemId").focus();
                    S('#btn-update-item').click();
                }
            }else {
                if (checkAllItemReg()) {
                    S("#itemId").focus();
                    S('#btn-save-item').click();
                }
            }
        }
        setBtnItem();
    });
}

function setBtnItem() {
    S("#btn-save-item").prop("disabled", true);

    if (checkAllItemReg()) {
        S("#btn-save-item").prop("disabled", false);
        S("#btn-update-item").prop("disabled", false);
    } else {
        S("#btn-save-item").prop("disabled", true);
        S("#btn-update-item").prop("disabled", true);
    }
}

function clearItemInputFields() {
    S('#itemId,#itemCategory,#itemUnitPrice,#itemQTY,#itemDescription').val("");
    S('#itemId,#itemCategory,#itemUnitPrice,#itemQTY,#itemDescription').css("border", "1px solid #ced4da");
    S("#itemId").focus();
    setBtnItem();
}