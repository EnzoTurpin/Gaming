<?php 
// Inclure le fichier d'en-tête
include('header.html'); 
?>
    <!-- Section de la page d'accueil -->
    <div class="index">
        <!-- Titre principal -->
        <h1>Bienvenue sur ma page d'accueil !</h1>
        <!-- Description -->
        <p>Cliquez sur le bouton ci-dessous pour accéder à la page des jeux.
        </p>

        <!-- Formulaire pour accéder à la page des jeux -->
        <form action="jeux.php" method="post" style="margin-bottom: 100px;">
            <button type="submit">
                <h3>Cliquez ici pour accéder aux autres jeux</h3>
            </button>
        </form>
    </div>

<?php 
// Inclure le fichier de pied de page
include('footer.html'); 
?>
