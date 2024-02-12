// Lorsque l'utilisateur fait défiler 20px du haut du document, afficher le bouton
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// Lorsque l'utilisateur clique sur le bouton, faites défiler vers le haut de la page
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
