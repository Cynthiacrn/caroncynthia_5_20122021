var str = window.location.href;
var url = new URL(str);
var productId = url.searchParams.get("id");
console.log(productId)

async function getProducts() {

    var response = await fetch('http://localhost:3000/api/products' + productId)
    return await response.json();
}

getProducts()