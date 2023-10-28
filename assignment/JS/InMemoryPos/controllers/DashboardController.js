var S = jQuery.noConflict();

S('.customer').css('display','none');
S('.item').css('display','none');
S('.orders').css('display','none');

S('.customer-btn').click(function (){
    S('.dashboard').css('display','none');
    S('.customer').css('display','block');
    S('.item').css('display','none');
    S('.orders').css('display','none');
    S('#customerId').focus();
    S('#search').off('keyup');
    searchCustomer();
});

S('.item-btn').click(function (){
    S('.dashboard').css('display','none');
    S('.customer').css('display','none');
    S('.item').css('display','block');
    S('.orders').css('display','none');
    S('#search').off('keyup');
    searchItem();
});

S('.orders-btn').click(function (){
    S('.dashboard').css('display','none');
    S('.customer').css('display','none');
    S('.item').css('display','none');
    S('.orders').css('display','block');
    S('#search').off('keyup');
    searchOrders();
});

S('#imgID').click(function (){
    S('.dashboard').css('display','block');
    S('.customer').css('display','none');
    S('.item').css('display','none');
    S('.orders').css('display','none');
});