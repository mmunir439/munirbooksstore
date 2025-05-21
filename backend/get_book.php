<?php
header("Content-Type: application/json");
include '../backend/connect.php'; // Include database connection
// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data["title"]) || !isset($data["price"]) || !isset($data["image"])) {
    echo json_encode(["error" => "Invalid or missing data."]);
    exit;
}

$title = $data["title"];
$price = $data["price"];
$image = $data["image"];

// Prepare SQL to insert data
$sql = "INSERT INTO books (title, price, image) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sds", $title, $price, $image); // "sds" means string, decimal, string
$success = $stmt->execute();

if ($success) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Failed to insert book."]);
}
?>