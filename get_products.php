<?php
$conn = new mysqli("localhost", "root", "", "claraflowers");

$sql = "SELECT * FROM flowers ORDER BY created_at DESC";
$result = $conn->query($sql);

$products = array();
while($row = $result->fetch_assoc()) {
    $products[] = $row;
}

echo json_encode($products);
?>