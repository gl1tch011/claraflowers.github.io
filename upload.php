<?php
// Veritabanı bağlantısı
$conn = new mysqli("localhost", "root", "", "claraflowers");

// Resim yükleme işlemi
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["flower-image"]["name"]);
    
    if (move_uploaded_file($_FILES["flower-image"]["tmp_name"], $target_file)) {
        // Veritabanına kaydet
        $name = $_POST['flower-name'];
        $price = $_POST['flower-price'];
        $description = $_POST['flower-description'];
        $image_path = $target_file;
        
        $sql = "INSERT INTO flowers (name, price, description, image, seller) 
                VALUES ('$name', '$price', '$description', '$image_path', 'Günel Tağıyeva')";
        
        if ($conn->query($sql) === TRUE) {
            header("Location: index.html");
        }
    }
}
?>