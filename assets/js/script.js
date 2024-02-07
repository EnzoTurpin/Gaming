// Fonction pour filtrer les jeux
function filterGames() {
  console.log("La fonction filterGames() est appelée !"); // Vérifie si la fonction est appelée

  // Récupérer l'élément d'entrée de recherche
  var input = document.getElementById("searchInput");
  // Obtenir la valeur de l'entrée de recherche et la mettre en majuscules sans les espaces inutiles
  var filter = input.value.trim().toUpperCase();
  console.log("Filter:", filter); // Affiche la valeur du filtre pour vérifier les données de recherche

  // Sélectionner tous les articles dans #gameList
  var articles = document.querySelectorAll("#gameList article");
  var found = false; // Variable pour vérifier si au moins un jeu est trouvé

  // Boucle à travers tous les articles
  for (var i = 0; i < articles.length; i++) {
    // Sélectionner le premier élément figcaption dans chaque article
    var gameNameElement = articles[i].querySelector("figcaption");
    if (!gameNameElement) {
      console.log("figcaption introuvable pour l'article", articles[i]);
      continue; // Passer à l'itération suivante si l'élément figcaption n'est pas trouvé
    }
    // Obtenir le texte à l'intérieur de l'élément figcaption et le mettre en majuscules sans les espaces inutiles
    var gameName = gameNameElement.textContent.trim().toUpperCase();
    console.log("Nom du jeu:", gameName); // Afficher chaque nom de jeu

    // Vérifier si le nom du jeu correspond au filtre
    if (gameName.indexOf(filter) !== -1) {
      articles[i].style.display = "block"; // Afficher l'article
      found = true; // Indiquer qu'au moins un jeu est trouvé
    } else {
      articles[i].style.display = "none"; // Masquer l'article qui ne correspond pas
    }
  }

  // Afficher ou masquer la notification en fonction du résultat de la recherche
  var notification = document.getElementById("searchNotification");
  if (!found && filter !== "") {
    // Si aucun jeu n'est trouvé et il y a une recherche
    notification.style.display = "block";
  } else {
    notification.style.display = "none"; // Masquer la notification si au moins un jeu est trouvé ou si aucun filtre n'est appliqué
  }
}

// Ajouter un écouteur d'événements pour détecter les changements dans l'entrée de recherche et appeler la fonction filterGames()
document.getElementById("searchInput").addEventListener("input", filterGames);
