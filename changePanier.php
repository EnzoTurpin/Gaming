<?php
session_start();

if (isset($_POST['key'])) {
    $key = $_POST['key'];

    if (isset($_POST['action']) && $_POST['action'] == 'delete') {
        unset($_SESSION['panier'][$key]);
    }
    elseif (isset($_POST['quantity'])) {
        $quantity = intval($_POST['quantity']);
        if (isset($_SESSION['panier'][$key])) {
            $_SESSION['panier'][$key]['quantity'] = $quantity;
        }
    }
}

header('Location: panier.php');
exit;

?>