<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'connect.php';

$title = isset($_GET['title']) ? trim($_GET['title']) : '';

if (empty($title)) {
    echo json_encode([]);
    exit();
}

$sql = "SELECT id, title, author, price, description, image_url FROM books WHERE title LIKE ?";
$stmt = $conn->prepare($sql);
$searchTerm = "%{$title}%";
$stmt->bind_param("s", $searchTerm);
$stmt->execute();
$result = $stmt->get_result();

$books = [];
while ($row = $result->fetch_assoc()) {
    $books[] = $row;
}

echo json_encode($books, JSON_PRETTY_PRINT);

$stmt->close();
$conn->close();
?>
