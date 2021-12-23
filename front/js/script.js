Products();

async function getProducts() {

    var response = await fetch('http://localhost:3000/api/products')
    return await response.json();  
}

async function Products(){
    var result = await getProducts()
    displayContent(result)
}

function displayContent(resultatAPI){
    const articles = resultatAPI;
            console.log(articles);
    for (let article in articles){
    
        //Insertion de "a"
        let productLink = document.createElement("a");
        document.querySelector(".items").appendChild(productLink);
        productLink.href = `product.html?id=${resultatAPI[article]._id}`;
    
        //Insertion de "article"
        let productArticle = document.createElement("article");
        productLink.appendChild(productArticle);
    
        //Insertion Img
        let productImg = document.createElement("img");
        productArticle.appendChild(productImg);
        productImg.src = resultatAPI[article].imageUrl;
        productImg.alt = resultatAPI[article].altTxt;
    
        //Insertion titre
        let productName = document.createElement("h3");
        productArticle.appendChild(productName);
        productName.classList.add("productName");
        productName.textContent = resultatAPI[article].name;
    
        //Insertion description
        let productDescription = document.createElement("p");
        productArticle.appendChild(productDescription);
        productDescription.classList.add("productDescription");
        productDescription.textContent = resultatAPI[article].description;
    }
}
