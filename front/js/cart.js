
let cartArray = JSON.parse(localStorage.getItem("panier"));
console.log(cartArray)

function cartSettings(){
    getCart()
    getTotal()
    setLocalStorage()
    listenForm()
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
        
        // paramètres des quantités
        let quantitySettings = document.createElement("div");
        settingsContent.appendChild(quantitySettings);
        quantitySettings.className = "cart__item__content__settings__quantity";

        let quantity = document.createElement("p");
        quantitySettings.appendChild(quantity);
        quantity.textContent = "Qté: ";

        let productQuantity = document.createElement("input");
        quantitySettings.appendChild(productQuantity);
        // gestion de la modification des produits dans le panier
        productQuantity.addEventListener("change", function(){
            const indexOfProduct = cartArray.indexOf(product); // création d'un index
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

        // paramètres de la suppression
        let deleteSettings = document.createElement("div");
        settingsContent.appendChild(deleteSettings);
        // gestion de la suppression des produits dans le panier
        deleteSettings.addEventListener("click", function(){
            const indexOfProduct = cartArray.indexOf(product); // création d'un index
            cartArray.splice(indexOfProduct); // suppression dans mon tableau du local storage
            console.log(cartArray) 
            deleteSettings.closest("article").remove() // suppression dans le dom
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

// fonction qui calcul le total des quantités et du prix
function getTotal(){

    // Total de toutes les quantités
    let productQtty = document.getElementsByClassName("itemQuantity");
    let quantityLenght = productQtty.length;
    console.log(quantityLenght)

    totalQuantity = 0;
    totalPrice = 0;

    for(var i = 0; i < quantityLenght; ++i){
        //Calcul des quantités totales
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

// fonction qui récupère le panier du local storage
function setLocalStorage(){
    localStorage.setItem("panier", JSON.stringify(cartArray)); //stringify = vers JSON
}


function checkRegex(regex, input){
    if(regex.test(input)){
        return true;
    }
    else{
        return false;
    }
}


// récupération des données du formulaire
function listenForm(){
    const letterFormat = /^[a-zA-ZéêèàëÉÈÊË\-]+$/;
    const addressFormat = /^[a-zA-ZéêèàëÉÈÊË0-9\s,.'-]{3,}$/;
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let firstName = document.querySelector("#firstName")
    let lastName = document.querySelector("#lastName");
    let address = document.querySelector("#address");
    let city = document.querySelector("#city")
    let email = document.querySelector("#email")
    let button = document.querySelector(".cart__order__form__submit");
    button.addEventListener("click", function(e){
        e.preventDefault();
        if(checkRegex(letterFormat, firstName.value)
        && checkRegex(letterFormat, lastName.value)
        && checkRegex(addressFormat, address.value)
        && checkRegex(addressFormat, city.value)
        && checkRegex(mailFormat, email.value)){
            let product = [];
            let storage = JSON.parse(localStorage.getItem("panier"));
            for(i of storage){
                product.push(i.id);
            }
            let order = {
                contact:{
                    firstName: firstName.value,
                    lastName: lastName.value,
                    address: address.value,
                    city: city.value,
                    email: email.value,
                },
                products : product,
            }
            const settings = {
                method: "POST",
                body: JSON.stringify(order),
                headers:{
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                },
            }

            fetch("http://localhost:3000/api/products/order", settings)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                localStorage.clear();
                localStorage.setItem("orderID", data.orderId);
                window.location.href = "confirmation.html";
            })
            .catch(error => console.error(error));
        }
        else{
            e.preventDefault();
            alert("Veuillez remplir correctement tous les champs");
        }
    });
    
}

let confirmation = document.querySelector("#orderId").textContent = localStorage.getItem("orderID");
localStorage.clear();
console.log(confirmation)
