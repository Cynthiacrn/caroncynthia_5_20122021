
let cartArray = JSON.parse(localStorage.getItem("panier"));
console.log(cartArray)

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
    productQuantity.className = "itemQuantity"
    productQuantity.value = product.quantity;
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("name", "itemQuantity");

    let deleteSettings = document.createElement("div");
    settingsContent.appendChild(deleteSettings);
    deleteSettings.className = "cart__item__content__settings__delete";
    let deleteItem = document.createElement("p");
    deleteSettings.appendChild(deleteItem);
    deleteItem.className = "deleteItem";
    deleteItem.textContent = "Supprimer"

}