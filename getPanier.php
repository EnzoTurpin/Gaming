<?php
session_start(); // Démarre la session PHP, nécessaire pour utiliser les variables de session.

if ($_SERVER["REQUEST_METHOD"] == "POST") { // Vérifie si la requête HTTP est une soumission de formulaire en POST.

    // Récupère les données du formulaire POST.
    $product_image = $_POST["product_image"];
    $product_name = $_POST["product_name"];
    $product_quantity = $_POST["product_quantity"];
    $product_price = $_POST["product_price"];

    // Vérifie si la variable de session 'jeuCounter' est définie.
    if (!isset($_SESSION['jeuCounter'])) {
        $_SESSION['jeuCounter'] = 0; // Si elle n'est pas définie, l'initialise à 0.
    } else {
        $_SESSION['jeuCounter']++; // Si elle est définie, incrémente sa valeur.
    }
    $codeJeu = 'J_' . $_SESSION['jeuCounter']; // Crée un code de jeu unique basé sur la valeur de 'jeuCounter'.

    // Crée un tableau associatif contenant les informations du produit et l'ajoute à la variable de session 'panier'.
    $_SESSION['panier'][$codeJeu] = array(
        'code' => $codeJeu,
        'name' => $product_name,
        'img' => $product_image,
        'quantity' => $product_quantity,
        'price' => $product_price
    );

    // Redirige l'utilisateur vers la page 'jeux.php' après avoir traité les données du formulaire.
    header("Location: jeux.php");
} else {
    // Si la requête HTTP n'est pas en POST, affiche un message d'erreur.
    echo "Une erreur s'est produite. Veuillez réessayer.";
}
?>
