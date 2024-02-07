<?php
// Vérifier si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer et valider les données du formulaire
    $fullname = isset($_POST['fullname']) ? htmlspecialchars($_POST['fullname']) : "";
    $email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) : "";
    $message = isset($_POST['message']) ? htmlspecialchars($_POST['message']) : "";

    if (empty($fullname) || empty($email) || empty($message)) {
        echo "<p>Tous les champs doivent être remplis.</p>";
        exit;
    }

    if (!$email) {
        echo "<p>L'adresse e-mail n'est pas valide.</p>";
        exit;
    }

    // Construire le message à envoyer par e-mail
    $to = "enzoturpin3531@gmail.com";
    $subject = "Message depuis le formulaire de contact";
    $body = "Nom: $fullname\r\n";
    $body .= "E-mail: $email\r\n";
    $body .= "Message:\r\n$message";

    // En-têtes de l'e-mail
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Envoyer l'e-mail
    if (mail($to, $subject, $body, $headers)) {
        echo "<p>Votre message a été envoyé avec succès.</p>";
    } else {
        echo "<p>Une erreur s'est produite lors de l'envoi de votre message.</p>";
    }
}
?>
