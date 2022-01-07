// fonction qui permet de récupérer et d'afficher le numero de commande sur la page de confirmation
function confirmation(){
    // récupération des paramètres de l'URL
    let params = (new URL(window.location)).searchParams;
    // récupération du numéro de commande
    let orderID = params.get("orderID")
    console.log(orderID)
    document.querySelector("#orderId").textContent = orderID;
}
confirmation()