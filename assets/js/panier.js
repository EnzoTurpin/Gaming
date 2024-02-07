document.addEventListener("DOMContentLoaded", function () {
  // Sélection de tous les inputs de quantité
  const quantityInputs = document.querySelectorAll(".quantity-input");

  quantityInputs.forEach((input) => {
    // Ajout d'un écouteur d'événement pour la touche Entrée
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        // Empêche le comportement par défaut pour la touche Entrée
        e.preventDefault();
        // Log pour le débogage
        console.log(
          "Enter pressed, attempting to update quantity for product key:",
          this.getAttribute("data-key")
        );

        // Mise à jour de l'action et de la méthode du formulaire pour s'assurer qu'ils sont corrects
        this.form.action = "changePanier.php";
        this.form.method = "POST";

        // Mise à jour ou ajout des inputs cachés pour 'action' et 'key'
        updateHiddenInput(this.form, "action", "update");
        updateHiddenInput(this.form, "key", this.getAttribute("data-key"));

        // Soumission du formulaire
        this.form.submit();
      }
    });
  });

  // Fonction pour mettre à jour ou ajouter un input caché
  function updateHiddenInput(form, name, value) {
    let input = form.querySelector('input[name="' + name + '"]');
    if (!input) {
      input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      form.appendChild(input);
    }
    input.value = value;
  }
});
