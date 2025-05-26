<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'connect.php';

$bookId = isset($_GET['id']) ? intval($_GET['id']) : 0;
if ($bookId <= 0) {
    echo json_encode(["error" => "Invalid book ID"]);
    exit();
}

$sql = "SELECT id, title, author, price, description, image_url FROM books WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $bookId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode($result->fetch_assoc(), JSON_PRETTY_PRINT);
} else {
    echo json_encode(["error" => "No book found"], JSON_PRETTY_PRINT);
}

$stmt->close();
$conn->close();
?>
