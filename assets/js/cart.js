const cart = (function () {
  // Fonction pour créer un nouvel élément dans le panier avec des propriétés spécifiées.
  function createItemToCart(
    productId,
    quantity,
    thumbImageURL,
    productName,
    discountPrice,
    totalPrice
  ) {
    return {
      item_id: productId,
      quantity,
      thumb_URL: thumbImageURL,
      name: productName,
      discount_price: discountPrice,
      total_price: totalPrice,
    };
  }

  // Fonction pour ajouter un nouvel élément ou mettre à jour la quantité d'un élément existant dans le panier.
  function addNewItem(
    productId,
    quantity,
    thumbImageURL,
    productName,
    discountPrice,
    totalPrice
  ) {
    let item = JSON.parse(sessionStorage.getItem(productId));
    let flagAlreadyExisted = false;
    if (item !== null) {
      flagAlreadyExisted = true;
      quantity = parseInt(quantity) + parseInt(item.quantity);
    }
    let newItem = createItemToCart(
      productId,
      quantity,
      thumbImageURL,
      productName,
      discountPrice,
      totalPrice
    );
    sessionStorage.setItem(newItem.item_id, JSON.stringify(newItem));

    newItem.existsInDOM = flagAlreadyExisted;

    return newItem;
  }

  // Fonction pour charger tous les éléments du panier depuis la session.
  function loadAllItems() {
    const items = [];
    let sessionStorageLength = sessionStorage.length;
    for (let i = 0; i <= sessionStorageLength; i++) {
      let item = sessionStorage.getItem(`item-cart-${i}`);
      if (item !== null) {
        item = JSON.parse(item);
        items.push(item);
      }
    }
    return items;
  }

  // Fonction pour obtenir la taille totale du panier (somme des quantités de tous les éléments).
  function getCartSize() {
    const items = loadAllItems();
    let total = 0;
    for (let { quantity } of items) {
      total += parseInt(quantity);
    }
    return total;
  }

  // Fonction pour supprimer un élément du panier par son identifiant de produit.
  function deleteItem(productId) {
    sessionStorage.removeItem(productId);
  }

  // Fonction pour augmenter la quantité d'un élément dans le panier par son identifiant de produit.
  function increaseQuantity(productId) {
    let item = JSON.parse(sessionStorage.getItem(productId));
    if (item !== null) {
      item.quantity++;
      sessionStorage.setItem(productId, JSON.stringify(item));
    }
  }

  // Fonction pour diminuer la quantité d'un élément dans le panier par son identifiant de produit.
  function decreaseQuantity(productId) {
    let item = JSON.parse(sessionStorage.getItem(productId));
    if (item !== null && item.quantity > 0) {
      item.quantity--;
      sessionStorage.setItem(productId, JSON.stringify(item));
    }
  }

  // Retourne un objet contenant les fonctions d'interaction avec le panier.
  return {
    addNewItem,
    getCartSize,
    loadAllItems,
    deleteItem,
    increaseQuantity,
    decreaseQuantity,
  };
})();

// Écoute l'événement "DOMContentLoaded" pour exécuter du code lorsque la page est chargée.
document.addEventListener("DOMContentLoaded", function () {
  const minusButton = document.querySelector(".minus-item");
  const plusButton = document.querySelector(".plus-item");
  const quantityInput = document.getElementById("product__quantity");

  // Vérifie l'existence des éléments HTML avant de leur ajouter des écouteurs d'événements.
  if (minusButton && plusButton && quantityInput) {
    // Ajoute un écouteur d'événement pour le bouton "Moins".
    minusButton.addEventListener("click", function () {
      let currentValue = parseInt(quantityInput.value);
      if (currentValue > 0) {
        quantityInput.value = currentValue - 1;
      }
    });

    // Ajoute un écouteur d'événement pour le bouton "Plus".
    plusButton.addEventListener("click", function () {
      let currentValue = parseInt(quantityInput.value);
      quantityInput.value = currentValue + 1;
    });
  }
});

function updateQuantity(key, quantity) {
  // Mettre à jour la quantité dans le panier
  cart.loadAllItems().forEach((item) => {
    if (item.item_id === key) {
      item.quantity = quantity;
      sessionStorage.setItem(key, JSON.stringify(item));
    }
  });
  // Mettre à jour l'affichage du panier après la mise à jour de la quantité
  updateCartDisplay();
}

function removeProduct(key) {
  // Supprimer l'article du panier
  cart.deleteItem(key);
  // Mettre à jour l'affichage du panier après la suppression de l'article
  updateCartDisplay();
}

function updateCartDisplay() {
  // Mettre à jour l'affichage du panier
}
