<?php
  require_once "includes/connection.php";

  $stmt = $pdo->prepare('SELECT * FROM categories');
  $stmt->execute();
  $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

  $varmratter_category = 1;
  $stmt = $pdo->prepare('SELECT * FROM items WHERE items_category = ?');
  $stmt->bindParam(1, $varmratter_category, PDO::PARAM_STR);
  $stmt->execute();
  $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!doctype html>
<html lang="fi">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Servitörer</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="css/index.css" />
  </head>
  <body>
    <div class="container-fluid d-flex justify-content-center">
      <ul class="list-group list-group-horizontal d-flex flex-row no-border-list">
      <li class="list-group-item"><a href="#" onclick="printInventory(1)" class="text-decoration-none text-reset fs-5">Förrätt</a></li>
      <li class="list-group-item"><a href="#" onclick="printInventory(2)" class="text-decoration-none text-reset fs-5">Varmrätt</a></li>
      <li class="list-group-item"><a href="#" onclick="printInventory(3)" class="text-decoration-none text-reset fs-5">Hamburgare</a></li>
      <li class="list-group-item"><a href="#" class="text-decoration-none text-reset fs-5">Pizza</a></li>
      <li class="list-group-item"><a href="#" class="text-decoration-none text-reset fs-5">Till Barnen</a></li>
      <li class="list-group-item"><a href="#" onclick="printInventory(0)" class="text-decoration-none text-reset fs-5">Efterrätt</a></li>
      </ul>
    </div>

    <div class="container-fluid" id="inventoryContainer">
      
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="js/index.js" defer></script>
  </body>
</html>