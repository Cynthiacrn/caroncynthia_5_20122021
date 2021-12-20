Products();

async function getProducts() {

    var response = await fetch('http://localhost:3000/api/products')
    return await response.json();
    //newProduct(product.imageUrl, product.name, product.descritpion)
    
}

async function Products(){
    var result = await getProducts()
    .then(function (resultatAPI){
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

    //Inseertion Img
    let productImg = document.createElement("img");
    productArticle.appendChild(productImg);
    productImg.src = resultatAPI[article].imageUrl;
    productImg.alt = resultatAPI[article].altTxt;

    //Insertion titre
    let productName = document.createElement("h3");
    productArticle.appendChild(productName);
    productName.classList.add("productName");
    productName.innerHTML = resultatAPI[article].name;

    //Insertion description
    let productDescription = document.createElement("p");
    productArticle.appendChild(productDescription);
    productDescription.classList.add("productDescription");
    productDescription.innerHTML = resultatAPI[article].description;
   }
})
.catch (function (error){
    return error;
});

}
// function newProduct(img, nom, description){
//     document.getElementById("items").innerHTML += 
//     `<a href="./product.html?id=42"> 
//     <article>
//     <img src="${product.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1"> 
//     <h3 class="productName">${product.name}</h3>
//     <p class="${product.description}</p>
//     </article>
//     </a>`
// }