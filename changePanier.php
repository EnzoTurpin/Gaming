<?php
session_start();

if (isset($_POST['key'], $_POST['action'])) {
    $key = $_POST['key'];
    $action = $_POST['action'];

    switch ($action) {
        case 'update':
            if (isset($_POST['quantity'])) {
                $quantity = intval($_POST['quantity']);
                if ($quantity > 0) {
                    $_SESSION['panier'][$key]['quantity'] = $quantity;
                } else {
                    // Optionnel : Gérer une quantité invalide (ex : afficher un message d'erreur)
                }
            }
            break;
        case 'delete':
            unset($_SESSION['panier'][$key]);
            break;
    }
}

header('Location: panier.php');
exit;
?>
