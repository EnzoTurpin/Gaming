<?php
// Inclure le fichier d'en-tête
include('header.html');
?>

<main>
    <!-- Article de contact -->
    <article class="contact" data-page="contact">
        <br />
        <!-- Titre de l'article -->
        <h2 class="h1 article-title">Contact</h2>

        <!-- Titre du formulaire -->
        <h3 class="h3 form-title">Merci de remplir le formulaire ci-dessous:</h3>

        <!-- Section du formulaire de contact -->
        <section class="contact-form">
            <!-- Formulaire de contact -->
            <form action="traitement.php" method="post" class="form">
                <!-- Wrapper des champs de saisie -->
                <div class="input-wrapper">
                    <!-- Champ pour le nom complet -->
                    <input
                        type="text"
                        name="fullname"
                        class="form-input"
                        placeholder="Nom et prénom"
                        required
                        data-form-input
                    />

                    <!-- Champ pour l'adresse e-mail -->
                    <input
                        type="email"
                        name="email"
                        class="form-input"
                        placeholder="Adresse mail"
                        required
                        data-form-input
                    />
                </div>

                <!-- Champ pour le message -->
                <textarea
                    name="message"
                    class="form-input"
                    placeholder="Votre message"
                    required
                    data-form-input
                ></textarea>

                <!-- Espaces pour l'esthétique -->
                <br>
                <br>

                <!-- Bouton d'envoi du formulaire -->
                <button class="form-btn" type="submit">
                <i class="fa-solid fa-paper-plane"></i>                    <span>Envoyer le message</span>
                </button>
            </form>
        </section>
    </article>
</main>

<?php
// Inclure le fichier de pied de page
include('footer.html');
?>
