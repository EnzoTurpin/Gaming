document.addEventListener("DOMContentLoaded", function () {
  // Fonction pour filtrer les jeux
  function filterGames() {
    console.log("La fonction filterGames() est appelée !");
    var input = document.getElementById("searchInput");
    var filter = input.value.trim().toUpperCase();
    console.log("Filter:", filter);

    var articles = document.querySelectorAll("#gameList article");
    var found = false;

    for (var i = 0; i < articles.length; i++) {
      var gameNameElement = articles[i].querySelector("figcaption");
      if (!gameNameElement) {
        console.log("figcaption introuvable pour l'article", articles[i]);
        continue;
      }
      var gameName = gameNameElement.textContent.trim().toUpperCase();
      console.log("Nom du jeu:", gameName);

      if (gameName.includes(filter)) {
        articles[i].style.display = "block";
        found = true;
      } else {
        articles[i].style.display = "none";
      }
    }

    var notification = document.getElementById("searchNotification");
    if (!found && filter !== "") {
      notification.style.display = "block";
    } else {
      notification.style.display = "none";
    }
  }

  // Ajouter un écouteur d'événements pour détecter les changements dans l'entrée de recherche
  var searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", filterGames);
  } else {
    console.error("L'élément #searchInput n'existe pas !");
  }
});
