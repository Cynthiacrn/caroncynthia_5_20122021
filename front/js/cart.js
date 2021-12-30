
let cartArray = JSON.parse(localStorage.getItem("panier"));
console.log(cartArray)

function cartSettings(){
    getCart()
    getTotal()
}

cartSettings()

function getCart(){
    if(cartArray === null || cartArray === 0){
        let emptyMessage = document.createElement("p");
        document.querySelector("#cart__items").appendChild(emptyMessage);
        emptyMessage.textContent = "Votre panier est vide"
        console.log(emptyMessage)
    }
    else{
    for(let product of cartArray){

        // création de l'article dans la section "#cart__items"
        let articleContainer = document.createElement("article");
        document.querySelector("#cart__items").appendChild(articleContainer);
        articleContainer.className = "cart__item";
        articleContainer.setAttribute('data-id', product.id);

        // création des conteneur de l'image
        let imgContainer = document.createElement("div");
        articleContainer.appendChild(imgContainer);
        imgContainer.className = "cart__item__img";
        let articleImg = document.createElement("img");
        imgContainer.appendChild(articleImg);
        // ajout de l'img et son alt
        articleImg.setAttribute("src", product.img);
        articleImg.setAttribute("alt", product.alt);

        // conteneur de la description et des paramètres
        let descriptionContainer = document.createElement("div");
        articleContainer.appendChild(descriptionContainer);
        descriptionContainer.className = "cart__item__content";

        // description de la commande
        let descriptionContent = document.createElement("div");
        descriptionContainer.appendChild(descriptionContent);
        descriptionContent.className = "cart__item__content__description";

        // nom du produit
        let titleDescription = document.createElement("h2")
        descriptionContent.appendChild(titleDescription)
        titleDescription.textContent = product.nom;
        // couleur du produit
        let colorDescription = document.createElement("p");
        descriptionContent.appendChild(colorDescription)
        colorDescription.textContent = product.color;
        // prix du produit
        let priceDescription = document.createElement("p");
        descriptionContent.appendChild(priceDescription)
        priceDescription.textContent = product.prix + " €";

        // paramètres des produits
        let settingsContent = document.createElement("div");
        descriptionContainer.appendChild(settingsContent);
        settingsContent.className = "cart__item__content__settings";
        
        let quantitySettings = document.createElement("div");
        settingsContent.appendChild(quantitySettings);
        quantitySettings.className = "cart__item__content__settings__quantity";

        let quantity = document.createElement("p");
        quantitySettings.appendChild(quantity);
        quantity.textContent = "Qté: ";

        let productQuantity = document.createElement("input");
        quantitySettings.appendChild(productQuantity);
        productQuantity.addEventListener("change", function(){
            const indexOfProduct = cartArray.indexOf(product);
            cartArray[indexOfProduct].quantity = productQuantity.value;
            setLocalStorage()
            getTotal()
        })
        productQuantity.className = "itemQuantity"
        productQuantity.value = product.quantity;
        productQuantity.setAttribute("type", "number");
        productQuantity.setAttribute("min", "1");
        productQuantity.setAttribute("max", "100");
        productQuantity.setAttribute("name", "itemQuantity");

        let deleteSettings = document.createElement("div");
        settingsContent.appendChild(deleteSettings);
        deleteSettings.addEventListener("click", function(){
            const indexOfProduct = cartArray.indexOf(product);
            cartArray.splice(indexOfProduct, 1);
            console.log(cartArray) 
            deleteSettings.closest("article").remove()

            setLocalStorage()
            getTotal()
        })
        deleteSettings.className = "cart__item__content__settings__delete";
        let deleteItem = document.createElement("p");
        deleteSettings.appendChild(deleteItem);
        deleteItem.className = "deleteItem";
        deleteItem.textContent = "Supprimer"
    }
}}

function getTotal(){

    // Total de toutes les quantités
    let productQtty = document.getElementsByClassName("itemQuantity");
    let quantityLenght = productQtty.length;
    console.log(quantityLenght),

    totalQuantity = 0;
    totalPrice = 0

    for(var i = 0; i < quantityLenght; ++i){
        totalQuantity += productQtty[i].valueAsNumber;

        //Calcul du prix total
        totalPrice += (productQtty[i].valueAsNumber * cartArray[i].prix)
    }

    let cartTotalQuantity = document.getElementById("totalQuantity");
    cartTotalQuantity.innerHTML = totalQuantity;
    console.log(totalQuantity)

    let  allTotalPrices = document.querySelector("#totalPrice");
    allTotalPrices.innerHTML = totalPrice;
 }


function setLocalStorage(){
    localStorage.setItem("panier", JSON.stringify(cartArray));
}

