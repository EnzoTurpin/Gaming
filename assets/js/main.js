const mainJs = (function () {
  "strict"; // Mode strict pour de meilleures pratiques de codage

  // Sélection des éléments du DOM
  const navBtn = document.querySelector(".top-header__left .nav-btn");
  const mainNav = document.querySelector(".top-header__left .main-nav");
  const mainNavCloseBtn = document.querySelector(".main-nav__close-btn");
  const mainNavContentContainer = document.querySelector(
    ".main-nav__content-container"
  );
  const btnCart = document.querySelector(".top-header__btn-cart");
  const btnUser = document.querySelector(".top-header .user-container");
  const cartSection = document.querySelector(".cart-section");
  const itemsCounter = document.querySelector(
    ".top-header__btn-cart .items-quantity"
  );
  const cartForm = document.querySelector(".cart-form");
  const inputProductQuantity = document.getElementById("product__quantity");
  const cartProducts = document.querySelector(".cart-section__products");
  const emptyMsg = document.querySelector(".empty-msg");
  const cartBody = document.querySelector(".cart-section__body");
  const originalProductSlider = document.querySelector(".product__slider");
  const lightbox = document.querySelector(".lightbox");

  var modalLightbox = null; // Initialisation de la variable modalLightbox
  var productIndex = 0; // Initialisation de la variable productIndex
  inputProductQuantity.value = 0; // Définir la valeur initiale de inputProductQuantity
  manageItemsCounter(cart.getCartSize()); // Initialisation du compteur d'articles
  updateCartItems(); // Mettre à jour les articles du panier
  adjustAriaAttributesOnBtnMenu(); // Ajuster les attributs ARIA pour l'accessibilité
  initProductSliders(); // Initialiser les curseurs de produits

  // Ajout des écouteurs d'événements
  navBtn.addEventListener("click", toggleMenu);
  mainNavCloseBtn.addEventListener("click", toggleMenu);
  btnCart.addEventListener("click", toggleCart);
  btnUser.addEventListener("click", toggleBtnCheckout);
  cartForm.addEventListener("click", manageFormClicks);
  cartSection.addEventListener("click", manageCartClicks);

  // Fonction pour initialiser les curseurs de produits
  function initProductSliders() {
    updateLightboxContent();
    document.querySelectorAll(".product__slider").forEach((element) => {
      element.addEventListener("click", manageProductClicks);
      element.addEventListener("keydown", manageProductClicks);
    });
    autoSelectFirstThumbItem();
  }

  // Fonction pour mettre à jour le contenu de la lightbox
  function updateLightboxContent() {
    const clonedElement = originalProductSlider.cloneNode(true);
    clonedElement.classList.add("--lightbox-active");
    lightbox.appendChild(clonedElement);
  }

  // Fonction pour ajuster les attributs ARIA du bouton du menu
  function adjustAriaAttributesOnBtnMenu() {
    if (window.matchMedia(`(min-width: 992px)`).matches) {
      navBtn.removeAttribute("aria-controls");
      navBtn.removeAttribute("aria-expanded");
    }
  }

  // Fonction pour sélectionner automatiquement le premier élément thumb
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
      if (hasThumbSelected === false) {
        listThumbs.children[0]
          .querySelector(".thumb-item__btn")
          .classList.add("--selected");
      }
    });
  }

  // Fonction pour basculer le débordement du document afin d'empêcher le défilement
  function toggleDocumentOverflow() {
    document.documentElement.classList.toggle("--overflow-hidden");
    document.body.classList.toggle("--overflow-hidden");
  }

  // Fonction pour basculer le menu
  function toggleMenu() {
    toggleDocumentOverflow();
    mainNav.classList.toggle("active");
    mainNavContentContainer.classList.toggle("active");
    if (mainNav.classList.contains("active")) {
      navBtn.setAttribute("aria-expanded", true);
    } else {
      navBtn.setAttribute("aria-expanded", false);
    }
  }

  // Fonction pour basculer la section du panier
  function toggleCart() {
    if (cartSection.classList.contains("active")) {
      cartSection.style.display = "none";
      btnCart.setAttribute("aria-expanded", false);
    } else {
      cartSection.style.display = "block";
      btnCart.setAttribute("aria-expanded", true);
    }
    setTimeout(() => cartSection.classList.toggle("active"), 100);
    btnCart.classList.toggle("--active");
  }

  // Fonction pour basculer la visibilité des produits du panier
  function toggleCartProducts() {
    if (
      cart.getCartSize() <= 0 &&
      emptyMsg.classList.contains("--deactivate")
    ) {
      emptyMsg.classList.remove("--deactivate");
      cartProducts.classList.remove("--active");
      cartBody.classList.remove("--with-items");
    } else {
      emptyMsg.classList.add("--deactivate");
      cartProducts.classList.add("--active");
      cartBody.classList.add("--with-items");
    }
  }

  // Fonction pour basculer le bouton de paiement
  function toggleBtnCheckout() {
    const btnCheckout = document.querySelector(".cart-section__btn-checkout");
    btnCheckout.classList.toggle("--active");
  }

  // Fonction pour gérer les clics sur le formulaire
  function manageFormClicks(event) {
    let element = event.target;
    if (
      !element.matches(
        `.cart-form, #product__quantity, .cart-form__input-container`
      )
    ) {
      if (element.matches(`.icon-cart, .cart-form__add-btn`)) {
        // Gérer l'ajout de produit au panier
        const notValidEntries = ["+", "-", "e"];
        let validFlag = true;
        let quantity = inputProductQuantity.value;
        notValidEntries.forEach((element) => {
          if (quantity.indexOf(element) !== -1) {
            validFlag = false;
          }
        });
        if (validFlag) {
          if (quantity === "0") {
            alert("Veuillez déterminer la quantité du produit.");
            inputProductQuantity.value = 0;
          } else {
            const productId = originalProductSlider
              .querySelector(".image-box__src")
              .getAttribute("data-product-id");
            const thumbImageURL = `images/image-product-${
              productId.split("-")[2]
            }-thumbnail.jpg`;
            const productName = document
              .querySelector(".product__name")
              .textContent.trim();
            let discountPrice = document
              .querySelector(".discount-price__value")
              .textContent.trim();
            discountPrice = discountPrice.replace("$", "");
            discountPrice = discountPrice.replace("dollars", "");
            discountPrice = discountPrice.trim();
            let totalPrice = document
              .querySelector(".full-price")
              .textContent.trim();
            totalPrice = totalPrice.replace("$", "");
            totalPrice = totalPrice.replace("dollars", "");
            totalPrice = totalPrice.trim();
            const newItem = cart.addNewItem(
              productId,
              quantity,
              thumbImageURL,
              productName,
              discountPrice,
              totalPrice
            );
            manageItemsCounter(cart.getCartSize());
            updateCartItems([newItem]);
          }
        } else {
          alert("Quantité invalide du produit !");
          inputProductQuantity.value = 0;
        }
      } else {
        let newValue = 0;
        if (element.matches(`.plus-item, .icon-plus`)) {
          newValue = parseInt(inputProductQuantity.value) + 1;
        } else if (inputProductQuantity.value != "0") {
          newValue = parseInt(inputProductQuantity.value) - 1;
        }
        inputProductQuantity.value = newValue;
      }
    }
  }

  // Fonction pour gérer les clics sur les produits
  function manageProductClicks(event) {
    let element = event.target;
    let key = event.key;
    const actionCondition =
      (event.type === "keydown" && key === "Enter") || event.type === "click";
    if (element.matches(`p`)) {
      element = element.parentElement;
    }
    if (
      element.matches(`.image-box__src[tabindex='0']`) &&
      window.matchMedia(`(min-width: 992px)`).matches &&
      actionCondition
    ) {
      event.preventDefault();
      zoomProductImage(event);
    } else if (actionCondition) {
      event.preventDefault();
      if (element.matches(`[data-thumb-index], .thumb-item__btn`)) {
        const localProductSlider = element.closest(`.product__slider`);
        const product = localProductSlider.querySelector(".image-box__src");
        if (element.classList.contains("thumb-item__btn")) {
          element = element.querySelector("[data-thumb-index]");
        }
        productIndex = parseInt(element.getAttribute("data-thumb-index"));
        slideProductImage("", product.getAttribute("data-product-id"), product);
      } else if (
        element.matches(
          `.icon-previous, .icon-next, .btn-previousImage, .btn-nextImage`
        )
      ) {
        if (element.classList.contains(`icon`)) {
          element = element.closest("button");
        }
        const product = element
          .closest(".image-box")
          .querySelector(".image-box__src");
        let operation = element.classList.contains("btn-nextImage") ? "+" : "-";
        slideProductImage(
          operation,
          product.getAttribute("data-product-id"),
          product
        );
      } else if (
        element.matches(`.icon-close, .product__slider___btn-close-lightbox`)
      ) {
        setTimeout(() => {
          lightbox.style.display = "";
          modalLightbox.removeEvents();
        });
      }
    }
  }

  // Fonction pour zoomer sur l'image du produit
  function zoomProductImage() {
    lightbox.classList.add("--active");
    setTimeout(() => {
      lightbox.style.display = "flex";
      modalLightbox = new Modal(lightbox);
    }, 200);
  }

  // Fonction pour faire défiler les images du produit
  function slideProductImage(operator, productId, image) {
    let productImagesLength = products.get(productId).length - 1;
    if (operator === "+") {
      productIndex = productIndex < productImagesLength ? productIndex + 1 : 0;
    } else if (operator === "-") {
      productIndex = productIndex > 0 ? productIndex - 1 : productImagesLength;
    }
    const localProductSlider = image.closest(".product__slider");
    localProductSlider
      .querySelector(".thumb-item__btn.--selected")
      .classList.remove("--selected");
    let elementToSelect = localProductSlider.querySelector(
      `[data-thumb-index='${productIndex}']`
    );
    elementToSelect.closest("button").classList.add("--selected");

    let { full_img_url: fullImgURL } = products.get(productId)[productIndex];
    image.classList.add("--changed");
    setTimeout(() => {
      image.classList.remove("--changed");
      image.src = fullImgURL;
    }, 200);
  }

  // Fonction pour gérer le compteur d'articles
  function manageItemsCounter(quantity) {
    itemsCounter.querySelector(".value").textContent = quantity;
    if (!itemsCounter.classList.contains("active") && quantity > 0) {
      itemsCounter.classList.add("active");
    } else if (quantity <= 0) {
      itemsCounter.classList.remove("active");
    }
  }

  // Fonction pour gérer les clics sur le panier
  function manageCartClicks(event) {
    let element = event.target;
    if (element.matches("img:not(.product__thumb)")) {
      element = element.parentElement;
    }
    if (element.classList.contains("btn-del-product")) {
      const itemToDelete = element.closest("[data-item-id]");
      cart.deleteItem(itemToDelete.getAttribute("data-item-id"));
      itemToDelete.parentElement.remove();
      manageItemsCounter(cart.getCartSize());
      toggleCartProducts();
    }
  }

  // Fonction pour mettre à jour les articles du panier
  function updateCartItems(item) {
    const items = item || cart.loadAllItems();
    if (items.length > 0) {
      toggleCartProducts();
      items.forEach((element) => {
        // Si l'élément est déjà dans le panier, mettre à jour sa quantité et son prix final
        if (element.existsInDOM) {
          const elementInDOM = document.querySelector(
            `[data-item-id=${element.item_id}]`
          );
          elementInDOM.querySelector(
            ".price-calculation__value .quantity"
          ).textContent = element.quantity;
          elementInDOM.querySelector(".final-price__span").textContent = (
            parseInt(element.discount_price) * parseInt(element.quantity)
          ).toFixed(2);
        } else {
          cartProducts.appendChild(createDOMCartElement(element));
        }
      });
    }
  }

  // Fonction pour créer un élément DOM pour un article du panier
  function createDOMCartElement(item) {
    const li = document.createElement("li");
    const liContent = `
        <a href="#" class="list-item" data-item-id=${item.item_id}>
          <img src="${item.thumb_URL}" alt="" class="product__thumb">
          <div class="list-item__abstract">
            <h4 class="title">${item.name}</h4>
              <div class="price-calculation">
                <p class="price-calculation__value">
                  &dollar;
                  <span class="value__span">
                    ${item.discount_price}
                    <span class="sr-only">dollars</span>
                  </span>
                  <span class="sr-only">par</span>
                  <span aria-hidden="true">x</span>
                  <span class="quantity">${item.quantity}</span>
                </p>
              </div>
              
              <p class="price-calculation__final-price">
                &dollar; 
                <span class="final-price__span">${(
                  item.discount_price * item.quantity
                ).toFixed(2)}</span>
                <span class="sr-only">dollars au total</span> 
              </p>
          </div>
          <button type="button" class="btn-del-product">
            <span class="sr-only">Supprimer ce produit</span>
            <img src="images/icon-delete.svg" alt="" role="presentation">
          </button>
        </a>
      `;
    li.innerHTML = liContent;
    return li;
  }

  return {
    toggleDocumentOverflow, // Exporter la fonction pour permettre l'accès depuis l'extérieur
  };
})();
