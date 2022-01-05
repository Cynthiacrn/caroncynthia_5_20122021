function order(){
    let orderID = window.location.search.split('=')[1];
    document.querySelector("#orderId").innerHTML = orderID;
}
order();