var str = window.location.href;
var url = new URL(str);
var productId = url.searchParams.get("id");
console.log(productId)

async function getProducts() {

    var response = await fetch('http://localhost:3000/api/products/' + productId)
    return await response.json();
    
}

async function resultat() {
    let product = await getProducts()
    console.log(product)
    displayProduct(product)
}

resultat()

function displayProduct(product){
    let title = document.querySelector("h1#title");
    title.textContent = product.name;
    let imgContainer = document.querySelector(".item__img");
    let img = document.createElement("img");
    imgContainer.appendChild(img);
    let imgParams = document.querySelector(".item__img img");
    imgParams.setAttribute("src", product.imageUrl);
    imgParams.setAttribute("alt", product.altTxt);
    let price = document.querySelector("#price");
    price.textContent = product.price;
    let description = document.querySelector("#description");
    description.textContent = product.description;
    let selectColor = document.querySelector("#colors");
    for(color of product.colors){
        let currentColor = document.createElement("option");
        currentColor.setAttribute("value", color);
        currentColor.textContent = color;
        selectColor.appendChild(currentColor);
    }
}




