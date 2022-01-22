# Kanap 

Cinquième projet de mon parcours Développeur web chez OpenClassroom. L'objectif est de construire un site e-commerce en JavaScript


![Logo Kanap](./front/images/logo.png)

## Objectifs

 - Manipuler les données de l'API
 - Les afficher dans le DOM
 - Faire le lien entre plusieurs pages
 - Stocker des données
 - Réutiliser les données stockées 
 - Gérer la possibilité de supprimer ou de modifier des éléments
 - Récupérer et analyser des données saisies par un utilisateur

### Architecture générales 

- Une page d’accueil montrant (de manière dynamique) tous les articles disponibles à la vente.
- Une page “produit” qui affiche (de manière dynamique) les détails du produit sur lequel l'utilisateur a cliqué depuis la page d’accueil. Depuis cette page, l’utilisateur peut sélectionner une quantité, une couleur, et ajouter le produit à son panier.
- Une page “panier”. Celle-ci contient plusieurs parties :
- Un résumé des produits dans le panier, le prix total et la possibilité de
modifier la quantité d’un produit sélectionné ou bien de supprimer celui-ci.
- Un formulaire permettant de passer une commande. Les données du
formulaire doivent être correctes et bien formatées avant d'être renvoyées au
back-end. Par exemple, pas de chiffre dans un champ prénom.
- Une page “confirmation” :
- Un message de confirmation de commande, remerciant l'utilisateur pour sa commande, et indiquant l'identifiant de commande envoyé par l’API.

## Technologies

- HTML
- CSS
- JavaScript

## Backend
Le dossier back permet de faire tourner l'api contenant les données des produits.
### Installation
Se positionner dans le dossier backend avec un terminal et de saisir la commande ```npm install```
### Lancement du serveur
Il suffit de se positionner dans le dossier backend avec un terminal et de saisir la commande ```node start```
Par défaut le serveur sera lancé sur le port 3000 ( http://localhost:3000 )
### Route api

GET /api/products/
GET /api/products/{id}
POST /api/products/order

## Frontend
Le frontend présente la partie utilisateur de l'application. Il doit être lancé avec un serveur local (live server avec vscode par exemple), et nécessite que le backend soit lancé lui aussi pour fonctionner correctement.
