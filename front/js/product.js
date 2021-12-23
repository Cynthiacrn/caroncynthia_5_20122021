var str = window.location.href;
var url = new URL(str);
var productId = url.searchParams.get("id");
console.log(productId)

async function getProducts() {

    var response = await fetch('http://localhost:3000/api/products/' + productId)
    return await response.json();
    
}

// récupération des résultats pour pouvoir les afficher dans le DOM par la suite
async function resultat() {
    let product = await getProducts()
    console.log(product)
    displayProduct(product)
    addToCart(product)
}

resultat()

function displayProduct(product){
    // affichage des details du produit dans la page produit

    // ajout du nom du produit
    let title = document.querySelector("h1#title");
    title.textContent = product.name;

    // création des conteneurs de l'image
    let imgContainer = document.querySelector(".item__img");
    let img = document.createElement("img");
    imgContainer.appendChild(img);

    // ajout de l'image et de son alt
    let imgParams = document.querySelector(".item__img img");
    imgParams.setAttribute("src", product.imageUrl);
    imgParams.setAttribute("alt", product.altTxt);

    // insertion du prix
    let price = document.querySelector("#price");
    price.textContent = product.price;

    // ajout de la description
    let description = document.querySelector("#description");
    description.textContent = product.description;

    // ajout d'un boucle for afin de sélectionner la coleur souhaitée 
    let selectColor = document.querySelector("#colors");
    for(color of product.colors){
        let currentColor = document.createElement("option");
        currentColor.setAttribute("value", color);
        currentColor.textContent = color;
        selectColor.appendChild(currentColor);
    }
}

function addToCart(product){
    let button = document.querySelector("#addToCart");
    let productArray = [];

    // création d'un événement sur le click du bouton
    button.addEventListener("click", function(){
        let colorsValue = document.querySelector("#colors").value;
        console.log(colorsValue)
        let quantityValue = document.querySelector("#quantity").value;
        console.log(quantityValue)
        let kanap = {
            id: product._id,
            quantity: parseInt(quantityValue),
            color: colorsValue
        }      
        if(localStorage.getItem("panier")){
            productArray = JSON.parse(localStorage.getItem("panier")); //parse = vers ObjetJS
            for(article of productArray){
                if(kanap.id === article.id && kanap.color === article.color){
                    article.quantity = article.quantity + kanap.quantity;
                    localStorage.setItem("panier", JSON.stringify(productArray)); //stringify = vers JSON
                    return;
                }
            }
            productArray.push(kanap);
            localStorage.setItem("panier", JSON.stringify(productArray));
        }
        else{
            productArray.push(kanap);
            localStorage.setItem("panier", JSON.stringify(productArray));
            console.log("item ajouté")
        }
    })
}





