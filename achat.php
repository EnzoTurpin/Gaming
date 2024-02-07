<?php
// Chemin vers le fichier JSON
$jsonFile = './assets/data/articles.json';
$jsonData = json_decode(file_get_contents($jsonFile), true);

// Récupération de l'ID de l'article depuis l'URL
$articleId = isset($_GET['id']) ? $_GET['id'] : null;

// Recherche de l'article par son ID
$article = null;
foreach ($jsonData as $item) {
    if ($item['id'] == $articleId) {
        $article = $item;
        break;
    }
}

if (!$article) {
    echo "Article non trouvé."; // Message affiché si l'article n'est pas trouvé
    exit;
}
?>

<?php include 'header.html'; ?>

<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./assets/css/style.css" />
    <link rel="stylesheet" href="./assets/css/main.css" />
    <link rel="stylesheet" href="./assets/css/normalize.css" />
    <!-- Icône du site -->
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="./assets/img/favicon-32x32.png"
    />
  </head>
  <body>
    <!-- Conteneur principal de la page -->
    <div class="page-container">
      <main>
        <!-- Contenu de l'article -->
        <article class="product">
          <!-- Section pour l'aperçu du produit -->
          <section
            class="product__slider default-container"
            aria-label="Product preview"
          >
            <img
              src="<?php echo $article['image']; ?>"
              alt="<?php echo $article['name']; ?>"
              class="image-box__src original-size-image"
              data-product-id="item-cart-<?php echo $article['id']; ?>"
              tabindex="0"
              aria-controls="lightbox"
              aria-expanded="false"
            />
          </section>

          <!-- Section pour le contenu du produit -->
          <section
            class="product__content default-container"
            aria-label="Product content"
          >
            <section class="product__page">
              <div class="content-wrapper">
                <!-- Affichage du nom du produit -->
                <header class="game__title">
                  <h3 class="product__title" tabindex="0">
                    <?php echo $article['name']; ?>
                  </h3>
                </header>
                <!-- Affichage de la description du produit -->
                <p class="product__description" tabindex="0">
                  <?php echo $article['description']; ?>
                </p>
              </div>
              <!-- Affichage du prix du produit -->
              <div class="product__price">
                <div class="discount-price">
                  <p class="discount-price__value" tabindex="0">
                    <?php echo $article['price']; ?>
                    &euro;<span class="sr-only">euros</span>
                  </p>
                </div>
              </div>

              <!-- Formulaire pour ajouter au panier -->
              <form action="getPanier.php" method="post" class="cart-form">
                

                <!-- Conteneur pour la quantité de produit -->
                <div
                  class="cart-form__input-container"
                  aria-label="Define the product quantity"
                >
                  <button type="button" class="btn-changeValue minus-item">
                    <span class="sr-only">Moins un objet</span>
                    <i class="fa-solid fa-minus"></i>
                  </button>
                  <label for="product__quantity" class="sr-only"
                    >Mettre la quantité manuellement</label
                  >
                  <!-- Champ pour entrer la quantité -->
                  <input
                    type="number"
                    min="0"
                    value="0"
                    id="product__quantity"
                    name="product_quantity"
                  />
                  <button type="button" class="btn-changeValue plus-item">
                    <span class="sr-only">Plus un objet</span>
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>

                <!-- Champ caché pour l'ID du produit -->
                <input
                  type="hidden"
                  name="product_id"
                  value="<?php echo $article['id']; ?>"
                />
                <!-- Champ caché pour le nom de l'image du produit -->
                <input
                  type="hidden"
                  name="product_image"
                  value="<?php echo $article['image']; ?>"
                />
                <!-- Champ caché pour le nom du produit -->
                <input
                  type="hidden"
                  name="product_name"
                  value="<?php echo $article['name']; ?>"
                />
                <!-- Champ caché pour le prix du produit -->
                <input
                  type="hidden"
                  name="product_price"
                  value="<?php echo $article['price']; ?>"
                />
                <!-- Champ caché pour le prix du produit -->
                <!-- Bouton pour ajouter le produit au panier -->
                <button type="submit" class="cart-form__add-btn">
                  <i class="fa-solid fa-cart-shopping"></i> &nbsp; Ajouter au
                  panier
                  <!-- Bouton pour ajouter le produit au panier -->
                </button>
              </form>
            </section>
          </section>
        </article>
      </main>
    </div>
  </body>
</html>

<?php include('footer.html'); ?>