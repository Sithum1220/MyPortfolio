const CUS_ID_REGEX = /^(C00-)[0-9]{3}$/;
const CUS_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const CUS_CITY_REGEX = /^[A-Za-z ]{5,}$/;
const CUS_STREET_REGEX = /^[A-Za-z0-9 ]{8,}$/;
const CUS_MOBILE_REGEX = /^[0]{1}[7]{1}[01245678]{1}[0-9]{7}$/;
const CUS_NIC_REGEX = /^(([5,6,7,8,9]{1})([0-9]{1})([0,1,2,3,5,6,7,8]{1})([0-9]{6})([v|V|x|X]))|(([1,2]{1})([0,9]{1})([0-9]{2})([0,1,2,3,5,6,7,8]{1})([0-9]{7}))/;
let cusId;
let c_vArray = new Array();
c_vArray.push({field: S("#customerId"), regEx: CUS_ID_REGEX});
c_vArray.push({field: S("#customerName"), regEx: CUS_NAME_REGEX});
c_vArray.push({field: S("#customerMobile"), regEx: CUS_MOBILE_REGEX});
c_vArray.push({field: S("#customerNIC"), regEx: CUS_NIC_REGEX});
c_vArray.push({field: S("#customerCity"), regEx: CUS_CITY_REGEX});
c_vArray.push({field: S("#customerStreet"), regEx: CUS_STREET_REGEX});

function checkValidation(object) {
    if (object.regEx.test(object.field.val())) {
        setBorder(true, object);
        return true;
    }
    setBorder(false, object);
    return false;
}

function setBorder(bol, ob) {
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


function checkAll() {
    for (let i = 0; i < c_vArray.length; i++) {
        if (!checkValidation(c_vArray[i])) return false;
    }
    return true;
}

focusNextTextFeild();
setBtn();

function focusNextTextFeild() {
    S('#customerId,#customerName,#customerMobile,#customerCity,#customerStreet,#customerNIC').on('keyup', function (e) {
        let indexNo = c_vArray.indexOf(c_vArray.find((c) => c.field.attr("id") == e.target.id));

        if (e.key == "Tab") {
            e.preventDefault();
        }
        let checker = checkValidation(c_vArray[indexNo]);

        if (e.key == "Enter") {
            if (S('#customerId').val() != "" && checker) {
                S('#customerName').focus();
            }

            if (S('#customerName').val() != "" && checker) {
                S('#customerMobile').focus();
            }

            if (S('#customerMobile').val() != "" && checker) {
                S('#customerNIC').focus();
            }

            if (S('#customerNIC').val() != "" && checker) {
                S('#customerCity').focus();
            }

            if (S('#customerCity').val() != "" && checker) {
                S('#customerStreet').focus();
            }

            if (searchExistCustomer(cusId)){
                if (checkAll()) {
                    S("#customerId").focus();
                    S('#btn-update').click();
                }
            }else {
                if (checkAll()) {
                    S("#customerId").focus();
                    S('#btn-save').click();
                }
            }


        }
        setBtn();
    });
}


function setBtn() {
    S("#btn-save").prop("disabled", true);

    if (checkAll()) {
        S("#btn-save").prop("disabled", false);
        S("#btn-update").prop("disabled", false);
    } else {
        S("#btn-save").prop("disabled", true);
        S("#btn-update").prop("disabled", true);
    }
}

function setId(id) {
    cusId = id;
}

function clearCustomerInputFields() {
    S('#customerId,#customerName,#customerMobile,#customerCity,#customerStreet,#customerNIC').val("");
    S('#customerId,#customerName,#customerMobile,#customerCity,#customerStreet,#customerNIC').css("border", "1px solid #ced4da");
    S("#customerId").focus();
    setBtn();
}