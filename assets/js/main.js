document.addEventListener("DOMContentLoaded", function () {
  "use strict"; // Activation correcte du mode strict

  // Déclarations des éléments du DOM
  const mainNavCloseBtn = document.querySelector(".main-nav__close-btn");
  const mainNavContentContainer = document.querySelector(
    ".main-nav__content-container"
  );
  const btnCart = document.querySelector(".top-header__btn-cart");
  const btnUser = document.querySelector(".top-header .user-container");
  const cartSection = document.querySelector(".cart-section");
  const cartForm = document.querySelector(".cart-form");
  const inputProductQuantity = document.getElementById("product__quantity");
  const cartProducts = document.querySelector(".cart-section__products");
  const emptyMsg = document.querySelector(".empty-msg");
  const cartBody = document.querySelector(".cart-section__body");
  const originalProductSlider = document.querySelector(".product__slider");
  const lightbox = document.querySelector(".lightbox");

  var modalLightbox = null;
  var productIndex = 0;

  // Vérification de l'existence de inputProductQuantity
  if (!inputProductQuantity) {
    console.error(
      'inputProductQuantity est null. Vérifiez que l\'ID "product__quantity" existe.'
    );
  } else {
    inputProductQuantity.value = 0; // Initialisation si existant
  }

  // Fonctions d'initialisation et de gestion des événements
  function initProductSliders() {
    if (originalProductSlider) {
      const clonedElement = originalProductSlider.cloneNode(true);
      clonedElement.classList.add("--lightbox-active");
      lightbox.appendChild(clonedElement);
    }
    document.querySelectorAll(".product__slider").forEach((element) => {
      element.addEventListener("click", manageProductClicks);
      element.addEventListener("keydown", manageProductClicks);
    });
    autoSelectFirstThumbItem();
  }

  function updateLightboxContent() {
    if (originalProductSlider) {
      const clonedElement = originalProductSlider.cloneNode(true);
      clonedElement.classList.add("--lightbox-active");
      lightbox.appendChild(clonedElement);
    }
  }

  function autoSelectFirstThumbItem() {
    document.querySelectorAll(".product__thumbs").forEach((listThumbs) => {
      let hasThumbSelected = false;
      Array.from(listThumbs).forEach((element) => {
        if (
          element
            .querySelector(".thumb-item__btn")
            .classList.contains("--selected")
        ) {
          hasThumbSelected = true;
        }
      });
      if (!hasThumbSelected && listThumbs.children.length > 0) {
        listThumbs.children[0]
          .querySelector(".thumb-item__btn")
          .classList.add("--selected");
      }
    });
  }

  function toggleDocumentOverflow() {
    document.documentElement.classList.toggle("--overflow-hidden");
    document.body.classList.toggle("--overflow-hidden");
  }

  // Cette fonction a été ajustée pour ne pas dépendre de navBtn
  function toggleMenu() {
    toggleDocumentOverflow();
    mainNavContentContainer.classList.toggle("active");
  }

  function toggleCart() {
    cartSection.classList.toggle("active");
    setTimeout(() => {
      cartSection.style.display = cartSection.classList.contains("active")
        ? "block"
        : "none";
    }, 100);
    btnCart.classList.toggle("--active");
  }

  function toggleBtnCheckout() {
    const btnCheckout = document.querySelector(".cart-section__btn-checkout");
    if (btnCheckout) {
      // Ajout d'une vérification de nullité
      btnCheckout.classList.toggle("--active");
    }
  }

  // Suppression de la référence à itemsCounter dans updateCartItems et autres fonctions

  // Autres fonctions de gestion des événements, ajustées pour s'assurer qu'elles ne dépendent pas d'éléments non définis

  mainNavCloseBtn.addEventListener("click", toggleMenu);
  btnCart.addEventListener("click", toggleCart);
  btnUser.addEventListener("click", toggleBtnCheckout);
  cartForm.addEventListener("click", manageFormClicks);
  cartSection.addEventListener("click", manageCartClicks);

  initProductSliders(); // Appel de la fonction pour initialiser les sliders de produits

  // Assurez-vous d'ajuster ou de supprimer toute autre référence à navBtn ou itemsCounter si nécessaire
});
