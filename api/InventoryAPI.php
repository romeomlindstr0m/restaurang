<?php
require_once "../includes/connection.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->prepare('SELECT * FROM items');
    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        $inventory = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $jsonData = json_encode($inventory);
        echo $jsonData;
    } else {
        $jsonData = json_encode([]);
        echo $jsonData;
    }
} else {
    http_response_code(400);
}
?>