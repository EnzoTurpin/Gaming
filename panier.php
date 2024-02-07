<?php include 'header.html'; ?>
<script src="/assets/js/panier.js"></script>
<main>
    <section>
        <?php 
        session_start();
        $total_price = 0;

        if (isset($_SESSION['panier']) && is_array($_SESSION['panier']) && !empty($_SESSION['panier'])) {
            $keys = array_keys($_SESSION['panier']);
            echo "<div class='cart-table-container'>";
            echo "<table class='cart-table'>";
            $row = array(
                "Nom du Jeu:",
                "Quantité:",
                "Prix:",
                
            );
            echo "<tr>";
            foreach($row as $r) {
                echo "<th> $r </th>";
            }
            echo "</tr>";
            foreach($keys as $key) {
                $product = $_SESSION['panier'][$key];
                $product_price = $product['price'];
                $product_quantity = $product['quantity'];
                
                // Début du formulaire pour chaque ligne de produit
                echo "<tr data-key='$key'>";
                echo "<form method='POST' action='changePanier.php'>";
                echo "<td class='product-info centered-text'><img src='" . $product['img'] . "' alt='" . $product['name'] . "' class='thumbnail'><br>" . $product['name'] . "</td>";
                echo "<td class='product-quantity'>";
                // Ajout de la division avec la classe input-number-container et un label
                echo "<div class='input-number-container'>";
                echo "<label for='quantity$key'>Quantité:</label>";
                echo "<input type='number' id='quantity$key' name='quantity' min='1' value='$product_quantity' class='quantity-input' data-key='$key'>";
                echo "</div>";
                echo "<input type='hidden' name='key' value='$key'>";
                echo "<button type='submit' name='action' value='update' class='update-item-btn' style='display: none;'>Mettre à jour</button>";
                echo "</td>";
                echo "<td class='product-price'>" . $product_price * $product_quantity . "€</td>";
                
                echo "<td class='product-remove'><button type='submit' name='action' value='delete' class='remove-item-btn'><i class='fa-solid fa-trash'></i> &nbsp Supprimer</button></td>";
                echo "</form>";
                echo "</tr>";
                $total_price += $product_price * $product_quantity;
            }              

            echo "</table>";
            echo "</div>";
            
            // Affichage du total en bas du tableau
            echo "</section>"; 
            echo "<section>"; 
            echo "<div class='total-price-container'><h1> Prix Total : $total_price €</h1></div>";
            echo "</section>"; 
        } else {
            echo "<h1> Votre panier est vide ! </h1>";
        }
        ?>
    </section>
</main>

<?php include 'footer.html'; ?>
